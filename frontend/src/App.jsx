import { useAuthState } from 'react-firebase-hooks/auth'
import './App.css'
import { Route, Routes } from 'react-router';
import SignUp from './components/SignUp/SignUp';
import AuthGuard from './components/AuthGuard';
import { auth } from './firebase';
import Home from './routes/Home';
import SignIn from './components/SignIn.jsx/SignIn';
import Onboarding from './routes/Onboarding';
import NavBar from './components/NavBar/NavBar';
import Chat from './routes/Chat';

function App() {
  const [user, loading, error] = useAuthState(auth);

  return (
    <div className="h-screen">
      <NavBar />
      <Routes>
        <Route path="/" element={AuthGuard(user, loading, <Home user={user}/>)} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up/onboarding" element={AuthGuard(user, loading, <Onboarding />)} />
        <Route path="/chat" element={AuthGuard(user, loading, <Chat user={user}/>)} />
      </Routes>
    </div>
  )
}

export default App
