import EcouteDB from './components/EcouteDB'
import { useState } from 'react'
import './App.css'

function App() {
 
  const {decibel, setDecibel} = useState(0);

  return (
    <>
      <h1>salut</h1>

      <EcouteDB setValue={setDecibel}/>
      <h2>decibel : {decibel}</h2>
      
    </>
  )
}

export default App
