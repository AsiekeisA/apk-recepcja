const Key = require('../../db/models/key');

class KeysActions {
    async saveKey(req,res) {
        const numer = req.body.numer;
        const blok = req.body.blok;
        const funkcja = req.body.funkcja;
        const ile = req.body.ile;

        let key;
        
        try{
            key = new Key({ numer: numer, blok: blok, funkcja:funkcja, ile:ile });
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

    async updateKey(req, res){
        const id = req.params.id;
        const numer = req.body.numer;
        const blok = req.body.blok;
        const funkcja = req.body.funkcja;
        const ile = req.body.ile;

        const key = await Key.findOne({_id: id});
        key.numer = numer;
        key.blok = blok;
        key.funkcja= funkcja;
        key.ile = ile;
        await key.save();

       res.status(201).json(key);
    }

    async deleteKey(req, res){
        const id = req.params.id;
        await Key.deleteOne({_id: id});

        res.sendStatus(204);
    }
}

module.exports= new KeysActions();