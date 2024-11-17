const express = require('express');
const mongoose = require('mongoose');
const CourseModel = require('./models/coursemodel');

const app = express();
app.use(express.json());
//http://localhost:5000

//GET
app.get('/cources', async(req,res) => {
try{
const result = await CourseModel.find({})
res.status(200).send({
issuccessfull: true,
data: result 
})

} catch(error){
res.status(400).send({
    issuccessfull: false,
    message: error.message,
    data: error
})
}
})

//BY ID
app.get('/cources/:id', async(req,res) => {
    try{
        const id = req.params.id
    const result = await CourseModel.findById(id)
    res.status(200).send({
    issuccessfull: true,
    data: result 
    })
    
    } catch(error){
    res.status(400).send({
        issuccessfull: false,
        message: error.message,
        data: error
    })
    }
    })

//POST
app.post('/cources', (req, res) => {
try {

const body = req.body;
const courseObj = {
    name: body.name,
    duration: body.duration
}

const resObj = new CourseModel({ ...courseObj})


resObj.save().then((dbRes) => {
    res.status(201).send({
        issuccessfull: true,
        data: dbRes,
        message: "course added successdully "
    })
}).catch((err) => {
throw err
})



}catch(error) {
    console.log(error);
res.status(400).send({
    issuccessfull: false,
    message: error.message,
    data: error
})
}


})

//DELETE
app.delete('/cources/:id', async(req,res) => {

try {
const id = req.params.id;
const result = await CourseModel.findByIdAndDelete(id);

res.status(200).send({
issuccessfull: true,
message: "data deleted successfully!"
})


}catch(error) {
console.log(error);
res.status(400).send({
    issuccessfull: false,
    message: error.message,
    data: error
})
}
})

//UPDATE
app.put('/cources/:id', async(req, res) => {
    try{
        const id = req.params.id
        const body = req.body;

const result = await CourseModel.findByIdAndUpdate(id, body, { new: true});
res.status(200).send({
    issuccessfull: true,
    message: "record updated successfully",
    data: result
})
} catch (error) {
    console.log(error)
res.status(400).send({
    issuccessfull: false,
    message: error.message,
    data: error
})
}
})




//mongodb+srv://backend: sonnit07@cls1.yewyb.mongodb.net/
mongoose.connect('mongodb+srv://backend:sonnit07@cls1.yewyb.mongodb.net/')
.then(() => {
    app.listen(5000,() => {
        console.log('mongo db is connected and server listening at http://localhost:5000');
        
})
})
.catch((err) => {
    console.log(err);
    
})

