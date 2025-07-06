require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express')
const connectToMongo = require('./db');
connectToMongo();

const app = express()
const port = process.env.PORT;
app.use(express.json())

// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`iNotebook-be listening on port ${port}`)
})
