import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage/Homepage';
import Layout from './components/Layout';
import Feed from './pages/Feed/Feed';
import Profile from './pages/Profile/Profile';
import { UserContextProvider } from './utils/UserContext';
import EditProfile from './pages/Profile/EditProfile';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import PasswordModal from './components/PasswordModal/PasswordModal';

function App() {
  return (
    <>
      <BrowserRouter>
        <UserContextProvider>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/" element={<Layout />}>
              <Route path="/feed" element={<Feed />} />
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="/edit/:id" element={<EditProfile />} />
            </Route>
            <Route path="/reset-password" element={<PasswordModal />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
          </Routes>
        </UserContextProvider>
      </BrowserRouter>
    </>
  )
}

export default App;