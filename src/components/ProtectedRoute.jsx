import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {

    const { user } = useContext(AuthContext);

  return (
    <>{user ? <Outlet /> : <Navigate to='/login' />}</>
  )
}