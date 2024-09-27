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
import Login from './component/Pages/login'
import UserProfile from './component/Pages/Profile'
import ItemPage from './component/ItemPage'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/additem' element={<AddItemPage/>}/>
        <Route path='/item' element={<ItemPage/>}/>
        <Route path='/profile' element={<UserProfile/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
