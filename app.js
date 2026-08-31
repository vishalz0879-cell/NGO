const express=require("express");
const app=express();
const path=require("path");
const mongoose = require("mongoose");
const Listing=require("./models/listing.js")
const methodOverride=require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError=require("./utils/ExpressError.js");
const wrapAsync=require("./utils/wrapAsync.js");

const listingRouter = require("./routes/listing.js");



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

app.get("/", (req, res) => {
    res.redirect("/listing");
});

app.use("/listing",listingRouter);




app.all("*splat",(req,res,next)=>{
    next(new ExpressError(404,"Page not exist"))
    
})

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("error.ejs", { statusCode, message });
});



app.listen(8080,()=>{
    console.log("server is listening to port 8080");
})
