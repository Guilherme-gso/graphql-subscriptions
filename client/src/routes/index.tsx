import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import { Chat } from '../components/Chat'
import { Login } from '../components/Login'
import { Users } from '../components/Users'

export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </Router>
  )
}