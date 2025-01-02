import mongoose from 'mongoose';


if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const person_name = process.argv[3]

const phonenumber = process.argv[4]


const url =
  `mongodb+srv://pronom8:${password}@cluster0.hhycu.mongodb.net/PhoneBookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', phonebookSchema)

const note = new Person({
  name: person_name,
  number: phonenumber,
})

note.save().then(result => {
  console.log('added', person_name,'number', phonenumber, 'to phonebook')
  mongoose.connection.close()
})