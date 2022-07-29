import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

//components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// pages
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div class="container">
        <Routes>
          <Route path='/' element={ <Home /> }/>
          <Route path='/about' element={ <About /> }/>
          <Route path='*' element={ <NotFound/> } />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
