const mongoose = require('mongoose');

const connectDB = async() => {
    try{

        mongoose.connect(process.env.MONGO_URI).then(()=>{
            console.log("mongoose connected successfully");
        }).catch((err)=>{
            console.log("errror while connecting ")
        })

    } catch(error){
        console.log(error);
    }
}

module.exports = connectDB;