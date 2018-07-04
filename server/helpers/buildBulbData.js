let colors = ['red','yellow', 'green', 'blue', 'orange']


function getData(num){
    let data = [];
    for(let i = 1; i < num; i++){
        let rando = Math.random() * ((colors.length + 1) - 1);
        data.push({id: i, color: colors[Math.floor(rando)]})
    }
    return data;
}

getData(23);