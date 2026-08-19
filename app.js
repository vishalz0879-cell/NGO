const express=require("express");
const app=express();
const path=require("path");
const mongoose = require("mongoose");
const Listing=require("./models/listing.js")
const methodOverride=require("method-override");
const ejsMate = require("ejs-mate");



main()
.then(()=>{
    console.log("connect to Database")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/NGO');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

app.get("/",(req,res)=>{
    res.send("page is set up");
})

//home page
app.get("/home",(req,res)=>{
    res.render("listing/home.ejs")
})

//food page
app.get("/listing/food",(req,res)=>{
    res.render("listing/food.ejs")
})


//Dashboard
app.get("/listing/show",async (req,res)=>{
    const alllisting=await Listing.find({});
    res.render("listing/show.ejs",{alllisting});
});

//show detail route
app.get("/listing/:id",async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listing/detail.ejs",{listing})
})

//create route
app.post("/listing/show",async (req,res)=>{
    const newListing=new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listing/show")
})

//edit route
app.get("/listing/:id/edit",async (req,res)=>{
      let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listing/edit.ejs",{listing})
})



app.put("/listing/:id",async (req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listing/${id}`);

})

//Delete Route
app.delete("/listing/:id",async (req,res)=>{
    let {id}=req.params;
    let deletedListing= await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listing/show");
})



app.listen(8080,()=>{
    console.log("server is listening to port 8080");
})
