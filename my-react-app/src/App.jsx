import './App.css'
import Header from './components/Header'
import Card from './components/card'
import Navbar from './components/navbar'
import Footer from './components/Footer'
import Greeting from './components/Greeting'
import Count from './components/Counter'
import Input from './components/Input'
import { useState } from 'react'
import Toggle from './components/Toggle'
import ToggleButton from './components/ToggleButton'
import AddUser from './components/AddUser'

function App() {

  return (
    <>
      <Navbar />
      <br />
{/* ============================================================================================= */}
      {/* <Header /> */}
      <br />
=============================================================================================
      <div className='cards'>
        <Card />
        <Card />
        <Card />
      </div>
=============================================================================================
      <br />
      <Count />
      <br />
=============================================================================================
      {/* <Input /> */}
      <br />
      <br />
      <Toggle /> 
      <br />
=============================================================================================
      <br />
      <br />
      <ToggleButton />
      <br />
=============================================================================================
      <br />
      <AddUser />
=============================================================================================
      <Footer />
    </>
  )
}

export default App
