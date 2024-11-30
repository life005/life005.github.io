import { AnimatePresence } from 'framer-motion'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App.jsx'
import BasicSettings from './components/BasicSettings.jsx'
import EditorPage from './components/EditorPage/EditorPage.jsx'
import './index.css'
import FullPage from './Layouts/FullPage.jsx'
import RootLayout from './Layouts/RootLayout.jsx'
import About from './pages/About.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Settings from './pages/Settings.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AnimatePresence>
      <BrowserRouter>
        <Toaster position='top-center' reverseOrder={false} />
        <Routes>
          <Route path='/' element={<RootLayout />}>
            <Route path='/:date' element={<App />}>
              <Route path='/:date' element={<Home />}></Route>
            </Route>
            <Route path='/about' element={<About />}></Route>
            <Route path='/editor/:date' element={<EditorPage />}></Route>
            <Route path='/settings' element={<Settings />}>
              <Route path='/settings/' element={<BasicSettings />}></Route>
            </Route>
          </Route>
          <Route path='/login' element={<FullPage />}>
            <Route path='/login/' element={<Login />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AnimatePresence>
  </React.StrictMode>
)
