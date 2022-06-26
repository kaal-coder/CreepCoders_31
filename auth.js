require('dotenv').config();
const md5 = require("md5");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const port = 3000;
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const res = require('express/lib/response');
const mongoose = require('mongoose');
const app = express();
const encrypt = require('mongoose-encryption')



app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/userDB", { useNewUrlParser: true });

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

// userSchema.plugin(encrypt, { secret: process.env.SECRETS, encryptedFields: ['password'] })
// above line is used for level two encryption thorugh eviroment variable

const User = new mongoose.model("User", userSchema);
app.route("/")
    .get((req, res) => { res.render("home") });

app.route("/login")
    .get((req, res) => { res.render("login") })
    .post((req, res) => {
        User.findOne({ email: req.body.username }, (err, founduser) => {
            if (!err) {
                if (founduser) {
                    bcrypt.compare(req.body.password, founduser.password, function (err, result) {
                        if (result == true) {
                            res.render("secrets")
                        } else (res.render("something went wrong"))
                    });
                }
                else { res.redirect("/login") }
            }
            else { console.log(err) }
        })
    });

app.route("/register")
    .get((req, res) => { res.render("register") })
    .post((req, res) => {
        bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
            const newUser = new User({
                email: req.body.username,
                password: hash,
            });
            newUser.save((err) => {
                if (!err) { res.render("secrets") }
                else (console.log(err))
            })
        });

    });

app.route("/logout")
    .get((req, res) => { res.render("login") });
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
