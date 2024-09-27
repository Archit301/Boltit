import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter,Route,Router,Routes } from 'react-router-dom'
import './App.css'
import Navbar from './component/Navbar'
import Dashboard from './component/Pages/Dashboard'
import AddItemPage from './component/Pages/AddItemPage'
import ItemDetailPage from './component/Pages/ItemDetailPage'
import Signup from './component/Pages/Signup'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/add-item' element={<AddItemPage/>}/>
        <Route path='/item' element={<ItemDetailPage/>}/>
        <Route path='/signup' element={<Signup/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
