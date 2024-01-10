import axios from 'axios';

export const getBooks = async () => {

    try {
        const response = await axios.get(
            'http://remote-dev.yobitti.fi:3002/books'
        );
        return response;

    } catch (error) {
        console.error('Error retrieving all the books:', error);
    }
}

export const addBook = async (book) => {
    console.log('Book to add:', book);

    try {
        const response = await axios.post(
            'http://remote-dev.yobitti.fi:3002/books', book 
        );
        return response;

    } catch (error) {
        console.error('Error making post request for new book:', error);
    }
}

export const deleteBook = async ({book}) => {

    try {
        const response = await axios.post(
            'http://remote-dev.yobitti.fi:3002', book 
        );
        return response;

    } catch (error) {
        console.error('Error deleting a book:', error);
    }
}


    

