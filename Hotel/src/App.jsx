import React from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import  "/node_modules/bootstrap/dist/js/bootstrap.min.js"

import AddRoom from './componets/room/AddRoom'
import ExistingRoom from './componets/room/ExistingRoom'
import { Home } from './componets/home/Home'
import { EditRoom } from './componets/room/EditRoom'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
function App() {

  return (
    <>
    <main>
      <Router>
        <Routes>
          <Route path="/" element={ <Home/> }></Route>
          <Route path="/edit-room/:roomId" element={<EditRoom/>}></Route>
          <Route path="/existing-rooms" element={<ExistingRoom/>}></Route>

        </Routes>
      </Router>
      {/* <AddRoom></AddRoom> */}
    </main>
      {/* 
      <ExistingRoom></ExistingRoom> */}
    </>
  )
}

export default App
