// imports
import express from 'express';
const app = express();

// middlewares
app.use(express.json());

// routes

// Exception catcher
process.on('uncaughtException', err => {
   console.log('UNCAUGHT EXCEPTION! 💥')
   console.log(err.name, err.message)
})

// Server Connection
app.listen(8080, () => {
   console.log(`Server running on Port ${8080}`)
})