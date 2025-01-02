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

async function main() {
  try {
    await mongoose.connect(url);
    //console.log('We are in MongoDB');

    if (!person_name && !phonenumber) {
      const people = await Person.find({});
      console.log('Phonebook:');
      people.forEach(person => {
        console.log(`${person.name} ${person.number}`);
      });
    } else if (person_name && phonenumber) {
      const person = new Person({
        name: person_name,
        number: phonenumber,
      });
      await person.save();
      console.log(`Added ${person_name}, number ${phonenumber} to phonebook`);
    } else {
      console.log('Provide both name and number to add, or leave both empty to list all.');
    }
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await mongoose.connection.close();
    //console.log('No more in MongoDB');
  }
}

main();