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
import NotificationBell from './component/NotificationBell'
import Footer from './component/Pages/Footer'
import About from './component/Pages/About'
import Contact from './component/Pages/Contact'
import ItemCard from './component/ItemCard'
// import UpdateItempage from './component/Pages/UpdateItempage'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
    <div className="flex flex-col min-h-screen">
      
        <Navbar />

        
        <main className="flex-grow">
      <Routes>
      <Route path='/' element={<Dashboard/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/additem' element={<AddItemPage/>}/>
        <Route path='/item' element={<ItemPage/>}/>
        <Route path='/profile' element={<UserProfile/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/notifications' element={<NotificationBell/>}/>
        {/* <Route path='/updateitem'    element={<UpdateItempage/>}/> */}
        <Route path='/login' element={<Login/>}/>
        <Route path='/about'  element={<About/>}/>
        <Route path='/itemcard'  element={<ItemCard/>}/>
        <Route path='/contact'  element={<Contact/>}/>
              </Routes>
              </main>
<Footer />
</div>

    
    </BrowserRouter>
    </>
  )
}

export default App
