const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swagger');
const Book = require('./models/Book');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - userId
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the book
 *         author:
 *           type: string
 *           description: The author of the book
 *         comments:
 *           type: string
 *           description: Additional comments about the book
 *         date:
 *           type: string
 *           format: date
 *           description: The date associated with the book
 *         userId:
 *           type: string
 *           description: The ID of the user who owns the book
 */

/**
 * @swagger
 * /api/booksave:
 *   post:
 *     summary: Save a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       201:
 *         description: The book was successfully saved
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Server error
 */
app.post('/api/booksave', async (req, res) => {
    try {
        const { title, author, comments, date, userId } = req.body;
        
        // Validate required fields
        if (!title || !author || !userId) {
            return res.status(400).json({ 
                message: 'Title, author, and userId are required' 
            });
        }

        const savedBook = await Book.save({
            title,
            author,
            comments,
            date: '01-01-2025',
            userId
        });

        res.status(201).json(savedBook);
    } catch (error) {
        console.error('Error in POST /api/books:', error);
        res.status(500).json({ 
            message: 'Error saving book data',
            error: error.message 
        });
    }
});

/**
 * @swagger
 * /api/books/{userId}:
 *   get:
 *     summary: Get all books for a specific user
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: List of books for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 *       500:
 *         description: Server error
 */
app.get('/api/books/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const books = await Book.getByUserId(userId);
        res.json(books);
    } catch (error) {
        console.error('Error in GET /api/books:', error);
        res.status(500).json({ 
            message: 'Error fetching books',
            error: error.message 
        });
    }
});

/**
 * @swagger
 * /api/getbooks:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: List of all books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 *       500:
 *         description: Server error
 */
app.get('/api/getbooks', async (req, res) => {
    try {
        const books = await Book.getAllBooks();
        res.json(books);
    } catch (error) {
        console.error('Error in GET /api/getbooks:', error);
        res.status(500).json({ 
            message: 'Error fetching books',
            error: error.message 
        });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Swagger documentation available at http://localhost:${PORT}/api-docs`);
}); 