import Login from './pages/Login'
import Register from './pages/Register'
import Main from './pages/Main'
import ProtectedRoute from './components/ProtectedRoute'
import { Routes, Route, Navigate } from 'react-router-dom'

function App() {
  return (
    <div className='w-full h-screen overflow-hidden font-roboto'>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route path='/main' element={<Main />} />
        </Route>

        <Route path='*' element={<Navigate to='/main' />} />
      </Routes>
    </div>
  )
}

export default App
