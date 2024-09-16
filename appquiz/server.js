const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 12000;

mongoose.connect('mongodb://localhost/quizdb', {
    useNewUrlParser: true,
    userUnifiedTopology: true,
});

app.use(express.json());
app.use(express.static('public'));

const { Question, Score} = require('./models');

app.get('/api/questions', async (req, res) => {
    try {
    const questions = await Question.find();
    res.json(questions);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post('/api/scores', async (req, res) => {
    try {
    const score = new Score(req.body);
    await score.save();
    res.status(201).send();
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(12000, () => {
console.log('Server is running on port 12000');
});
