import React from 'react';
import { useState, useEffect } from 'react';
import sercom from './sercom';


const PersonsList = ({ personsToShow, handleDelete }) => {



  

  const confirmDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {

      handleDelete(id, name);
    }
  };

  return (
    <div>
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map(person =>
          <li key={person.id}>{person.name} {person.number}
          <button onClick={() => confirmDelete(person.id, person.name) }>Delete</button>
           </li>
        )}
      </ul>
    </div>
  );
};

export default PersonsList;
