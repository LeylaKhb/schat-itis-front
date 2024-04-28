import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {NewTicket} from "./components/NewTicket";
import AllDialogs from "./components/AllDialogs";
import Dialog from "./components/Dialog";
import {DialogFunc} from "./components/DialogFunc";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
              <Route path="/my_dialogs" element={<AllDialogs />}/>
              <Route path="/new_dialog" element={<NewTicket />}/>
              <Route path="/dialog/:id" element={<DialogFunc />}/>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
