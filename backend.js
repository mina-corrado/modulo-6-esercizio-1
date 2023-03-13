const mongoose = require('mongoose');
const express = require('express');

// mongodb+srv://minacorrado:SW14D3KwA2WilPUH@cluster0.oopravd.mongodb.net/test
const app = express();
app.use(express.json());

const autoreSchema = new mongoose.Schema({
    // _id: {type: String, required: true},
    nome: {type: String, required: true},
    cognome: {type: String, required: true},
    email: {type: String, required: true},
    data_di_nascita: {type: String, required: true},
    avatar: {type: String, required: false}
});
const autoreModel = mongoose.model('Autore', autoreSchema);

app.get('/authors', async (req, res) => {
    const result = await autoreModel.find();
    return res.json(result);
});
app.get('/authors/:id', async (req, res) => {
    const {id} = req.params;
    let result;
    try {
        result = await autoreModel.findById(id);
        return res.json(result);
    } catch (err) {
        console.log(err);
        return res.status(500).json({error: err});
    }
});
app.post('/authors', async (req, res) => {
    const body = req.body;
    const newAuthor = new autoreModel({...body});
    try {
        const result = newAuthor.save();
        return res.status(201).json({result});            
    } catch (err) {
        console.log(err);
        return res.status(500).json({error: err});
    }
});
app.put('/authors/:id', async (req, res) => {
    const {id} = req.params;
    const body = req.body;
    try {
        const author = await autoreModel.findById(id);
        console.log("author=> ",author);
        const result = await autoreModel.updateOne({_id: author._id},{...body});
        console.log('modified ', result.modifiedCount)
        return res.json(result);
    } catch (err) {
        console.log(err);
        return res.status(500).json({error: err});
    }
});
app.delete('/authors/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const author = await autoreModel.findByIdAndDelete(id);
        return res.json(author);
    } catch (err) {
        console.log(err);
        return res.status(500).json({error: err});
    }
});

const start = async() => {
    try {
        await mongoose.connect('mongodb+srv://minacorrado:SW14D3KwA2WilPUH@cluster0.oopravd.mongodb.net/Epicode')
        app.listen(3000, ()=>{
            console.log("listening on port 3000")
        });    
    } catch (error) {
        console.log("error: ", error);    
    }
}

//avvio
start();