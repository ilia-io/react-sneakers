import React from 'react';

function Drawer({ closeCart, items = [], removeItem }) {

  //const onRemoveCartItem = (currentItem) => {
  //  removeItem(currentItem.id)
  //} 
  
  //тут можно было передать объект целиком, и уже потом вытащить нужное

  return (
    <div className="overlay">
      <div className="drawer">
        <h2 className='mb-30 d-flex justify-between'>
          Корзина
          <img onClick={closeCart}
            className='removeBtn cu-p'
            src="figma/btn-remove.svg"
            alt="close" />
        </h2>

        {items.length > 0 ? (
          <div className='drawerWrapper'>

            <div className="items">
              {items.map((obj) => (
                <div key={obj.id} className="cartItem d-flex align-center mb-20">
                  {/* <img className='mr-20' width={70} height={70} src="figma/1.jpg" alt="sneakers" /> */}

                  <div style={{ backgroundImage: `url(${obj.imageURL})` }} className="cartItemImg">
                  </div>
                  <div className='mr-20 flex'>
                    <p className='mb-5'>{obj.title}</p>
                    <b>{obj.price} руб.</b>
                  </div>
                  <img onClick={() => removeItem(obj)} className='removeBtn' src="figma/btn-remove.svg" alt="close" />
                </div>
              ))}
            </div>

            <div className="cartTotalBlock">
              <ul className='cartTotalBlock'>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>21 398 руб. </b>
                </li>
                <li>
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>1074 руб. </b>
                </li>
              </ul>
              <button className='greenButton'>Оформить заказ <img src="figma/arrow.svg" alt="arrow" /></button>
            </div>

          </div>
        )
          :
          (
            <div className="cartEmpty d-flex align-center justify-center flex-column flex">
              <img src="figma/empty_cart.svg" alt="empty cart" width={120} height={120} className="mb-20" />
              <h2>Корзина пустая</h2>
              <p className="opacity-6">Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</p>
              <button onClick={closeCart} className="greenButton">
                <img src="figma/arrow.svg" alt="arrow" />
                Вернуться назад
              </button>
            </div>
          )


        }

      </div>
    </div>
  );
}

export default Drawer;