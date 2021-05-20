const Active = require('../../db/models/active');

class ActiveActions {
    async saveActive(req,res) {
        const key_id = req.body.key_id;
        const user_id = req.body.user_id;
        const data = req.body.data;

        let active;
        
        try{
            active = new Active({ key_id:key_id, user_id:user_id, data:data });
            await active.save();
        }catch (err) {
            return res.status(422).json({message: err.message});
        }
        
        res.status(201).json(active);
    }

    async getActive(req, res){
        const id = req.params.id;
        const active = await Active.findOne({_id: id});
        res.status(200).json(active);
    }

    async getAllActive(req, res){
        const doc = await Active.find({});
        console.log(doc);
        res.status(200).json(doc);
    } 

    async updateActive(req, res){
        const id = req.params.id;
        const key_id = req.body.key_id;
        const user_id = req.body.user_id;
        const data = req.body.data;

        const active = await Active.findOne({_id: id});
        active.key_id = key_id;
        active.user_id = user_id;
        active.data = data;
        await active.save();

       res.status(201).json(active);
    }

    async deleteActive(req, res){
        const id = req.params.id;
        await Active.deleteOne({_id: id});

        res.sendStatus(204);
    }
}

module.exports= new ActiveActions();