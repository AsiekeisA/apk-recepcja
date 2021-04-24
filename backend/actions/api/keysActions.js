const Key = require('../../db/models/key');

class KeysActions {
    async saveKey(req,res) {
        const number = req.body.number;
        const blok = req.body.blok;
        const func = req.body.func;
        const howMuch = req.body.howMuch;

        let key
        
        try{
            key = new Key({ number, blok, func, howMuch });
            await key.save();
        }catch (err) {
            return res.status(422).json({message: err.message});
        }
        
        res.status(201).json(key);
    }

    async getKey(req, res){
        const id = req.params.id;
        const key = await Key.findOne({_id: id});
        res.status(200).json(key);
    }

    async getAllKeys(req, res){
        const doc = await Key.find({});
        console.log(doc);
        res.status(200).json(doc);
    } 

    async editKey(req, res){
        const id = req.params.id;
        const number = req.body.number;
        const blok = req.body.blok;
        const func = req.body.func;
        const howMuch = req.body.howMuch;

        const key = await Key.findOne({_id: id});
        key.number = number;
        key.blok = blok;
        key.func = func;
        key.howMuch = howMuch;
        await key.save();

;        res.status(201).json(key);
    }

    async deleteKey(req, res){
        const id = req.params.id;
        await Key.deleteOne({_id: id});

        res.sendStatus(204);
    }
}

module.exports= new KeysActions();