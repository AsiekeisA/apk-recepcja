const User = require('../../db/models/user');

class UsersActions {
    async saveUser(req,res) {
        const firstName = req.body.firstName;
        const lastName= req.body.lastName;
        const email = req.body.email;
        const phone = req.body.phone;
        const position = req.body.position;
        const nrIndeks = req.body.nrIndeks;

        let user;
        
        try{
            user = new User({ firstName: firstName, lastName: lastName, email: email, phone: phone, position: position, nrIndeks: nrIndeks});
            await user.save();
        }catch (err) {
            return res.status(422).json({message: err.message});
        }
        
        res.status(201).json(user);
    }

    async getUser(req, res){
        const id = req.params.id;
        const user = await User.findOne({_id: id});
        res.status(200).json(user);
    }

    async getAllUsers(req, res){
        const doc = await User.find({});
        console.log(doc);
        res.status(200).json(doc);
    } 

    async updateUser(req, res){
        const id = req.params.id;
        const firstName = req.body.firstName;
        const lastName= req.body.lastName;
        const email = req.body.email;
        const phone = req.body.phone;
        const position = req.body.position;
        const nrIndeks = req.body.nrIndeks;

        const user = await User.findOne({_id: id});
        user.firstName = firstName;
        user.lastName= lastName;
        user.email = email;
        user.phone = phone;
        user.position = position;
        user.nrIndeks = nrIndeks;
        await user.save();

;        res.status(201).json(user);
    }

    async deleteUser(req, res){
        const id = req.params.id;
        await User.deleteOne({_id: id});

        res.sendStatus(204);
    }
}

module.exports= new UsersActions();