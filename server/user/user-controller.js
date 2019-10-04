const express = require('express');
const User = require('./user-model');
const bcrypt = require('bcryptjs');
const Joi = require('joi');


//signup
exports.signup = (req,res,next)=>{

        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const password2 = req.body.password2;
        const phone = req.body.phone;


        let errors = [];

        if(!name || !email || !password || !password2 || !phone)
        {
            errors.push({msg: 'all fields are required' });
        }
        if(password!==password2)
        {
            errors.push({msg: 'Passwords do not match, please confirm the password'});
        }
        if(password.length<6)
        {
            errors.push({msg: 'password must be atleast 6 characters long'});
        }
        if(phone.length<10)
        {
            errors.push({msg: 'Please provide valid phone number'});
        }
        if(errors.length>0)
        {
            res.json({
                message : errors
            });
        }
        else
        {   
            errors = [];
            User.findOne({ email:email })
            .then((result)=>{

                    if(result)
                    {
                        errors.push({msg: 'Email already registered'});

                        res.json({
                            message: errors
                        });
                    }
                    else
                    {
                        const newUser = new User({
                            name : name,
                            email : email,
                            password : password,
                            phone : phone
                        });

                        //hash password

                        bcrypt.genSalt(10,(err,salt)=>{

                                bcrypt.hash(newUser.password,salt,(err,hash)=>{

                                        if(err)
                                        {
                                            console.log(err);
                                        }
                                        else
                                        {
                                            newUser.password = hash;
                                            newUser.save()
                                            .then((result)=>{

                                                res.status(200).json({
                                                    message: 'Registration Successful, Plesase login in to continue',
                                                    result : {
                                                        message: `You can login using ${result.email}`
                                                    }
                                                });

                                            }).catch((err)=>{

                                                    res.status(500).json({
                                                        error: err
                                                    });
                                            });
                                        }   

                                });
                                
                        });

                    }

            }).catch((err)=>{

                res.status(500).json({
                    error: err
                });

            });
        }
}



// login
exports.login = (req,res,next)=>{

        const email = req.body.email;
        const password = req.body.password;

        if(!email || !password)
        {
            res.json({
                message : 'Please fill all the fields'
            });
        }

        User.findOne({ email: email })
            .then((result)=>{

                if(!result)
                {
                    res.status(404).json({
                        message : 'email or password incorrect'
                    });
                }
                else
                {
                    
                    bcrypt.compare(password,result.password,(err,isMatch)=>{

                            if(err)
                            {
                                res.status(401).json({

                                        message: 'Authenticaton Failed'
                                });
                            }
                            else
                            {
                                res.status(200).json({
                                    message :  `Welcome ${result.name}`,
                                    all_bikes : 'localhost:5000/users/bikes'
                                });
                            }
                    });

                }


            }).catch((err)=>{

                console.log(err);
                

                res.status(500).json({

                        error : err
                });

            });
};

// user update
exports.update = (req,res,next)=>{

        const userId = req.params.userId;
        const data = req.body;

        const schema = Joi.object().keys({

                name: Joi.string().optional(),
                phone : Joi.string().optional()
        });

        Joi.validate(data,schema,(err,value)=>{

                if(value)
                {
                    User.findByIdAndUpdate(userId,data,{new:true}).exec()
                    .then((result)=>{

                        if(result)
                        {
                            res.status(200).json({
                                message : 'data updated',
                                data : result
                            });
                        }
                    }).catch((err)=>{

                        res.status(500).json({

                                error : err
                        });

                    });
                }
        });

};