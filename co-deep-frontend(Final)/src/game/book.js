import React from 'react';
import './book.css';

function Book({ onOpen }) {
  return (
    <div className="book" onClick={onOpen}>
      <div className="cover"></div>
    </div>
  );
}

export default Book;
