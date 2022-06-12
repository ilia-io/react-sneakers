import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../App';

function Header(props) {

  const { totalCost } = useContext(AppContext)

  return (
    <header className='d-flex justify-between align-center p-40'>
      <Link to='/'>
        <div className='d-flex align-center'>
          <img width='40' height='40' src='/figma/logo.png' alt='logo' />
          <div>
            <h3 className='text-uppercase'>React Sneakers</h3>
            <p className='opacity-5'>Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>
      <ul className='d-flex'>
        <li onClick={props.onClickCart} className='mr-30 cu-p'>
          <img width={18} src="figma/cart.svg" alt="cart" />
          <span>{totalCost} руб.</span>
        </li>
        <li className='mr-20 cu-p'>
          <Link to='/favourites'>
            <img width={18} src="figma/heart-unliked.svg" alt="bookmarks" />
          </Link>
        </li>
        <li className='cu-p'>
          <Link to='/orders'>
            <img width={18} src="figma/profile.svg" alt="profile" />
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;