const express = require('express')
const mongoose = require('mongoose')
const Routes = require('./routes/routes')
const cors = require('cors')


const PORT = process.env.PORT || 3002

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use(Routes)



async function start() {
  try {
    await mongoose.connect('mongodb+srv://dbTaras:1234@cluster0.itxopzf.mongodb.net/?retryWrites=true&w=majority')
    app.listen(PORT, () => console.log(`Server start on port ${PORT}`))
  } catch (error) {
    console.log(error)
  }
}


start()







