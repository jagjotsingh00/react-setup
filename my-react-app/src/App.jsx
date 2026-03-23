import './App.css'
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header'
import Card from './components/card'
import Footer from './components/Footer'
import Greeting from './components/Greeting'
import Count from './components/Counter'
import Input from './components/Input'
import Toggle from './components/Toggle'
import ToggleButton from './components/ToggleButton'
import AddUser from './components/AddUser'
import ProductList from './components/Product'
import TodoList from './components/TodoList'
import SubTasks from './components/SubTasks';
import Navbar from './components/Navbar'
import StudentList from './components/UseEffect1'
function App() {

  return (
    <>
       <Navbar />
      <br />
 ============================================================================================= 
       <Header /> 
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
      <Input />
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
<br /> 

<br />
=============================================================================================
      <Footer />
=============================================================================================
<StudentList />
</>
  )
}

export default App ;
