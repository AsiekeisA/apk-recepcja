const available = () => {
    if (active.length <1){
        return keys;
    } else {
        var table = [...keys];
        for (var i=active.length; i>0; i--) {
            const act =active[i-1].key_id;
            const ava = [...table].filter(keys=>(keys.numer+' '+keys.blok)!==act);
            table =ava;
            console.log(table.lenght)
        }
        return table;
    }
    //setAvailable(table)
  }
  //to raczej plik do usunięcia gdyż mam czyDost