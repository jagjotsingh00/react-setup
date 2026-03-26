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
// import StudentList from './components/UseEffect1'
import LifeCyclePractice from './components/LifeCycleTask'
import UseRefTutorial from './components/UseRefTutorial'
import UseRefPractice, { FocusManagement, PreviousValue, RefVsState, VideoPlayer } from './components/UseRefPractice'
import { UnControlledInput } from './components/UseRefPractice'
import useFetch from './components/useFetch'
import { FetchHook } from './components/useFetchHook'
import HigherOrderComponentsTutorial from './components/HigherOrderComponentsTutorial'
import NewVariable from './components/Hoc'
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
        {/* <Card /> */}
      </div><br />
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
{/* <StudentList /> */}
<br /><br />
=============================================================================================
<br />
<LifeCyclePractice productId={3}/>
<br />
<br />
=============================================================================================
{/* <UseRefTutorial /> */}
=============================================================================================
<UseRefPractice/>
=============================================================================================
<UnControlledInput />
=============================================================================================
<PreviousValue />
=============================================================================================
<RefVsState />
=============================================================================================
<FocusManagement />
=============================================================================================
<VideoPlayer />
=============================================================================================
<useFetch />
=============================================================================================
<br />
<Count /><br />
=============================================================================================
<br />
< FetchHook /> 
<br />
=============================================================================================
<br />
< HigherOrderComponentsTutorial /> 
<br />
=============================================================================================
<br />
< NewVariable />
</>
  )
}

export default App ;
