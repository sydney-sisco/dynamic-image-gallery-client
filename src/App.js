import { useEffect } from "react";
import logo from './logo.svg';
import './App.css';

import useSocket from "./hooks/useSocket";

function App() {

  const { messages } = useSocket(); // Creates a websocket and manages messaging

  useEffect(() => {
    console.log("messages", messages);
  }, [messages]);

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
      <img src={`http://localhost:4000/${messages[messages.length-1]}`} />
    </div>
  );
}

export default App;
