require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.json())
app.use(express.static('dist'))
const cors = require('cors')
app.use(cors())
const Contact = require('./models/contact')

app.get('/api/data',(request , response) => {
    Contact.find({}).then(result => {
      response.json(result)
    })
  })

  app.get('/api/data/:id',(request , response) => {
    Contact.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note)
      } else 
      {
        response.status(404).end()
      }
    })
})

app.delete('/api/data/:id',(request,response) =>
{
  Contact.findByIdAndDelete(request.params.id).then(res => {
    if(res)
    {
      console.log('Deletion successful')
    }
    else
    {
      response.status(404).end()
    }
  })
})

app.post('/api/data',(request,response) => {

    const body = request.body
  
    if (body.name === undefined) {
      return response.status(400).json({ error: 'content missing' })
    }
  
    const newPerson = new Contact({
      name: body.name,
      phonenumber: body.phonenumber,
    })
  
    newPerson.save().then(savedNote => {
      console.log(savedNote)
      response.json(savedNote)
  })
})

app.put('/api/data/:id',(request,response) => {
    const body = request.body
    
    const person = {
      name: body.name,
      phonenumber: body.phonenumber,
    }
    
    Contact.findByIdAndUpdate(request.params.id,person,{ new: true })
    .then(per => {
      response.json(person)
    })
  })

const PORT = process.env.PORT 
app.listen(PORT , ()=> 
{
    console.log('Server Running')
})


  