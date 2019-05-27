const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');


router.get('/', (req, res, next) => {
    User.find()
    .select('_id email password')
    .exec()
    .then(result => {
        res.status(200).json({
            numberOfUsers: result.length,
            users: result
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

router.post('/signup', (req, res, next) => {
    User.find({
        email: req.body.email
    })
    .exec()
    .then(user => {

        if (user.length >= 1) {
            return res.status(409).json({
                message: 'Email already exists'
            });
        } else {
            bcrypt.hash(req.body.password, 10, (error, hash) => {
                const user = new User({
                    _id: new mongoose.Types.ObjectId(),
                    email: req.body.email,
                    password: hash
                });
                
                user.save()
                .then(result => {
                    res.status(201).json({
                        message: 'New user successfully created'
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    });
                });
            })
        }
    })
});


router.post('/login', (req, res, next) => {
    User.findOne({
        email: req.body.email
    })
    .exec()
    .then(user => {
        if (user.length < 1) {
            return res.status(401).json({message: 'Auth failed'});
        }
        
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (err) {
                return res.status(401).json({message: 'Auth failed'});
            }
            if (result) {
                // Token
                const token = jwt.sign(
                    {
                    email: req.body.email,
                    userID: user._id
                    }, 
                    'supersecretkey',
                    {
                        expiresIn: "1h"
                    });

                return res.status(200).json({
                    message: 'Auth successful',
                    token: token
                });
            }

            res.status(401).json({message: 'Auth failed'});

        });
    
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.delete('/:userID', (req, res, next) => {
    const id = req.params.userId;

    User.remove({
        _id: req.params.userID
    })
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'User successfully deleted',
            deletedUser: id
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;
