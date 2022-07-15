import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/home";
import NotFound from "./pages/notfound/notfound";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/*" element={<NotFound/>} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
