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
import useFetch from './components/UseFetch'
import { FetchHook } from './components/useFetchHook'
import HigherOrderComponentsTutorial from './components/HigherOrderComponentsTutorial'
import NewVariable, { Example2_WithLoading, Example3_WithLogger, Example4_WithToggle } from './components/Hoc'
import Example1_basicsHOC from './components/Hoc'
import { Example1_ChildrenProp, Example2_CompoundComponents, Example3_RenderProps } from './components/Component-Composition'
import { Example11_childrenprop, Example22_CompoundComponents, Example33_RenderProps } from './components/ComponentComposition'

function App() {
< Example1_basicsHOC />

  return (
    <>
       {/* <Navbar />
      <br />
 ============================================================================================= 
       <Header /> 
      <br />
=============================================================================================
      <div className='cards'>
        <Card />
        <Card />
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
<br /><br />
=============================================================================================
<br />
<LifeCyclePractice productId={3}/>
<br />
<br />
=============================================================================================
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
<br /> */}
{/* ============================================================================================= */}
<br />
{/* < HigherOrderComponentsTutorial />  */}
{/* <br />
=============================================================================================
<br />
< NewVariable />  */}
<br /><br />
< Example1_basicsHOC />
=============================================================================================

<br />
<Example2_WithLoading />
=============================================================================================

<br />
<Example3_WithLogger />
=============================================================================================

<br />
<br />
< Example4_WithToggle />
=============================================================================================
<br />
<Example1_ChildrenProp />
<br /><br />
< Example2_CompoundComponents />
=============================================================================================
<br /> /
< Example3_RenderProps />
<br /><br />
=============================================================================================
<br />
< Example11_childrenprop />
<br />
=============================================================================================
<br />
<Example22_CompoundComponents />
<br />
<Example33_RenderProps />
</>
  )
}

export default App ;
