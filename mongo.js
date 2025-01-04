import mongoose from 'mongoose';

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { argv } from 'process';

import dotenv from 'dotenv';
dotenv.config();


//const password = process.argv[2]

//const person_name = process.argv[3]

//const phonenumber = process.argv[4]


const url =
  `mongodb+srv://pronom8:${process.env.MONGODB_PASSWORD}@cluster0.hhycu.mongodb.net/PhoneBookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
//mongoose.connect(url)

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', phonebookSchema)

const connectToDatabase = async () => {
  try {
    await mongoose.connect(url);
    console.log('Connected to MongoDB');
   // console.log("Password:", process.env.MONGODB_PASSWORD);
  } catch (error) {
  //  console.log("Password:", process.env.MONGODB_PASSWORD);
    console.error('Error connecting to MongoDB:', error.message);
  }
};


const getAllPersons = async () => {
  return await Person.find({});
};

const addPerson = async (name, number) => {
  const person = new Person({ name, number });
  return await person.save();
};

const closeConnection = async () => {
  await mongoose.connection.close();
  console.log('Disconnected from MongoDB');
};



//async function getpersons() {
 // people.forEach(person => {

 // })
  
//}


async function main() {
  await connectToDatabase();

 

  const password = process.argv[2];
  const person_name = process.argv[3];
  const phonenumber = process.argv[4];

  if (!person_name && !phonenumber) {
    const people = await getAllPersons();
    console.log('Phonebook:');
    people.forEach(person => {
      console.log(`${person.name} ${person.number}`);
    });
  } else if (person_name && phonenumber) {
    await addPerson(person_name, phonenumber);
    console.log(`Added ${person_name}, number ${phonenumber} to phonebook`);
  } else {
    console.log('Provide both name and number to add, or leave both empty to list all.');
  }

  await closeConnection();
}


// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

if (argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
