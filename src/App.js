import React, { useEffect, useState } from 'react';
import Drawer from './components/Drawer';
import Header from './components/Header';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Favourites from './pages/Favourites';

function App() {
  const [cartOpened, setCartOpened] = useState(false)
  const [products, setProducts] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [favourites, setFavourites] = useState([])
  const [isLoading, setIsLoading] = useState(true)



  useEffect(() => {
    // fetch('https://62964735810c00c1cb72bff3.mockapi.io/products')
    //   .then(response => response.json())
    //   .then(data => setProducts(data))
    // получаем данные с сервера
    async function fetchData() {
      setIsLoading(true)

      const { data: cartData } = await axios.get('https://62964735810c00c1cb72bff3.mockapi.io/cart')
      const favouritesResponse = await axios.get('https://62964735810c00c1cb72bff3.mockapi.io/favourites')
      const productsResponse = await axios.get('https://62964735810c00c1cb72bff3.mockapi.io/products')

      setIsLoading(false)

      setCartItems(cartData)
      setFavourites(favouritesResponse.data)
      setProducts(productsResponse.data)
    }

    fetchData()
  }, [])

  const onAddToCart = async (item) => {
    //проверяем, чтобы не добавлять больше 1 копии товара в корзину
    try {
      if (cartItems.find((cartObj) => cartObj.title === item.title)) {
        axios.delete(`https://62964735810c00c1cb72bff3.mockapi.io/cart/${item.id}`)
        setCartItems(prevState => prevState.filter(i => i.title !== item.title))
      } else {
        if (!cartItems.some(e => e.title === item.title)) {
          const { data } = await axios.post('https://62964735810c00c1cb72bff3.mockapi.io/cart', item)
          setCartItems((prevState) => [...prevState, data])
        }
      }
    } catch (error) {
      alert('Не удалось добавить в Корзину: ' + error)
    }
  }

  const removeItemFromCart = (item) => {
    try {
      axios.delete(`https://62964735810c00c1cb72bff3.mockapi.io/cart/${item.id}`)
      setCartItems(prevState => prevState.filter(i => i.title !== item.title))
    } catch (error) {
      alert('Не удалось удалить из корзины: ' + error)
    }
  }

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value)
  }

  const onFavourite = async (item) => {
    try {
      if (favourites.find((favObj) => favObj.title === item.title)) {
        axios.delete(`https://62964735810c00c1cb72bff3.mockapi.io/favourites/${item.id}`)
        setFavourites(prevState => prevState.filter(i => i.title !== item.title))
      } else {
        if (!favourites.some(e => e.title === item.title)) {
          const { data } = await axios.post('https://62964735810c00c1cb72bff3.mockapi.io/favourites', item)
          setFavourites((prevState) => [...prevState, data])
        }
      }
    } catch (error) {
      alert('Не удалось добавить в Избранное: ' + error)
    }
  }

  return (
    <div className="App clear">

      {cartOpened &&
        <Drawer
          items={cartItems}
          closeCart={() => setCartOpened(false)}
          removeItem={(obj) => removeItemFromCart(obj)}
        />}

      <Header onClickCart={() => setCartOpened(true)} />

      <Routes>

        <Route
          path="/"
          element={
            <Home
              cartItems={cartItems}
              products={products}
              favourites={favourites}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              onFavourite={onFavourite}
              onAddToCart={onAddToCart}
              isLoading={isLoading}
            />}>
        </Route>
        <Route
          path="/favourites"
          element={
            <Favourites
              favourites={favourites}
              onFavourite={onFavourite}
              onAddToCart={onAddToCart}
            />}>
        </Route>

      </Routes>

    </div>
  );
}

export default App;
