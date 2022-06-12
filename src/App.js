import React, { createContext, useEffect, useState } from 'react';
import Drawer from './components/Drawer/Drawer';
import Header from './components/Header';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Favourites from './pages/Favourites';
import Orders from './pages/Orders';

export const AppContext = createContext({})

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
      try {
        setIsLoading(true)

        const [cartResponse, favouritesResponse, productsResponse] = await Promise.all([
          axios.get('https://62964735810c00c1cb72bff3.mockapi.io/cart'),
          axios.get('https://62964735810c00c1cb72bff3.mockapi.io/favourites'),
          axios.get('https://62964735810c00c1cb72bff3.mockapi.io/products'),
        ])

        // const { data: cartData } = await axios.get('https://62964735810c00c1cb72bff3.mockapi.io/cart')
        // const favouritesResponse = await axios.get('https://62964735810c00c1cb72bff3.mockapi.io/favourites')
        // const productsResponse = await axios.get('https://62964735810c00c1cb72bff3.mockapi.io/products')

        setIsLoading(false)

        setCartItems(cartResponse.data)
        setFavourites(favouritesResponse.data)
        setProducts(productsResponse.data)
      } catch (error) {
        alert('Ошибка при запросе данных')
        console.error(error)
      }
    }

    fetchData()
  }, [])

  const onAddToCart = async (item) => {
    //проверяем, чтобы не добавлять больше 1 копии товара в корзину
    try {
      // const { data: cartData } = await axios.get('https://62964735810c00c1cb72bff3.mockapi.io/cart')
      // setCartItems(cartData)
      //cartItems.find((cartObj) => cartObj.title === item.title)
      const findItem = cartItems.find((cartObj) => cartObj.title === item.title)
      if (findItem) {
        await axios.delete(`https://62964735810c00c1cb72bff3.mockapi.io/cart/${item.id}`)
        setCartItems(prevState => prevState.filter(i => i.title !== item.title))
      } else {
        // if (!cartItems.some(e => e.title === item.title)) { }
        setCartItems((prevState) => [...prevState, item])
        await axios.post('https://62964735810c00c1cb72bff3.mockapi.io/cart', item)
      }

    } catch (error) {
      alert('Не удалось добавить в Корзину: ')
      console.error(error)
    }
  }

  const isItemAddedToCart = (item) => {
    return cartItems.some(i => i.title === item.title)
  }

  const removeItemFromCart = async (item) => {
    try {
      // const { data: cartData } = await axios.get('https://62964735810c00c1cb72bff3.mockapi.io/cart')
      // setCartItems(cartData)
      axios.delete(`https://62964735810c00c1cb72bff3.mockapi.io/cart/${item.id}`)
      // const { data: cartData } = await axios.get('https://62964735810c00c1cb72bff3.mockapi.io/cart')
      // setCartItems(cartData)
      setCartItems(prevState => prevState.filter(i => i.title !== item.title))
    } catch (error) {
      alert('Не удалось удалить из корзины: ')
      console.error(error)
    }
  }

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value)
  }

  const onFavourite = async (item) => {
    try {
      const findItem = favourites.find((favObj) => favObj.title === item.title)
      if (findItem) {
        axios.delete(`https://62964735810c00c1cb72bff3.mockapi.io/favourites/${findItem.id}`)
        setFavourites(prevState => prevState.filter(i => i.title !== item.title))
      } else {
        if (!favourites.some(e => e.title === item.title)) {
          setFavourites((prevState) => [...prevState, item])
          const { data } = await axios.post('https://62964735810c00c1cb72bff3.mockapi.io/favourites', item)
          setFavourites((prevState) => prevState.map(i => {
            if (i.title === data.title) {
              return {
                ...i,
                title: data.title
              }
            }
            return i
          }))
        }
      }
    } catch (error) {
      alert('Не удалось добавить в Избранное: ')
      console.error(error)
    }
  }

  const totalCost = cartItems.reduce((a, b) => +a + +b.price, 0)

  return (
    <AppContext.Provider
      value={{
        products,
        cartItems,
        favourites,
        isItemAddedToCart,
        setCartOpened,
        setCartItems,
        totalCost,
        onFavourite,
        onAddToCart
      }}>
      <div className="App clear">
        <Drawer
          items={cartItems}
          closeCart={() => setCartOpened(false)}
          removeItem={(obj) => removeItemFromCart(obj)}
          opened={cartOpened}
        />

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
                onFavourite={onFavourite}
                onAddToCart={onAddToCart}
              />}>
          </Route>

          <Route
            path="/orders"
            element={
              <Orders

              />}>
          </Route>

        </Routes>

      </div>
    </AppContext.Provider>
  );
}

export default App;
