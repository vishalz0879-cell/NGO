const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");

const Listing= require("../models/listing.js");



//home page
router.get("/",(req,res)=>{
    res.render("listing/home.ejs")
})

//food page
router.get("/food",(req,res)=>{
    res.render("listing/food.ejs")
})


//Dashboard
router.get("/show",wrapAsync(async (req,res)=>{
    const alllisting=await Listing.find({});
    res.render("listing/show.ejs",{alllisting});
}));

//show detail route
router.get("/:id",wrapAsync(async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listing/detail.ejs",{listing})
}));

//create route
router.post("/show",wrapAsync(async (req,res)=>{
    const newListing=new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listing/show")
}))

//edit route
router.get("/:id/edit",wrapAsync(async (req,res)=>{
      let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listing/edit.ejs",{listing})
}));



router.put("/:id",wrapAsync(async (req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listing/${id}`);

}))

//Delete Route
router.delete("/:id",wrapAsync(async (req,res)=>{
    let {id}=req.params;
    let deletedListing= await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listing/show");
}))

module.exports=router;