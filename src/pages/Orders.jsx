import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../App';
import Card from '../components/Card/Card';



function Orders(props) {
  const [orders, setOrders] = useState([])
  const { onAddToCart, onFavourite } = useContext(AppContext)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {

    (async () => {
      try {
        setIsLoading(true)
        const { data } = await axios.get('https://62964735810c00c1cb72bff3.mockapi.io/orders')
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []))
        setIsLoading(false)
      } catch (error) {
        alert('Ошибка при запросе заказов')
        console.error(error)
      }
      //console.log(data.map((obj) => obj.items).flat())
      //console.log(data.reduce((prev, obj) => [...prev, ...obj.items], []))
    })()

  }, [])







  return (
    <div className="content p-40">
      <div className='d-flex align-center justify-between mb-40'>
        <h1>Мои заказы</h1>
      </div>

      <div className="d-flex flex-wrap">
        {
          (isLoading ? Array(12).fill({}) : orders)
            .map((item, index) => (
              <Card
                key={index}
                loading={isLoading}
                {...item}
              />
            ))
        }
      </div>

    </div>
  );
}

export default Orders;