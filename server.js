import express from 'express';
import { promises as fs } from 'fs';
import cors from 'cors';
import morgan from 'morgan';
import morganBody from 'morgan-body';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies
app.use(morgan('dev')); 
app.use(express.static('dist'))

morganBody(app);

const getDataFromFile = async () => {
    const data = await fs.readFile('db.json', 'utf8');
    return JSON.parse(data).persons;
};

const saveDataToFile = async (data) => {
    await fs.writeFile('db.json', JSON.stringify({ persons: data }, null, 2));
};

app.get('/api/persons', async (req, res) => {
    try {
        const persons = await getDataFromFile();
        res.json(persons);
    } catch (error) {
        res.status(500).json({ error: 'Failed to read data from file' });
    }
});

app.get('/api/persons/:id', async (req, res) => {
  try {
      const persons = await getDataFromFile();
      const id = parseInt(req.params.id);
      const person = persons.find(person => person.id == id);

      if (person) {
          res.json(person);
      } else {
          res.status(404).json({ error: 'Person not found' });
      }
  } catch (error) {
      res.status(500).json({ error: 'Failed to read data from file' });
  }
});


app.post('/api/persons', async (req, res) => {
  try {
      const { name, number } = req.body;

      // Check if both name and number are provided
      if (!name || !number) {
          return res.status(400).json({ error: 'Name and number are required' });
      }

      // Get current list of persons from the file
      const persons = await getDataFromFile();

      // Check if the name already exists in the list
      const nameExists = persons.some(person => person.name === name);
      if (nameExists) {
          return res.status(400).json({ error: 'Name must be unique' });
      }

      // Create a new person object
      const newPerson = { id: persons.length + 1, name, number };

      // Add the new person to the list and save to the file
      persons.push(newPerson);
      await saveDataToFile(persons);

      
      res.status(201).json(newPerson);
  } catch (error) {
     
      console.error('Error saving data:', error);

      
      res.status(500).json({ error: 'Failed to save data to file' });
  }
});



app.delete('/api/persons/:id', async (req, res) => {
    try {
        let persons = await getDataFromFile();
        const id = req.params.id;
        persons = persons.filter(person => person.id !== id);
        await saveDataToFile(persons);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete data from file' });
    }
});

app.put('/api/persons/:id', async (req, res) => {
    try {
        let persons = await getDataFromFile();
        const id = parseInt(req.params.id);
        const updatedPerson = { id, ...req.body };
        persons = persons.map(person => person.id === id ? updatedPerson : person);
        await saveDataToFile(persons);
        res.json(updatedPerson);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update data in file' });
    }
});



app.get('/info', async (req, res) => {
  try {
      const persons = await getDataFromFile();
      const numberOfPersons = persons.length;
      const currentTime = new Date();
      res.send(`
          <p>Phonebook has info of ${numberOfPersons} people</p>
          <p>${currentTime}</p>
      `);
  } catch (error) {
      console.log("failed to fetch info");
  }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/api/persons`);
});
