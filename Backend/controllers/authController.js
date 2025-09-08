const User = require("../models/users")
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

//Generate JWT token
const generateToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET, {expiresIn: "1h"});
};

exports.googleAuth = async (req, res) => {
    try{
        // credential is the Google ID token just like JWT 
        const {credential} = req.body;

        if (!credential) {
            return req.status(400).json({message: 'Missing Google credential'})
        }

        // Verify the token
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        })

        const payload = ticket.getPayload();

        const googleId = payload.sub;
        const email = payload.email?.toLowerCase();
        const fullName = payload.name || '';
        const emailVerified = !!payload.email_verified;

        // verify if the email exists in the google
        if (!email) {
            return res.status(400).json({message: 'Google account has no email'});
        }

        // Find the user in the database
        let user = await User.findOne({$or: [{googleId}, {email}]});

        if (!user) {
            user = await User.create({
                fullName,
                email,
                googleId,
                provider: 'google',
                emailVerified,
            });
        }

        return res.status(200).json({
            id: user._id,
            user:{
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                provider: user.provider,
                emailVerified: user.emailVerified,
            },
            token: generateToken(user._id)
        });
    } catch (error) {
        console.error('googleAuth error:', err);
        return res.status(401).json({ message: 'Google sign-in failed', error: err.message });
    }
}

exports.registerUser = async (req, res) => {
    const {fullName, email, password} = req.body;

    // Check for missing information
    if (!fullName || !email || !password) {
        return res.status(400).json({message: "All fields are required"});
    };

    // Chck if the email exists, if not then try to register the user
    try{
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({message: "Email already exists"});
        };

        const user = await User.create({
            fullName,
            email,
            password
        });

        res.status(201).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        });
    }catch (err) {
        res.status(500).json({message: 'Registering new user unsuccessful', error: err.message});
    }
};

exports.loginUser = async (req, res) => {
    const {email, password} = req.body;

    if (!email || !password) {
        return res.status(400).json({message: "All fields are required."})
    }
    try{
        const user = await User.findOne({email});
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({message: "Invalid credentials"})
        }

        res.status(200).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        });
    }catch(err){
        return res.status(500).json({message: "Login Unsuccessful", error: err.message})
    }
};

exports.getuserInfo = async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select("-password");

        if (!user){
            return res.status(404).json({message: 'User not found'});
        }

        res.status(200).json(user);
    }catch (err) {
        return res.status(500).json({message: "User Info fetch unsuccessful", error: err.message});
    }
};