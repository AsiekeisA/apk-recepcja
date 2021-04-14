const Key = require('../../db/models/key');

class KeysActions {
    saveKey(req,res) {
        //const key = new Key({ numer: 306, blok:'B', funkcja:'room', ile:3})
       // key.save().then(() => {
       //     console.log('Nowy klucz');
      //  });
        const numer = req.body.numer;
        const blok = req.body.blok;
        const funkcja = req.body.funkcja;
        const ile = req.body.ile;
    res.send('zapisano - ' +funkcja+" "+numer+blok+" ilosc - "+ile );
    }

    getKey(req, res){

        res.send('get');
    }

    getAllKeys(req, res){

        res.send('getAll');
    }

    editKey(req, res){

        res.send('edit');
    }

    deleteKey(req, res){
        const id = req.params.id
        res.send('delete. ID:'+id);
    }
}

module.exports= new KeysActions();