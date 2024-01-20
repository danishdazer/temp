// app.js
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const Item =require('./model');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());




app.get('/items', async (req, res) => {
  try {
    const items = await Item.getAll();
    res.json(items);
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});
app.get('/items/:id', async (req, res) => {
    try {
      const validateInput = Item.validateInput2(req.params.id);
      const items = await Item.getID(req.params.id);
      res.json(items);
    } catch (err) {
      res.status(500).send('Internal Server Error');
    }
  });

app.post('/items', async (req, res) => {
    
    
  try {

    const { name, description } = req.body;
    console.log(name);
    const validateInput = Item.validateInput(name, description);

   
    const newItem = await Item.create(name, description);
    res.json(newItem);
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

app.put('/items/:id', async (req, res) => {
  try {
    const { name, description } = req.body;
    const validateInput = Item.validateInput1(name, description,req.params.id);
    const updatedItem = await Item.update(req.params.id, name, description);
    res.json(updatedItem);
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

app.delete('/items/:id', async (req, res) => {
  try {
    const validateInput = Item.validateInput2(req.params.id);

    await Item.delete(req.params.id);
    
    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
