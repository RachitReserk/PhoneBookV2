const mongoose = require('mongoose')
mongoose.set('strictQuery',false)

const url = process.env.MONGODB_URI
console.log('Connecting to MONGODB')

mongoose.connect(url).then(res => {
    console.log('Connected to MongoDB')
})
.catch(error => console.log('Error Connecting to MongoDB'))

const contactSchema = new mongoose.Schema({
    name: String,
    phonenumber: String,
})

contactSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})

module.exports = mongoose.model('Contact',contactSchema)
