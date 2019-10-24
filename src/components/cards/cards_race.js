import React from 'react';
import { Button, Card, CardBody, CardImgOverlay, Row, Toast, ToastBody, ToastHeader } from 'reactstrap';
import * as data from '../../data/race_data.json';
import RaceImg from './img_race.js';

function RaceButton(props) {
   return (
      <Row className='d-flex'>
         <Button
            className='raceButton col'
            onClick={() => props.onClick(props.name)}
            onPointerEnter={() => props.onPointerEnter()}
         >
            <span id='buttonName'>{props.name}</span>
         </Button>
      </Row>
   );
}

function RaceCard(props) {
   return (
      <Toast>
         <ToastHeader>{props.name}</ToastHeader>
         <ToastBody>{props.description}</ToastBody>
      </Toast>
   );
}

export default class RaceSelection extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         raceDescription: '',
         raceName: ''
      };
   }

   render() {
      return (
         <div className='container d-flex'>
            <div className='col-md-3'>
               {Object.keys(data.Race).map(r => {
                  return (
                     <RaceButton
                        key={data.Race[r].name}
                        name={data.Race[r].name}
                        onClick={race => this.props.onClick(race)}
                        onPointerEnter={() =>
                           this.setState({
                              raceDescription: data.Race[r].descriptionShort,
                              raceName: data.Race[r].name
                           })
                        }
                     />
                  );
               })}
            </div>
            <div className='col-md-9'>
               {this.state.raceDescription && (
                  <div>
                     <RaceCard name={this.state.raceName} description={this.state.raceDescription} />
                     <Card>
                        <RaceImg
                           name={this.state.raceName}
                           alt={this.state.raceName + ' image'}
                           className='raceImage'
                        />
                     </Card>
                  </div>
               )}
            </div>
         </div>
      );
   }
}
