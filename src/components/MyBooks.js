import React, { useState } from 'react';
import LoadingSpinner from './LoadingSpinner';
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

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [validationErrors, setValidationErrors] = useState({});

    const validateForm = () => {
        const errors = {};
        if (!newBook.title.trim()) {
            errors.title = 'Title is required';
        } else if (newBook.title.length > 100) {
            errors.title = 'Title must be less than 100 characters';
        }

        if (!newBook.author.trim()) {
            errors.author = 'Author is required';
        } else if (newBook.author.length > 50) {
            errors.author = 'Author name must be less than 50 characters';
        }

        if (newBook.comments && newBook.comments.length > 500) {
            errors.comments = 'Comments must be less than 500 characters';
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewBook(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear validation error when user starts typing
        if (validationErrors[name]) {
            setValidationErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!validateForm()) {
            return;
        }

        const newBookData = {
            id: Date.now(), // Temporary ID for optimistic update
            ...newBook,
            date: new Date().toISOString().split('T')[0]
        };

        // Optimistic update
        setBooks(prev => [...prev, newBookData]);
        setIsSubmitting(true);

        try {
            const response = await fetch('/saveBookData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newBookData)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                throw new Error(errorData?.message || 'Failed to save book data');
            }

            const savedBook = await response.json();

            // Update with actual server data
            setBooks(prev => prev.map(book => 
                book.id === newBookData.id ? savedBook : book
            ));

            setNewBook({
                title: '',
                author: '',
                comments: ''
            });
        } catch (err) {
            // Revert optimistic update
            setBooks(prev => prev.filter(book => book.id !== newBookData.id));
            setError(err.message || 'Failed to save book. Please try again.');
            console.error('Error saving book:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="mybooks-container">
            <section className="reading-list-section">
                <h1>My Reading Journey</h1>
                <div className="books-list">
                    {books.map(book => (
                        <div key={book.id} className={`book-entry ${book.id === Date.now() ? 'optimistic' : ''}`}>
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
                            disabled={isSubmitting}
                            className={validationErrors.title ? 'error' : ''}
                        />
                        {validationErrors.title && (
                            <span className="validation-error">{validationErrors.title}</span>
                        )}
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            name="author"
                            value={newBook.author}
                            onChange={handleInputChange}
                            placeholder="Author"
                            required
                            disabled={isSubmitting}
                            className={validationErrors.author ? 'error' : ''}
                        />
                        {validationErrors.author && (
                            <span className="validation-error">{validationErrors.author}</span>
                        )}
                    </div>
                    <div className="form-group">
                        <textarea
                            name="comments"
                            value={newBook.comments}
                            onChange={handleInputChange}
                            placeholder="Your thoughts about the book..."
                            rows="3"
                            disabled={isSubmitting}
                            className={validationErrors.comments ? 'error' : ''}
                        />
                        {validationErrors.comments && (
                            <span className="validation-error">{validationErrors.comments}</span>
                        )}
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button 
                        type="submit" 
                        className="submit-button"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <LoadingSpinner />
                                Saving...
                            </>
                        ) : 'Add to My Books'}
                    </button>
                </form>
            </section>
        </div>
    );
};

export default MyBooks; 