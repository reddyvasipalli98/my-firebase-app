import React, { useState } from 'react';
import './MyBooks.css';

const MyBooks = () => {
    const [books, setBooks] = useState([
        {
            id: 1,
            title: "The Midnight Library",
            author: "Matt Haig",
            comments: "A beautiful reflection on life's infinite possibilities.",
            date: "2024-03-15"
        },
        {
            id: 2,
            title: "Atomic Habits",
            author: "James Clear",
            comments: "Transformative insights on building better habits.",
            date: "2024-03-10"
        }
    ]);

    const [newBook, setNewBook] = useState({
        title: '',
        author: '',
        comments: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewBook(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newBook.title || !newBook.author) return;

        setBooks(prev => [...prev, {
            id: Date.now(),
            ...newBook,
            date: new Date().toISOString().split('T')[0]
        }]);

        setNewBook({
            title: '',
            author: '',
            comments: ''
        });
    };

    return (
        <div className="mybooks-container">
            <section className="reading-list-section">
                <h1>My Reading Journey</h1>
                <div className="books-list">
                    {books.map(book => (
                        <div key={book.id} className="book-entry">
                            <div className="book-entry-header">
                                <h3>{book.title}</h3>
                                <span className="book-date">{book.date}</span>
                            </div>
                            <p className="book-author">by {book.author}</p>
                            <p className="book-comments">{book.comments}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="add-book-section">
                <h2>Add New Book</h2>
                <form onSubmit={handleSubmit} className="add-book-form">
                    <div className="form-group">
                        <input
                            type="text"
                            name="title"
                            value={newBook.title}
                            onChange={handleInputChange}
                            placeholder="Book Title"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            name="author"
                            value={newBook.author}
                            onChange={handleInputChange}
                            placeholder="Author"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <textarea
                            name="comments"
                            value={newBook.comments}
                            onChange={handleInputChange}
                            placeholder="Your thoughts about the book..."
                            rows="3"
                        />
                    </div>
                    <button type="submit" className="submit-button">
                        Add to My Books
                    </button>
                </form>
            </section>
        </div>
    );
};

export default MyBooks; 