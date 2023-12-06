const User = require('../models/user');
const jwt = require('jsonwebtoken');
const CryptoJS = require('crypto-js');

const register = async(req,res)=>{
    const {name,email,password} = req.body
    const passwordHashed = CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString();
    const user = await User.findOne({email});
    if (user) {
        return res.status(500).json({
            msg:"This email is already registered "
        })
    }
    const newUser = new User({
        name,
        email,
        password:passwordHashed
    });

    try {
        const savedUser = await newUser.save();
        const accessToken = jwt.sign(
            {
            id: savedUser.id,
            isAdmin: savedUser.isAdmin,
            },
            process.env.JWT_SEC,
            { expiresIn: '3d' }
        );
        const cookieOptions = {httpOnly: true,expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),};
        const { password, ...others } = savedUser._doc;
        res.status(201).cookie('token', accessToken, cookieOptions).json({ ...others, accessToken });
    } catch (err) {
        res.status(500).json(err);
    }
}

const login = async(req,res)=>{
    try {
        const user = await User.findOne(
            {
                email: req.body.email,
            }
        );
        //!yanlis mail
        if (!user) {
            return res.status(401).json("Wrong Email");
        }
        //!hashli pass i normale cevirip kontrol ediyoruz
        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        );
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        if (originalPassword !== req.body.password) {
            return res.status(401).json("Wrong Password");
        }
        //!Token olusturma
        const accessToken=jwt.sign({
            id:user.id, isAdmin:user.isAdmin
        },
        process.env.JWT_SEC,
        {expiresIn:"3d"}
        );
        const cookieOptions = {
            httpOnly:true,
            expires: new Date(Date.now()+3 * 24*60*60*1000)
        }
        const {password, ...others} = user._doc;
        res.status(200).cookie("token",accessToken,cookieOptions).json({...others,accessToken});
    }catch (err) {
        res.status(500).json(err);
    }
}
const logout = async(req,res)=>{
    const cookieOptions = {
        httpOnly:true,
        expires: new Date(Date.now())
    }
    res.status(200).cookie("token",null,cookieOptions).json({
        msg:"Cikis islemi basarili"
    })
}

module.exports = {
    register,
    login,
    logout
}