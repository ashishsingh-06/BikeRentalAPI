const User = require('../user/user-model');
const Admin = require('../admin/admin-model');
const bcrypt = require('bcryptjs');

// get all users
exports.Users = (req,res,next)=>{

        User.find().then((result)=>{

                if(result)
                {
                    
                    res.status(200).json({
                        data: {
                            result : result
                        },
                        no_of_users : result.length
                    });
                }

        }).catch((err)=>{

                res.status(500).json({
                    error : err
                });
        });
}


// admin signup
exports.signup = (req,res,next)=>{

    let errors = [];

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const password2 = req.body.password2;
    const phone = req.body.phone;
    const shopAddress = req.body.shopAddress;

  
    if(!name || !email || !password || !password2 || !phone || !shopAddress)
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
        Admin.findOne({ email:email })
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
                    const newUser = new Admin({
                        name : name,
                        email : email,
                        password : password,
                        phone : phone,
                        shopAddress: shopAddress
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

//admin login
exports.login = (req,res,next)=>{


    const email = req.body.email;
    const password = req.body.password;

    if(!email || !password)
    {
        res.json({
            message : 'Please fill all the fields'
        });
    }

    Admin.findOne({ email: email })
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
                                result : {
                                    add_bikes : 'localhost:5000/admin/addBikes',
                                    get_bikes : 'localhost:5000/admin/bikes',
                                    update_bikes : 'localhost:5000/admin/updateBikes',
                                    delete_bike : 'localhost:5000/admin/deleteBikes',
                                    get_users : 'localhsot:5000/admin/users'
                                }
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

}


//admin add bikes
exports.addBikes = (req,res,next)=>{

        


}