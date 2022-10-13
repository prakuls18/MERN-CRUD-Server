const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')

const foodModel = require('./models/Food')
const { remove } = require('./models/Food')

require('dotenv').config()

app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://newuser:PrakulIsCool@crudappcluster.5xh83fm.mongodb.net/groceryfood", {
    useNewURLParser: true,
});

app.post('/insert', async (req, res) => {

    const foodName = req.body.foodName
    const amount = req.body.amount
    const food = new foodModel({foodName: foodName, amount: amount});
    
    try {
        await food.save();
        res.send("inserted data!");
    } catch(err) {
        console.log(err)
    }
});

app.get('/read', async (req, res) => {
    foodModel.find({}, (err, result) => {
        if (err) {
            res.send(err);    
        }
        res.send(result); 
    });
});

app.put('/update', async (req, res) => {
    const newFoodNumber = req.body.newFoodNumber;
    const id = req.body.id;
    try{
        await foodModel.findById(id, (error, updatedFood) => {
            updatedFood.amount = newFoodNumber;
            updatedFood.save();
        }).clone()
    }catch(err) {
        console.log(err)
    } res.send("update");
})

app.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    
    await foodModel.findByIdAndRemove(id).exec();
    res.send("delete");
});

app.listen(process.env.PORT || 3001, ()=> {
    console.log('Server running on port 3001...')
});