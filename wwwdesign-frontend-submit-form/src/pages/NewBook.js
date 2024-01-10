import React, { useState, useEffect } from 'react';
import Book from '../entities/Book'; 
import ImageUploader from '../components/ImageUploader';
import FormTextField from '../components/FormTextField';
import FormNumberField from '../components/FormNumberField';
import { useNavigate } from 'react-router-dom';
import './NewBook.css';
import '../App.css'
import '../styles.css'
import MediumDropDown from '../components/MediumDropDown';
import { addBook } from '../services/DBService';
import CoverImage from '../components/CoverImage';
//import MultiEnterTextField from '../components/MultiEnterTextField';

const textFields = [
  {key: "title", label: "Title:"},
  {key: "author", label: "Author:"},
  {key: "genre", label: "Genre:"},
  {key: "publisher", label: "Publisher"},
  {key: "note", label: "Notes"}
];

const NewBook = ({bookDetails}) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    year: '',
    cover: null,
    medium: '', 
    genre: '',
    numberOfPages: 0,
    isbn: '',
    userID: '550e8400-e29b-41d4-a716-446655440000',
    publisher: '',
    rating: 0,
    note: 'My notes!'
  });

  const navigate = useNavigate();

  const handleScanClick = () => {
    navigate('/scanner');
  };

  useEffect(() => {
    if (bookDetails) {
      setFormData({
        title: bookDetails.title || '',
        author: bookDetails.author || '',
        genre: bookDetails.genre || '',
        year: bookDetails.year || '',
        cover: bookDetails.cover || null,
        pages: bookDetails.numberOfPages || 0,
        userID: "550e8400-e29b-41d4-a716-446655440000",
        isbn: bookDetails.isbn || "",
        publisher: bookDetails.publisher || '',
        rating: 5, //TODO make it set by the user!
        note: 'My notes!',
        type: bookDetails.medium || "",
        readDate: bookDetails.readDate,
        ownedByMe: true
        // Autofill more form fields as needed
      });
    }
  }, [bookDetails]);

  const [createdBook, setCreatedBook] = useState(null);

  const handleSave = (e) => {
    e.preventDefault();

    console.log('New book!:', formData);
    addBook(formData);
  };

  const handleCancel = () => {
    setFormData({
      title: '',
      author: '',
      year: '',
      cover: null,
      medium: '', 
    });
    setCreatedBook(null);
    navigate('/home');
  };

  const handleChange = (fieldName, selectedValue) => {
    setFormData((prevFieldValues) => ({
      ...prevFieldValues,
      [fieldName]: selectedValue,
    }));
  };

  const handleInputChange = (fieldName, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: value,
    }));
  };

  const handleEnter = (inputValue) => {
    // Handle the 'Enter' key press, e.g., update form state, add to a list, etc.
    setEntries((prevEntries) => [...prevEntries, inputValue]);
    console.log('Entered:', inputValue);
  };


  const [entries, setEntries] = useState(['entry 1', 'entry 2']);
  const [inputValue, setInputValue] = useState('');

  const getEntries = () => {
    return entries;
  };

  return (
    <div className="center-content content">
      <form onSubmit={handleSave}>
        <div className="header">
          <div className="header-text">
            <h1>Add a new book!</h1>
          </div>
          {/*<BarcodeScanner isLoggedIn={true}/>*/}
          <button type="button" onClick={handleScanClick}>
            Barcode Scanner
          </button>
        </div>
        {/* <MultiEnterTextField
          inputValue={inputValue}
          onInputChange={(value) => handleInputChange('title', value)}
          onEnter={handleEnter} 
          getEntries={getEntries} 
        /> */}
        {textFields.map((fieldName, index) => (
          <FormTextField
            key={index}
            fieldName={fieldName.key}
            label={fieldName.label}
            value={formData[fieldName.key]}
            handleChange={(event) => handleChange(fieldName.key, event.target.value)}
          />
        ))}
       <FormNumberField
            fieldName="year"
            label="Year:"
            value={formData["year"]}
            handleChange={(event) => handleChange("year", event.target.value)}
        />
        <MediumDropDown
          value={formData.medium}
          handleChange={(event) => handleChange("medium", event.target.value)}
        />
        <div>
          <label>Cover Image:</label>
          <ImageUploader
            onChange={(base64String) => setFormData({ ...formData, cover: base64String })}
          />
          <CoverImage bookDetails={bookDetails} />  
        </div>
        <div className="button-group">
          <button type="submit" onClick={handleSave} className="save-button">
              Save
          </button>
          <button type="button" onClick={handleCancel} className="cancel-button">
              Cancel
          </button>
        </div>
      </form>
      {createdBook && (
        <div>
          <h2>Book Created:</h2>
          <p>Title: {createdBook.title}</p>
          <p>Author: {createdBook.author}</p>
          <p>Year: {createdBook.year}</p>
          <p>Medium: {createdBook.medium}</p>
         <img src={createdBook.cover} alt="Book Cover" />
        </div>
      )}
    </div>
  );
};

export default NewBook;