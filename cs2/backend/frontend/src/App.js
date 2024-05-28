import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Monitor from './components/Monitor'
import About from './components/About'


function App() {

    return( 
        <BrowserRouter>
            <Routes>
                <Route path='/dashboard' element={<Dashboard />}></Route>
                <Route path='/monitor' element={<Monitor />}></Route>
                <Route path='/about' element={<About />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App  
