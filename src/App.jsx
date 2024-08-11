import { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css'

import FilterForm from './filter';
import PersonForm from './personform';
import PersonsList from './personlist';
import sercom from './sercom';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    sercom
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled');
        setPersons(initialPersons);
      })
      .catch(error => {
        console.error('Error fetching the data:', error);
      });
  }, []);

  const handlePersonChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const existingPerson = persons.find(person => person.name === newName);

    if (existingPerson) {
      const confirmReplace = window.confirm(
        `${newName} is already added to the phonebook, replace the old number with a new one?`
      );

      if (confirmReplace) {
        const updatedPerson = { ...existingPerson, number: newNumber };

        sercom
          .update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person =>
              person.id !== existingPerson.id ? person : returnedPerson
            ));
            setNewName('');
            setNewNumber('');
            setSuccessMessage(`Updated ${newName}`);
            setTimeout(() => {
              setSuccessMessage('');
            }, 5000);

          })
          .catch(error => {
            console.error('Error updating the person:', error);
          });

        return;
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: (persons.length + 1).toString() // Convert the integer to a string
      };

      sercom
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setNewName('');
          setNewNumber('');
          setSuccessMessage(`Added ${newName}`);
          setTimeout(() => {
            setSuccessMessage('');
          }, 5000);
        })
        .catch(error => {
          console.error('Error adding the person:', error);
        });
    }
  };



  const handleDelete = (id, name) => {
    sercom.remove(id.toString())
      .then(() => {
        setPersons(persons.filter(person => person.id.toString() !== id.toString()));
        setSuccessMessage(`Deleted ${name}`);
        setTimeout(() => {
          setSuccessMessage('');
        }, 5000);
      })
      .catch(error => {
        console.error('Error deleting the person:', error);
      });
  };

  const peopleToShow = filter
    ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      {successMessage && <div className="success">{successMessage}</div>}
      <FilterForm filter={filter} handleFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handlePersonChange={handlePersonChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <PersonsList personsToShow={peopleToShow} setPersons={setPersons} persons={persons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
