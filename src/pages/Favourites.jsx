import React from 'react';
import Card from '../components/Card/Card';

function Favourites({ favourites, onFavourite, onAddToCart }) {
  return (
    <div className="content p-40">
      <div className='d-flex align-center justify-between mb-40'>
        <h1>Избранное</h1>
      </div>

      <div className="d-flex flex-wrap">
        {favourites.length > 0 ?
          favourites.map((item) => (
            <Card
              onFavourite={(item) => onFavourite(item)}
              onPlus={(item) => onAddToCart(item)}
              key={item.title}
              favourites={true}
              {...item}
            />
          ))
          : null
        }
      </div>

    </div>
  );
}

export default Favourites;