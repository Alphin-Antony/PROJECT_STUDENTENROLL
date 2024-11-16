import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './assets/Components/Navbar'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import CourseList from './assets/Components/CourseList'
import Student from './assets/Components/Student'
import Enrollment from './assets/Components/Enrollment'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      

  
<BrowserRouter>
<Routes>

<Route path="/" index element={<Navbar />} />
<Route path="/CourseList" element={<CourseList/>} />
<Route path="/Student" element={<Student/>} />
<Route path="/Enrollment" element={<Enrollment/>} />

</Routes>


</BrowserRouter>

    </>
  )
}

export default App
