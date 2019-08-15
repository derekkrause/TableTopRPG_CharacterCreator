import React from 'react';
import '../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import RaceSelection from './cards/cards_race.js';

export default function NavScreen(props) {
   switch (props.screen) {
      case 'Race':
         return (
            <div className='container col-md-12 pt-0 pl-0 bg-dark'>
               <div id='screen' className='p-3 col-md-6'>
                  <RaceSelection onClick={race => props.onClick(race)} />
               </div>
            </div>
         );
      default:
         return (
            <div className='container col-md-12 pt-0 pl-0 bg-dark'>
               <div id='screen' className='p-3 col-md-6' />
            </div>
         );
   }
}
