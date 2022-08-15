import './App.css';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// mapeia se a autenticação do susuário foi feita com sucesso
import { onAuthStateChanged } from 'firebase/auth';

// kooks
import { useState, useEffect } from 'react';
import { useAuthentication } from './hooks/useAuthentication';

// context
import { AuthProvider } from './context/AuthContext';

//components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import CreatePost from './pages/CreatePost';

import NotFound from './pages/NotFound';


function App() {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();

  const loadingUser = user === undefined;

  // mesmo não vindo o usuário, irá vir algo diferente de "undefined" e sairá do Loding
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  if (loadingUser) {
    return <p>Carregando...</p>
  }

  return (
    <AuthProvider value={{ user }}>
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path='/' element={ <Home /> }/>
            <Route path='/login' element={ !user ? <Login /> : <Navigate to='/'/>}/>
            <Route path='/register' element={ !user ? <Register /> : <Navigate to='/' />}/>
            <Route path='/about' element={ <About /> }/>
            <Route path='/dashboard' element={ user ?  <Dashboard/> : <Navigate to='/login' /> } />
            <Route path='posts/create' element={ user ? <CreatePost/> : <Navigate to='/login'/> } />
            <Route path='*' element={ <NotFound/> } />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
