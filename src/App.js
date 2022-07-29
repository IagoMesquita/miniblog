import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// pages
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <div class="container">
        <Routes>
          <Route path='/' element={ <Home /> }/>
          <Route path='/about' element={ <About /> }/>
          <Route path='*' element={ <NotFound/> } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
