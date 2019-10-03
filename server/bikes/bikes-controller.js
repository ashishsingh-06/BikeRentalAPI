// bikeModel 
const Bike = require('./bikes-model');

exports.getAllBikes = (req,res,next)=>{

            Bike.find().select('_id bikeName bikeCompany bikeColor pricePerDay mileage isAvailable')
             .then((result)=>{

                        if(result)
                        {
                                res.status(200).json({
                                        data : result,
                                        Total_bikes_available : result.length
                                })
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
                        })

                });
}