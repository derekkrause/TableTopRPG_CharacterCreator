import React from 'react';
import { Navbar, Nav, NavLink } from 'reactstrap';

function Tab(props) {
   return (
      <NavLink href='#' onClick={() => props.click(props.tabName)} active={props.active}>
         {props.tabName}
      </NavLink>
   );
}

export default function NavTabs(props) {
   var tabNames = ['Race', 'Class', 'Theme', 'Skill', 'Spell', 'Gear'];

   return (
      <Navbar color='dark' className='pb-0'>
         <Nav id='nav-tabs' tabs>
            {tabNames.map(tab => {
               return <Tab key={tab} tabName={tab} click={a => props.click(a)} active={props.activeTab === tab} />;
            })}
         </Nav>
      </Navbar>
   );
}
