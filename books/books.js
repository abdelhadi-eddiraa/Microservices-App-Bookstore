require("dotenv").config();
const express = require('express');
const DbConnect=require('../db/db')
const BookModel=require('../books/Book');

DbConnect();

const app = express();
const port = 3000;
app.use(express.json())


app.post('/book', (req, res) => {
    const newBook = new BookModel({...req.body});
    newBook.save().then(() => {
          res.send('New Book added successfully!')
    }).catch((err) => {
         res.status(500).json({message:err.message});
    })
})



app.get('/books',(req,res)=>{
   const books=BookModel.find().then((books)=>{
    if (books.length !== 0) {
        res.json(books)
  } else {
      res.status(404).send('Books not found');
 }
   }).catch((err)=>{
    res.status(500).json({message:err.message});

   })
})



app.get('/book/:id', (req, res) => {
    BookModel.findById(req.params.id).then((book) => {
        if (book) {
           res.json(book)
        } else {
            res.status(404).send('Books not found');
        }
     }).catch((err) => {
        res.status(500).send('Internal Server Error!');
    });
})
app.delete('/book/:id', (req, res) => {
    BookModel.findOneAndRemove(req.params.id).then((book) 	=> {
        if (book) {
             res.json('Book deleted Successfully!')
        } else {
            res.status(404).send('Book Not found!'); 
        }
    }).catch((err) => {
         res.status(500).send('Internal Server Error!');
    });
});








app.listen(port, () => {
    console.log(`Up and Running on port ${port} - This is Book service`);
})