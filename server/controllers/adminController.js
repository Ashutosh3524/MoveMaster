const express = require('express')
const adminUser = require('../models/adminModel.js');


const signin = async(req, res) => {
    const { email, password } = req.body;

    try {
        const user = await adminUser.findOne({email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        else{
            // const isMatch = await bcrypt.compare(password, user.password);
            const isMatch = password === user.password;
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            return res.status(200).json({message:"Login successful"});
        }

    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
}


module.exports = {signin}