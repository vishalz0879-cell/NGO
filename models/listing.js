const mongoose= require("mongoose");
const Schema= mongoose.Schema;

const listingSchema=new Schema({
    
    eventName:{
        type:String,
        required:true
    },
    foodType:String,
    portionsKg:Number,
    distanceKm:Number,
    expiryHours:Number,
    pickupLocation:String,
    contactNumber:String,
    status:{
        type:String,
            enum:["Available","Claimed"],
            default:"Available"
    }
})

const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;