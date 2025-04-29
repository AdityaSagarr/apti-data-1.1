const express = require('express');
const admin = require('firebase-admin');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 8001;

// Initialize Firebase Admin
const serviceAccount = require('./serviceAccountKey2.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the current directory
app.use(express.static(__dirname));

// Serve index.html for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// API endpoint to get questions
app.get('/api/questions', async (req, res) => {
  try {
    const snapshot = await db.collection('questions').get();
    const questions = [];
    snapshot.forEach(doc => {
      questions.push({
        id: doc.id,
        ...doc.data()
      });
    });
    res.json(questions);
  } catch (error) {
    console.error('Error getting questions:', error);
    res.status(500).json({ error: 'Failed to get questions' });
  }
});

// API endpoint to get a single question
app.get('/api/questions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await db.collection('questions').doc(id).get();
    if (!doc.exists) {
      return res.status(404).json({ error: 'Question not found' });
    }
    res.json({
      id: doc.id,
      ...doc.data()
    });
  } catch (error) {
    console.error('Error getting question:', error);
    res.status(500).json({ error: 'Failed to get question' });
  }
});

// API endpoint to update a question
app.put('/api/questions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const questionData = req.body;
    await db.collection('questions').doc(id).update(questionData);
    res.json({ success: true });
  } catch (error) {
    console.error('Error updating question:', error);
    res.status(500).json({ error: 'Failed to update question' });
  }
});

// API endpoint to delete a question
app.delete('/api/questions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection('questions').doc(id).delete();
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting question:', error);
    res.status(500).json({ error: 'Failed to delete question' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 