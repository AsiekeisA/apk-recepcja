const Archives = require('../../db/models/archives');

class ArchivesActions {
    async saveArchives(req,res) {
        const key_id = req.body.key_id;
        const user_id = req.body.user_id;
        const data = req.body.data;
        const dataQuit = req.body.dataQuit;

        let archives;
        
        try{
            archives = new Archives({ key_id:key_id, user_id:user_id, data:data, dataQuit:dataQuit});
            await archives.save();
        }catch (err) {
            return res.status(422).json({message: err.message});
        }
        
        res.status(201).json(archives);
    }

    async getArchives(req, res){
        const id = req.params.id;
        const archives = await Archives.findOne({_id: id});
        res.status(200).json(archives);
    }

    async getAllArchives(req, res){
        const doc = await Archives.find({});
        console.log(doc);
        res.status(200).json(doc);
    } 

    async deleteArchives(req, res){
        const id = req.params.id;
        await Archives.deleteOne({_id: id});

        res.sendStatus(204);
    }
}

module.exports= new ArchivesActions();