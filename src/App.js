import "./App.css";
import { useState } from "react";

const axios = require("axios");

function App() {
  const [text, setText] = useState("");

  const [imgSrc, setImgSrc] = useState("");

  const generateQrHandler = async () => {
    try {
      const response = await axios.get(
        `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${text}`
      );
      console.log(response);
      if (response) {
        setImgSrc(response.config.url);
      }
    } catch (error) {
      setText("");

      setImgSrc("");
    }
  };

  const clear = () => {
    setText("");

    setImgSrc("");
  };

  return (
    <div className="app">
      {/* for input */}
      <div className="app_form">
        {/* title , input and button   */}
        <h1>QR Code Generator</h1>
        <input
          type="text"
          placeholder="Enter text or link to generate code"
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
        <button
          id={imgSrc ? "btn-red" : ""}
          onClick={imgSrc ? clear : generateQrHandler}
        >
          {imgSrc ? "Clear" : "Generate QR Code"}
        </button>
      </div>
      {imgSrc && (
        <div className="app_qr-code">
          {/* qr code div code is shown here */}
          <img src={imgSrc ? imgSrc : ""} alt="qr code" />
        </div>
      )}
    </div>
  );
}

export default App;
