import axios from 'axios';
import React, { useContext, useState } from 'react';
import { AppContext } from '../../App';
import { useCart } from '../../hooks/useCart';
import Info from '../Info';
import styles from './Drawer.module.scss'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function Drawer({ closeCart, items = [], removeItem, opened }) {


  //const { cartItems, setCartItems, totalPrice } = useCart()
  //кастомный хук

  const onRemoveCartItem = (currentItem) => {
    removeItem(currentItem)
  }
  //тут можно было передать объект целиком, и уже потом вытащить нужное

  const { setCartItems, cartItems, totalCost } = useContext(AppContext)

  const [isOrderComplete, setIsOrderComplete] = useState(false)
  const [orderId, setOrderId] = useState(null)
  const [isLoading, setIsLoading] = useState(false)


  const onClickOrder = async () => {
    try {
      setIsLoading(true)
      const { data } = await axios.post('https://62964735810c00c1cb72bff3.mockapi.io/orders', { items: cartItems })
      setOrderId(data.id)
      setIsOrderComplete(true)
      setCartItems([])
      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete('https://62964735810c00c1cb72bff3.mockapi.io/cart' + item.id)
        await delay(2000)
      }

    } catch (error) {
      alert("Ошибка при создании :-( " + error)
    }
    setIsLoading(false)
  }

  return (
    <div
      className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
      <div className={styles.drawer}>
        <h2 className='mb-30 d-flex justify-between'>
          Корзина
          <img onClick={closeCart}
            className='removeBtn cu-p'
            src="figma/btn-remove.svg"
            alt="close" />
        </h2>

        {items.length > 0 ? (
          <div className='d-flex flex-column flex'>
            <div className="items flex">
              {items.map((obj) => (
                <div key={obj.id} className="cartItem d-flex align-center mb-20">
                  {/* <img className='mr-20' width={70} height={70} src="figma/1.jpg" alt="sneakers" /> */}

                  <div style={{ backgroundImage: `url(${obj.imageURL})` }} className="cartItemImg">
                  </div>
                  <div className='mr-20 flex'>
                    <p className='mb-5'>{obj.title}</p>
                    <b>{obj.price} руб.</b>
                  </div>
                  <img onClick={() => onRemoveCartItem(obj)} className='removeBtn' src="figma/btn-remove.svg" alt="close" />
                </div>
              ))}
            </div>

            <div className="cartTotalBlock">
              <ul className='cartTotalBlock'>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>{totalCost} руб.</b>
                </li>
                <li>
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>{Math.ceil(totalCost * 0.05)} руб. </b>
                </li>
              </ul>
              <button disabled={isLoading} onClick={onClickOrder} className='greenButton'>Оформить заказ <img src="figma/arrow.svg" alt="arrow" /></button>
            </div>

          </div>
        )
          :
          <Info
            title={isOrderComplete ? 'Заказ оформлен!' : 'Корзина пустая'}
            discription={isOrderComplete ? `Ваш заказ №${orderId} скоро будет передан в доставку` : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'}
            image={isOrderComplete ? "figma/order_placed.jpg" : "figma/empty_cart.jpg"} />
        }

      </div>
    </div>
  );
}

export default Drawer;