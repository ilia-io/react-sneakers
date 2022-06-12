import React, { useContext } from 'react';
import { AppContext } from '../App';

const Info = ({ title, discription, image }) => {
  const { setCartOpened } = useContext(AppContext)

  return (

    <div className="cartEmpty d-flex align-center justify-center flex-column flex">
      <img src={image} alt="empty cart" width={120} className="mb-20" />
      <h2>{title}</h2>
      <p className="opacity-6">{discription}</p>
      <button onClick={() => setCartOpened(false)} className="greenButton">
        <img src="figma/arrow.svg" alt="arrow" />
        Вернуться назад
      </button>
    </div>

  );
}

export default Info;