import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useZxing } from "react-zxing";


const ScannerService = ({ updateForm }) => {

    const [bookDetails, setBookDetails] = useState(null);

    const handleDetected = (scannedISBN) => {
        try {
            handleBarcodeScanned(scannedISBN);
        } catch (error) {
         console.error('Error in handleBarcodeScanned:', error);
        }
    };

    useEffect(() => {
        if(bookDetails) {
            updateForm(bookDetails);
        }
     }, [bookDetails]);
    
    const handleBarcodeScanned = async (code) => {
        console.log('Scanned Code:', code);
        try {
            const response = await axios.get(
                `https://www.googleapis.com/books/v1/volumes?q=isbn:${code}` 
            );

            if (response.data && response.data.items && response.data.items.length > 0) {
                
                const bookInfo = response.data.items[0].volumeInfo;
                console.log('Book Ιnfo from Google:', bookInfo);
                await setBookDetails({
                    title: bookInfo.title,
                    author: bookInfo.authors[0],
                    numberOfPages: bookInfo.pageCount,
                    cover: bookInfo.imageLinks?.thumbnail,
                    year: bookInfo.publishedDate,
                    genre: bookInfo.categories[0] || '',
                    isbn: code,
                    publisher: bookInfo.publisher,
                    type: 'audio',
                    readDate: getDate() || ""
                });
                return;
            } else {
                console.error('No book details found for the scanned ISBN:', code);
            }
        } catch (error) {
            console.error('Error fetching book details:', error);
        }
    }

    const { ref } = useZxing({
        onDecodeResult(result) {
          handleDetected(result.getText());
        },
      });
    
      return (
        <>
          <video ref={ref} />
        </>
      );
};

function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${year}/${month}/${date}`;
  }

export default ScannerService;
