import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage/Homepage';
import Layout from './components/Layout';
import Feed from './pages/Feed/Feed';
import Profile from './pages/Profile/Profile';
import { UserContextProvider } from './utils/UserContext';
import EditProfile from './pages/Profile/EditProfile';

function App() {
  return (
    <>
      <BrowserRouter>
        <UserContextProvider>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/" element={<Layout />}>
              <Route path="/feed" element={<Feed />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/edit-profile" element={<EditProfile />} />
            </Route>
          </Routes>
        </UserContextProvider>
      </BrowserRouter>
    </>
  )
}

export default App;