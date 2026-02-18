const User = require('../model/user.model');

exports.addUser = async (req, res) => {
    try {
        let user = await User.create(req.body);
        return res.json({message: 'User Created', user});
    } catch (error) {
        console.log(error);
        return res.json({message: 'Server error'})
    }
}