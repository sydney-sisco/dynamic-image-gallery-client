import { useState, useEffect } from "react";
import logo from './logo.svg';
import './App.css';

import useSocket from "./hooks/useSocket";

const serverURL = process.env.REACT_APP_WEBSOCKET_URL;

function App() {

  const { messages } = useSocket();
  const [images, setImages] = useState([]);

  const generateHTML = (oldImage, newImage) => {
    const newImageHTML = <img key={newImage} className="fade-in-image top" src={`${serverURL}/${newImage}`} />;
    const oldImageHTML = <img key={oldImage} className="bottom" src={`${serverURL}/${oldImage}`} />;
    return [newImageHTML, oldImageHTML];
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
      const html = <img src={`${serverURL}/${messages[0]}`} />;
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
      {images}
      {/* put initial placeholder here */}
    </div>
  );
}

export default App;
