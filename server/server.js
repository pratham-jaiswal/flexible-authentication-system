const express = require('express');
const mongoose = require("mongoose");
const argon2 = require('argon2');
const crypto = require('node:crypto');
const jwt = require('jsonwebtoken');
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const cors = require('cors');

const app = express();
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(mongoSanitize());
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'", "ka-f.fontawesome.com"],
            scriptSrc: ["'self'", "'unsafe-inline'", "kit.fontawesome.com"],
            styleSrc: ["'self'", "'unsafe-inline'", "fonts.googleapis.com"],
        },
    })
);
app.use(cors());

app.set('trust proxy', 'loopback');
const rateLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 5,
});

mongoose.connect(process.env.DB_URL);

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    address: String,
});

const User = mongoose.model("User", userSchema);

const authenticateToken = (req, res, next) => {
    const token = req.cookies.jwtToken;
    if (token != null){
        const decoded = jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                console.error(err);
                return res.redirect("/login");
            }
        
            req.user = user;
            next();
        });
    }
};

app.get('/api/data', authenticateToken, async (req, res) => {
    return res.json({ isValid: true, userData: req.user });
});

app.post('/api/register', rateLimiter, async (req, res) => {
    let { name, email, password } = req.body;
    if (!email || !password){
        return res.status(400).json({ message: 'Email and password cannot be empty' });
    }

    let findUser;
    try{
        findUser = await User.findOne({ email: email })
    }
    catch(err){
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }

    if(findUser){
        return res.status(401).json({ message: 'An account with that email already exists' });
    }

    let salt = crypto.randomFillSync(Buffer.alloc(32)).toString("hex");

    try {
        const hashedPassword = await argon2.hash(password, {
            type: argon2.argon2id,
            salt: Buffer.from(salt, 'hex'),
            timeCost: parseInt(process.env.TIME_COST),
            memoryCost: parseInt(process.env.MEMORY_COST),
            parallelism: parseInt(process.env.PARALLELISM),
            hashLength: parseInt(process.env.HASHLENGTH)
        });

        let newUser = new User({
            name: name,
            email: email,
            password: hashedPassword,
        });

        await newUser.save();

        const token = jwt.sign({ userID: newUser._id, name: newUser.name, email: newUser.email, address: newUser.address }, process.env.JWT_SECRET, { algorithm: 'HS512' })
        res.cookie("jwtToken", token, {
            httpOnly: true,
            secure: Boolean(process.env.SECURE_COOKIE),
            sameSite: "strict",
        });
        
        res.status(200).json({ message: 'Register successful' });
    } 
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/api/login', rateLimiter, async (req, res) => {
    let { email, password } = req.body;
    if (!email || !password){
        return res.status(400).json({ message: 'Email and password cannot be empty' });
    }

    let findUser;
    try{
        findUser = await User.findOne({ email: email })
    }
    catch(err){
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }

    if(!findUser){
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    try {
        const isPasswordValid = await argon2.verify(findUser.password.toString('utf8'), password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ userID: findUser._id, name: findUser.name, email: findUser.email, address: findUser.address  }, process.env.JWT_SECRET, { algorithm: 'HS512' })
        res.cookie("jwtToken", token, {
            httpOnly: true,
            secure: Boolean(process.env.SECURE_COOKIE),
            sameSite: "strict",
        });
        res.status(200).json({ message: 'Login successful' });
    } 
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/api/metamask', async (req, res) => {
    const { address } = req.body;
    if (!address){
        return res.status(400).json({ message: 'Invalid address' });
    }

    let findUser;
    try{
        findUser = await User.findOne({ address: address })
    }
    catch(err){
        console.error(err);
        return res.status(500).json({ message: 'Internal serve0r error' });
    }

    try {
        if(!findUser){
            let newUser = new User({
                address: address
            });
            await newUser.save();
            findUser = newUser;
        }

        const token = jwt.sign({ userID: findUser._id, name: findUser.name, email: findUser.email, address: findUser.address  }, process.env.JWT_SECRET, { algorithm: 'HS512' })
        res.cookie("jwtToken", token, {
            httpOnly: true,
            secure: Boolean(process.env.SECURE_COOKIE),
            sameSite: "strict",
        });
        res.status(200).json({ message: 'Login successful' });
    } 
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal 0server error' });
    }
  });

app.post('/api/logout', (req, res) => {
    res.clearCookie('jwtToken');
    res.status(200).json({ message: 'Logout successful' });
});

app.listen(5000, function () {
    console.log("Server started on port 5000");
});