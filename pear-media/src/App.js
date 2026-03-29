import React from "react";
import "./App.css";
import TextWorkflow from "./components/TextWorkflow";
import ImageWorkflow from "./components/ImageWorkflow";

function App() {
  return (
    <div className="App">
      <h1>Pear Media Prototype</h1>
      <TextWorkflow />
      <hr/>
      <ImageWorkflow />
    </div>
  );
}

export default App;