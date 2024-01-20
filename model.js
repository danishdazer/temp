// itemModel.js
const util = require('util');
const db = require('./db');

const query = util.promisify(db.query).bind(db);

const Item = {

   validateInput:  (name, description) => {
    if (!name || !description) {
      throw new Error('Name and description are required');
    }
    const forbiddenPatterns = /--|drop|where|alter|^[0-9]/i; 
  if (forbiddenPatterns.test(name) || forbiddenPatterns.test(description)) {
    throw new Error('Invalid characters detected in name or description');
  }
  
   
  
    return true;
  },
  validateInput1:  (name, description,id) => {
    if (!name || !description || !id) {
      throw new Error('Name,description and id are required');
    }
    const forbiddenPatterns = /--|drop|where|alter|^[0-9]/i; 
    const forbiddenPatterns1 = /^[a-z]/i; 
  if (forbiddenPatterns.test(name) || forbiddenPatterns.test(description) ||  forbiddenPatterns1.test(id)) {
    throw new Error('Invalid characters detected in name or description');
  }
  
   
  
    return true;
  },
  validateInput2:  (id) => {
    if (!id) {
      throw new Error('id is required');
    }
    const forbiddenPatterns = /^[a-z]/i; 
  if (forbiddenPatterns.test(id)) {
    throw new Error('Invalid characters detected in name or description');
  }
  
   
  
    return true;
  },
 
  getAll: async () => {
    try {
      const results = await query('SELECT * FROM items');
      return results;
    } catch (err) {
      throw err;
    }
  }, 
  getID: async (id) => {
    try {
      const result=await query('SELECT * FROM items WHERE id=?', [id]);
      return result;
    } catch (err) {
      throw err;
    }
  },

  

  create: async (name, description) => {
    try {
      console.log(name);
      console.log(description);
      const results = await query('INSERT INTO items (name, description) VALUES (?, ?)', [name, description]);
      
      return { id: results.insertId, name, description };
    } catch (err) {
      throw err;
    }
  },

  update: async (id, name, description) => {
    try {
      const results = await query('UPDATE items SET name=?, description=? WHERE id=?', [name, description, id]);
      return { id, name, description };
    } catch (err) {
      throw err;
    }
  },

  delete: async (id) => {
    try {
      await query('DELETE FROM items WHERE id=?', [id]);
      return { message: 'Item deleted successfully' };
    } catch (err) {
      throw err;
    }
  },
};

module.exports = Item;
