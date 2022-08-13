import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import DogsPage from './components/Dogs/DogsPage';
import Card from './components/Cart/Cart';
import NavBar from './components/NavBar/NavBar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { CartContext } from './context/CartContext';


function App() {
  const [allDogs, setAllDogs] = useState([])
  const [myCart, addToCart] = useState([{}])
  const [total, setTotal] = useState(0)


  useEffect(() => {
    async function getData() {
      const res = await axios.get("/v1/dogs")
      return res
    }

    getData().then((res) => setAllDogs(res.data))
    getData().catch((err) => console.log(err))
  }, [])

  return (
    <CartContext.Provider value={ {myCart, addToCart, total, setTotal} }>
      <Router>
          <NavBar />
          <div className='page-container'>
            <Routes>
              <Route path='/' element={ <Home/> } />  
              <Route path='/dogs' element={ <DogsPage allDogs={ allDogs }/> } />  
              <Route path='/checkout' element={ <Card/> } />  
            </Routes>  
          </div>     
        </Router>
    </CartContext.Provider>
  );
}

export default App;
