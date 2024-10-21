import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import Auth from './components/Auth';
import ContactList from './components/ContactList';
import AddContact from './components/AddContact';

/*function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/

function App() {
    const [token, setToken] = useState(null);

    return (
        <div className="App">
            {!token ? (
                <Auth setToken={setToken} />
            ) : (
                <>
                    <ContactList token={token} />
                    <AddContact token={token} />
                    
                </>
            )}
        </div>
    );
}

export default App;

