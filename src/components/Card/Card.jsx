import React, { useContext, useEffect, useState } from 'react';
import styles from './Card.module.scss'
import ContentLoader from "react-content-loader"
import MyLoader from '../../Loader';
import { AppContext } from '../../App';

function Card({
  id,
  title,
  imageURL,
  price,
  onFavourite,
  onPlus,
  favourites = false,
  addedToCart = false,
  loading = false,
  parentId
}) {

  const { isItemAddedToCart, cartItems } = useContext(AppContext)

  //const [togglePlusIcon, setTogglePlusIcon] = useState(addedToCart)
  const [toggleHeartIcon, setToggleHeartIcon] = useState(favourites)

  const obj = { id: cartItems.length, title, imageURL, price, parentId: id }


  const onClickPlus = () => {
    onPlus(obj)
    //setTogglePlusIcon(!togglePlusIcon)
  }

  const onClickFavourite = () => {
    onFavourite(obj)
    setToggleHeartIcon(!toggleHeartIcon)
  }

  return (

    <div className={styles.card}>
      {loading ? <MyLoader />
        : <>
          {onFavourite && <div
            onClick={onClickFavourite}
            className={styles.favourite}>
            <img
              width={22}
              src={toggleHeartIcon ? "figma/heart-liked.svg" : "figma/heart-unliked.svg"} alt="heart unliked" />
          </div>}

          <img width={133} height={112} src={imageURL} alt="sneakers" />
          <h5>{title}</h5>
          <div className='d-flex justify-between align-center'>
            <div className='d-flex flex-column '>
              <span>Цена:</span>
              <b>{price} руб.</b>
            </div>
            {onPlus && <img
              className={styles.plus}
              onClick={onClickPlus}
              src={isItemAddedToCart({ title, id, parentId }) ? "figma/btn-cheked.svg" : "figma/btn-plus.svg"} alt="plus icon"
            />}
          </div>
        </>
      }
    </div>
  );
}

export default Card;
