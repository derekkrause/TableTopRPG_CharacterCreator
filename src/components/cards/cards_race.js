import React from 'react';
import { Button, Card, CardBody, CardImg, CardText, Row } from 'reactstrap';
import * as data from '../../data/race_data.json';

function RaceButton(props) {
   return (
      <Row className='d-flex'>
         <Button
            outline
            color='dark'
            className='raceButton bg-white'
            onClick={() => props.onClick(props.name)}
            onPointerEnter={() => props.onPointerEnter()}
         >
            <div className='raceButtonName'>{props.name}</div>
         </Button>
      </Row>
   );
}

function RaceCard(props) {
   return (
      <Card>
         <CardImg />
         <CardBody>
            <CardText>{props.description}</CardText>
         </CardBody>
      </Card>
   );
}

export default class RaceSelection extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         raceDescription: ''
      };
   }

   render() {
      return (
         <div className='container d-flex'>
            <div className='col-md-6'>
               {Object.keys(data.Race).map(r => {
                  return (
                     <RaceButton
                        key={data.Race[r].name}
                        name={data.Race[r].name}
                        onClick={race => this.props.onClick(race)}
                        onPointerEnter={() => this.setState({ raceDescription: data.Race[r].descriptionShort })}
                     />
                  );
               })}
            </div>
            <div className='col-md-6'>
               {this.state.raceDescription && <RaceCard description={this.state.raceDescription} />}
            </div>
         </div>
      );
   }
}
