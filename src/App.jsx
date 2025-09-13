import { useState } from 'react'
import './App.css'
import Header from './components/Header'
function App() {

  return (
    <>
    <Header/>
    <div className='ms-auto'>
      <select className="form-select mb-3 my-5" aria-label="select event type">
  <option selected>All Event</option>
  <option value="Workshop">Workshop</option>
  <option value="Seminar">Seminar</option>
  <option value="Conference">Conference</option>
</select>
    </div>
    </>
  )
}

export default App
