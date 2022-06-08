import React, { useEffect, useState } from 'react';
import styles from './Card.module.scss'
import ContentLoader from "react-content-loader"
import MyLoader from '../../Loader';

function Card({
  id,
  title,
  imageURL,
  price,
  onFavourite,
  onPlus,
  favourites = false,
  addedToCart = false,
  loading = false
}) {

  const [togglePlusIcon, setTogglePlusIcon] = useState(addedToCart)

  const [toggleHeartIcon, setToggleHeartIcon] = useState(favourites)

  const onClickPlus = () => {
    onPlus({ id, title, imageURL, price })
    setTogglePlusIcon(!togglePlusIcon)
  }

  const onClickFavourite = () => {
    onFavourite({ id, title, imageURL, price })
    setToggleHeartIcon(!toggleHeartIcon)
  }

  return (
    <div className={styles.card}>
      {loading ? <MyLoader />
        : <>
          <div onClick={onClickFavourite} className={styles.favourite}>
            <img width={22} src={toggleHeartIcon ? "figma/heart-liked.svg" : "figma/heart-unliked.svg"} alt="heart unliked" />
          </div>
          <img width={133} height={112} src={imageURL} alt="sneakers" />
          <h5>{title}</h5>
          <div className='d-flex justify-between align-center'>
            <div className='d-flex flex-column '>
              <span>Цена:</span>
              <b>{price} руб.</b>
            </div>
            <img
              className={styles.plus}
              onClick={onClickPlus}
              src={togglePlusIcon ? "figma/btn-cheked.svg" : "figma/btn-plus.svg"} alt="plus icon" />
          </div>
        </>
      }
    </div>
  );
}

export default Card;
