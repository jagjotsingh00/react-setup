
import './App.css'
import Header from './components/Header'
import Card from './components/card'
import Navbar from './components/navbar'
import Footer from './components/Footer'
import Greeting from './components/Greeting'

function App() {

  return (
    <>
    <Navbar />
    {/* <br /> */}
    <Header />
    <br />
   <div className='cards'>
        <Card />
        <Card />
        <Card />
    </div>
    <br />
    <Footer />
    </>
  )
}

export default App
