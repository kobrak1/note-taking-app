import React from 'react'
import { Route, Routes } from 'react-router-dom'

// lazy loaded components
import PrivateRoutes from './utils/PrivateRoutes'
import Login from './components/Login'
import HomePage from './pages/HomePage'
import NoteFormPage from './pages/NoteFormPage'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route element={<PrivateRoutes />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/create-new' element={<NoteFormPage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App