const mongoose= require("mongoose");
const Schema= mongoose.Schema;

const listingSchema=new Schema({
    id:Number,
    eventName:{
        type:String,
    },
    foodType:String,
    portionsKg:Number,
    distanceKm:Number,
    expiryHours:Number,
    pickupLocation:String,
    contactNumber:Number,
    status:{
        type:String,
        required:true
    }
})

const Listing=mongoose.model("listing",listingSchema);
module.exports=Listing;