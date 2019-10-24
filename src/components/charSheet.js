import React from 'react';
import '../index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function CharacterSheet(props) {
   return <div className='col-md-12 pt-0 pl-0 bg-dark'>{props.race}</div>;
}
