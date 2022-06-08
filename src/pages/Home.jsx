import React from 'react';
import Card from '../components/Card/Card';
import MyLoader from '../Loader';

function Home({
  products,
  favourites,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onFavourite,
  onAddToCart,
  cartItems,
  isLoading
}) {
  const renderProducts = () => {
    return (
      (isLoading ? [...Array(12)]
        : products
          .filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase())))
        .map((item, index) => (
          <Card
            onFavourite={(item) => onFavourite(item)}
            onPlus={(item) => onAddToCart(item)}
            key={index}
            //favourites={false}
            addedToCart={cartItems.some(i => i.title === item.title)}
            loading={isLoading}
            {...item}
          />
        ))
    )
  }




  return (
    <div className="content p-40">
      <div className='d-flex align-center justify-between mb-40'>
        <h1>{searchValue ? `Поиск по названию: "${searchValue}"` : 'Все кроссовки'}</h1>
        <div className='search-block d-flex'>
          <img src="/figma/search.svg" alt="search" />
          {searchValue && <img
            className='clear removeBtn cu-p'
            src="figma/btn-remove.svg"
            alt="clear"
            onClick={() => setSearchValue('')}
          />}

          <input
            onChange={onChangeSearchInput}
            type="text"
            placeholder='Поиск...'
            value={searchValue}
          />
        </div>
      </div>

      <div className="d-flex flex-wrap">
        {renderProducts()}
      </div>

    </div>
  );
}

export default Home;