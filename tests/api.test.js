const request = require('supertest')
const app = require('../server')

describe('Book API', () => {
    test('should return all books', async () => {
    const response = await request(app).get('/api/books')

    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(3)

})

test('should return a book by ID', async () => {
    const response = await request(app).get('/api/books/1')
  
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('id', 1)
    expect(response.body).toHaveProperty('title')
})

test('should return a 404 upon invalid book ID', async () => {
    const response = await request(app).get('/api/books/-1000')
  
    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('error')
})

test('should create a new book', async () => {
    const newBook = {
        title: "The Catcher in the Rye",
        director: "J. D. Salinger",
        year: 1951,
        genre: "Coming-of-age fiction"
    }

    const response = await request(app)
        .post('/api/books')
        .send(newBook);
  
    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty("id")
    expect(response.body.title).toBe("The Catcher in the Rye")
})

test('should update existing book', async () => {
    const updatedBook = {
        title: "The Catcher in the Rye",
        director: "J. D. Salinger",
        year: 1951,
        genre: "Coming-of-age fiction"
    }

    const response = await request(app)
        .put('/api/books/1')
        .send(updatedBook);
  
    expect(response.status).toBe(200);
    expect(response.body.title).toBe("The Catcher in the Rye");
})


test('should delete existing book', async () => {
    const response = await request(app).delete('/api/books/1')

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('message')
})
})