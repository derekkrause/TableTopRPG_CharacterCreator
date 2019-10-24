import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavTabs from './components/navtabs';
import NavScreen from './components/navscreens';
import CharacterSheet from './components/charSheet';

class Creator extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         activeTab: 'Race',
         selectedRace: '',
         selectedClass: '',
         selectedTheme: ''
      };
   }

   navTab = tab => {
      this.setState({ activeTab: tab });
   };

   setRace = race => {
      this.setState({ selectedRace: race });
      console.log(race);
   };

   render() {
      return (
         <div>
            <h1>Character Creator</h1>
            <div className='m-auto d-block' id='selectionModule'>
               <NavTabs click={tab => this.navTab(tab)} activeTab={this.state.activeTab} />
               <NavScreen screen={this.state.activeTab} onClick={race => this.setRace(race)} />
            </div>
            <div className='col-md-6' id='resultsModule'>
               <CharacterSheet race={this.state.selectedRace} />
            </div>
         </div>
      );
   }
}

// ========================================

ReactDOM.render(<Creator />, document.getElementById('root'));
