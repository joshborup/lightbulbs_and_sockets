let colors = ['red','yellow', 'green', 'blue', 'orange']


function getData(num){
    let letters = ('abcdefghijklmnopqrstuvwxyz').toUpperCase()
    let data = [];
    for(let i = 0; i < num; i++){
        let rando = Math.random() * ((colors.length + 1) - 1);
        data.push({id: i, color: colors[Math.floor(rando)], letter: letters[i]})
    }
    return data;
}

getData(26);