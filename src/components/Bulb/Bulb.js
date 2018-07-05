import React from 'react';
import bulb from '../media/off.svg';
import yellow from '../media/yellow.svg';
import blue from '../media/blue.svg';
import red from '../media/red.svg';
import green from '../media/green.svg';
import orange from '../media/orange.svg';

const Bulb = (props) => {
    let color;
    switch(props.color){
        case 'yellow':
            color = yellow;
            break;
        case 'blue':
            color = blue;
            break;
        case 'green':
            color = green;
            break;
        case 'orange':
            color = orange;
            break;
        case 'red':
            color = red;
            break;
        default:
            color = bulb
    }

    console.log(props.bulb, props.key);
    return (
        <div className='bulb'>
            <p className={props.bulb ? 'light' : 'dark'}>{props.letter}</p>
            <img onClick={() => props.lightToggle(props.bulbNumber)} src={props.bulb ? color : bulb}/>
        </div>
    );
};

export default Bulb;