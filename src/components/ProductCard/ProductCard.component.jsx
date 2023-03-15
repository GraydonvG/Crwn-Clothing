import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import Button from '../Button/Button.component';

import './ProductCard.styles.scss';

function ProductCard({ product }) {
  const { name, price, imageUrl } = product;
  const { handleCartItems } = useContext(CartContext);

  function addItemToCartHandler() {
    handleCartItems(product);
  }

  return (
    <div className="product-card-container">
      <img
        src={imageUrl}
        alt={`${name}`}
      />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">${price}</span>
      </div>
      <Button
        type="button"
        buttonType="inverted"
        onClick={addItemToCartHandler}>
        Add to cart
      </Button>
    </div>
  );
}

export default ProductCard;
