import React from 'react';
import { Button, Row } from 'reactstrap';
import * as data from '../../data/race_data.json';

function Race_Button(props) {
   return (
      <Button outline color='primary' className='raceButton bg-white'>
         <div className='raceButtonName'>{props.name}</div>
         <div className='raceButtonDesc'>{props.shortDescription}</div>
      </Button>
   );
}

export default function RaceDetailCards() {
   return (
      <div className='col-md-6'>
         {Object.keys(data.Race).map(r => {
            return <Race_Button name={data.Race[r].name} shortDescription={data.Race[r].descriptionShort} />;
         })}
      </div>
   );
}
