import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavTabs from './components/navtabs';
import NavScreen from './components/navscreens';

class Creator extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         activeTab: 'Race'
      };
   }

   navTab = tab => {
      this.setState({ activeTab: tab });
   };

   render() {
      return (
         <div>
            <h1>Character Creator</h1>
            <div className='container m-auto col-m-8' id='module'>
               <NavTabs click={tab => this.navTab(tab)} activeTab={this.state.activeTab} />
               <NavScreen screen={this.state.activeTab}>Other</NavScreen>
            </div>
         </div>
      );
   }
}

// ========================================

ReactDOM.render(<Creator />, document.getElementById('root'));
