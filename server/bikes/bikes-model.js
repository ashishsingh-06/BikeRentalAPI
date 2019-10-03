const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bikeSchema = new Schema({

        bikeName : {
            type : String,
            required : true
        },

        bikeCompany : {
            type : String,
            required : true
        },

        bikeColor : {
            type: String,
            required : true    
        },

        bikePlateNumber: {
            type : String,
            required : true
        },

        pricePerDay : {
            type : String,
            required : true
        },

        mileage : {
            type : String,
            required : true
        },

        isAvailable : {
            type : Boolean,
            default : true
        },
      
        
});     

const Bike = mongoose.model('Bike',bikeSchema);

module.exports = Bike;
