import React from "react";

const CoverImage = ({bookDetails}) =>{
    if (bookDetails && bookDetails.cover) {

        return (<img src={bookDetails.cover} alt="Book Cover" />);
    }
}

export default CoverImage;