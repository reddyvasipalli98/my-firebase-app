import React from 'react';
import { FaStar, FaStarHalf } from 'react-icons/fa';
import './Trending.css';

const Trending = () => {
    // Mock data for trending books with Open Library cover IDs
    const trendingBooks = [
        {
            id: 1,
            title: "The Midnight Library",
            author: "Matt Haig",
            authorBio: "British author known for both fiction and non-fiction works addressing mental health and wellbeing.",
            description: "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.",
            rating: 4.5,
            coverColor: "#1a73e8",
            isbn: "9780525559474",
            coverUrl: "https://covers.openlibrary.org/b/isbn/9780525559474-L.jpg"
        },
        {
            id: 2,
            title: "Klara and the Sun",
            author: "Kazuo Ishiguro",
            authorBio: "Nobel Prize-winning British novelist, screenwriter, and short-story writer known for his precise, eloquent prose.",
            description: "A thrilling story that offers a unique perspective on the human heart through the eyes of an artificial friend.",
            rating: 4.8,
            coverColor: "#34a853",
            isbn: "9780571364879",
            coverUrl: "https://covers.openlibrary.org/b/isbn/9780571364879-L.jpg"
        },
        {
            id: 3,
            title: "Project Hail Mary",
            author: "Andy Weir",
            authorBio: "American novelist known for his technically accurate science fiction with compelling human stories.",
            description: "A lone astronaut must save humanity from extinction in this interstellar adventure filled with science, humor, and heart.",
            rating: 4.7,
            coverColor: "#ea4335",
            isbn: "9780593135204",
            coverUrl: "https://covers.openlibrary.org/b/isbn/9780593135204-L.jpg"
        },
        {
            id: 4,
            title: "The Seven Husbands of Evelyn Hugo",
            author: "Taylor Jenkins Reid",
            authorBio: "American author known for her compelling historical fiction and complex female protagonists.",
            description: "An aging Hollywood starlet finally tells the truth about her scandalous life to an unknown journalist.",
            rating: 4.6,
            coverColor: "#fbbc05",
            isbn: "9781501161933",
            coverUrl: "https://covers.openlibrary.org/b/isbn/9781501161933-L.jpg"
        }
    ];

    const renderRating = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<FaStar key={`star-${i}`} />);
        }
        if (hasHalfStar) {
            stars.push(<FaStarHalf key="half-star" />);
        }

        return <div className="book-rating">{stars}</div>;
    };

    return (
        <div className="trending-container">
            <h1 className="trending-title">Trending Books</h1>
            <div className="books-grid">
                {trendingBooks.map(book => (
                    <div key={book.id} className="book-card">
                        <div className="book-cover">
                            <img 
                                src={book.coverUrl} 
                                alt={`${book.title} cover`}
                                className="book-cover-image"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'block';
                                }}
                            />
                            <div 
                                className="book-cover-fallback"
                                style={{ backgroundColor: book.coverColor }}
                            >
                                <span className="book-title">{book.title}</span>
                            </div>
                        </div>
                        <div className="book-info">
                            <div className="book-header">
                                <h2>{book.title}</h2>
                                {renderRating(book.rating)}
                            </div>
                            <h3 className="book-author">by {book.author}</h3>
                            <p className="book-description">{book.description}</p>
                            <div className="author-section">
                                <h4>About the Author</h4>
                                <p className="author-bio">{book.authorBio}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Trending; 