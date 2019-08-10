import React from 'react';
import '../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row } from 'reactstrap';
import RaceDetailCards from './cards/cards_race.js';

export default function NavScreen(props) {
   return (
      <div className='container col-m-8 pt-0 pl-0 bg-dark'>
         <Container id='screen'>
            <Row>
               <div>{props.screen}</div>
            </Row>
            <RaceDetailCards />
         </Container>
      </div>
   );
}
