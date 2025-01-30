const mongoose = require("mongoose");
const initData= require("./data.js");
const Listing = require("../models/listing.js")

main()
.then(()=>{
    console.log("connection successful to db");
})
.catch((error)=>{
    console.log("error not connected")
});
async function main() {
    await mongoose.connect("mongodb+srv://tambehimanshu18:Himanshutambe@cluster0.idw9h.mongodb.net/wanderlust")
    
}

const initDB =async()=>{
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj,owner:'67927a7a30773a4f1779a068'}));
    await Listing.insertMany(initData.data);
    console.log("Data was initialized")
}
initDB();