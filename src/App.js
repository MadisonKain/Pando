import React, { Component } from 'react';
import './App.css';
import './reset.css';


//========= Components ==========//

import Nav from './Components/Nav/Nav';
import routes from './routes';

//===============================//


class App extends Component {
  render() {
    return (
      <div>
        <Nav />
        <div>
          {routes}
        </div>
      </div>
    );
  }
}

export default App;
