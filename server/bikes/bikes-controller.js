const Joi = require('joi');
const passport = require('passport');
// bikeModel 
const Bike = require('./bikes-model');

exports.getAllBikesForAdmin = (req,res,next)=>{

        Bike.find()
        .then((result)=>{

                if(result)
                {
                        res.status(200).json({

                                data: result,
                                Total_bikes_available: result.length
                        });
                }

        }).catch((err)=>{

                res.status(500).json({
                        error : err
                });

        });
};

exports.getAllBikes = (req,res,next)=>{

            Bike.find().select('_id bikeName bikeCompany bikeColor pricePerDay mileage isAvailable')
             .then((result)=>{

                        if(result)
                        {
                                res.status(200).json({
                                        data : result,
                                        Total_bikes_available : result.length
                                });
                        }


            }).catch((err)=>{

                res.status(500).json({
                        error : err
                });
                        
            });
};

exports.addBikes = (req,res,next)=>{


                const newBike = new Bike({

                        bikeName : req.body.bikeName,
                        bikeCompany : req.body.bikeCompany,
                        bikeColor : req.body.bikeColor,
                        bikePlateNumber : req.body.bikePlateNumber,
                        pricePerDay : req.body.pricePerDay,
                        mileage : req.body.mileage,
                        isAvailable : req.body.isAvailable
                });

                newBike.save().then((result)=>{

                        if(result)
                        {
                                res.status(200).json({

                                        message : 'Bike added successfully',
                                        result : result
                                });
                        }

                }).catch((err)=>{

                        res.status(500).json({
                                error : err
                        });

                });
};


exports.getBikes = (req,res,next)=>{

        const bikeId = req.params.bikeId;

        Bike.findOne({_id:bikeId}).exec()
        .then((result)=>{

                if(result)
                {
                        
                        res.status(200).json({

                                data : result
                        });
                }
                else
                {
                        res.status(404).json({
                                
                                message : `Bike not found`
                        });

                }


        }).catch((err)=>{

                res.status(500).json({
                        error : err
                });
        });

};


exports.deleteBikes = (req,res,next)=>{

        const bikeId = req.params.bikeId;

        Bike.deleteOne({_id:bikeId}).exec()
        .then((result)=>{

                if(result)
                {
                        
                        res.status(200).json({
                                
                                message : `deletion successful`
                        });
                }
                else
                {
                        res.status(404).json({
                                
                                message : `Bike not found`
                        });

                }

        }).catch((err)=>{

                res.status(500).json({
                        error : err
                });
        });


};

exports.updateBikes = (req,res,next)=>{


        const bikeId = req.params.bikeId;

        const data = req.body;

        const schema = Joi.object().keys({

                bikeName : Joi.string().optional(),
                bikeCompany : Joi.string().optional(),
                bikeColor : Joi.string().optional(),
                bikePlateNumber : Joi.string().optional(),
                pricePerDay : Joi.string().optional(),
                mileage : Joi.string().optional(),
                isAvailable : Joi.string().optional()

        });

        Joi.validate(data,schema,(err,value)=>{

                if(value)
                {
                        Bike.findByIdAndUpdate(bikeId,data,{new : true}).exec()
                        .then((result)=>{

                                if(result)
                                {
                                        res.status(200).json({
                                                message: 'Data Updated',
                                                data : result
                                        })
                                }

                        }).catch((err)=>{

                                res.status(500).json({
                                        error : err
                                });

                        });
                }
        });

};