import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Card extends React.Component {
  render() {
    const { title, price, thumbnail, id, item, updateProducts } = this.props;
    return (
      <div data-testid="product">
        <h1>{ title }</h1>
        <img src={ thumbnail } alt="" />
        <p>{ `R$: ${price}` }</p>
        <Link data-testid="product-detail-link" to={ `/${id}` }>Mais detalhes</Link>
        <br />
        <br />
        <button
          type="button"
          onClick={ () => {
            updateProducts(item);
          } }
          data-testid="product-add-to-cart"
        >
          Adicionar ao carrinho
        </button>
        { item.shipping.free_shipping
        && <p data-testid="free-shipping">Frete Grátis</p> }
      </div>
    );
  }
}

Card.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    shipping: PropTypes.shape({
      free_shipping: PropTypes.bool.isRequired,
    }).isRequired,
  }).isRequired,
  updateProducts: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default Card;
