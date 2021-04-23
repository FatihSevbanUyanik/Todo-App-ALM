// config
import './service/mongo'
import keys from './util/keys';

// imports
import {app} from './app'

// Exception catcher
process.on('uncaughtException', err => {
   console.log('UNCAUGHT EXCEPTION! 💥')
   console.log(err.name, err.message)
})

// Server Connection
const server = app.listen(keys.SERVER_PORT, () => {
   console.log(`Server running on Port ${keys.SERVER_PORT}`)
})

export { app, server }