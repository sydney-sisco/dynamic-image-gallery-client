import { useState, useEffect } from "react";
import logo from './logo.svg';
import './App.css';

import useSocket from "./hooks/useSocket";

function App() {

  const { messages } = useSocket(); // Creates a websocket and manages messaging

  const [images, setImages] = useState([]);

  const generateHTML = (oldImage, newImage) => {
    const newImageHTML = `<img class="fade-in-image top" src="http://localhost:4000/${newImage}" />`;
    const oldImageHTML = `<img class="bottom" src="http://localhost:4000/${oldImage}" />`;
    return `${newImageHTML} ${oldImageHTML}`;
  };

  useEffect(() => {
    console.log("messages", messages);
    if (messages.length > 1) {
      const oldImage = messages[messages.length - 2];
      const newImage = messages[messages.length - 1];
      const html = generateHTML(oldImage, newImage);
      setImages(html);
    }

    if (messages.length === 1) {
      const html = `<img src="http://localhost:4000/${messages[0]}" />`;
      setImages(html);
    }

    if (messages.length === 0) {
      setImages([]);
    }

  }, [messages]);

  return (
    <div className="App">
      <header>
        <h1>Live AI Image Gallery</h1>
      </header>
      {/* <img src={`http://localhost:4000/${messages[messages.length-1]}`} /> */}
      <div dangerouslySetInnerHTML={{ __html: images }} />
    </div>
  );
}

export default App;
