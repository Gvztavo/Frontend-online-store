import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductsFromCategoryAndQuery } from '../services/api';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      title: '',
      price: 0,
      thumbnail: '',
      email: 'Email',
      text: 'Mensagem(opcional)',
      num: '',
      product: {},
    };
  }

  componentDidMount() {
    const { clearSearch } = this.props;
    clearSearch();
    this.findProduct();
  }

  findProduct = () => {
    const { match: { params: { id } } } = this.props;
    const { category, search } = this.props;
    getProductsFromCategoryAndQuery(category, search)
      .then((list) => list.results.find((item) => item.id === id))
      .then((product) => {
        this.setState({
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail,
          loaded: true,
          product,
        });
      });
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleClick = () => {
  }

  render() {
    const { updateProducts } = this.props;
    const { title, price, thumbnail, loaded, email, text, num, product } = this.state;
    const success = (
      <div>
        <h1 data-testid="product-detail-name">{ title }</h1>
        <h2>{ price }</h2>
        <img src={ thumbnail } alt={ title } />
        <button
          type="button"
          onClick={ () => {
            updateProducts(product);
          } }
          data-testid="product-detail-add-to-cart"
        >
          Adicionar ao carrinho
        </button>
      </div>
    );
    return (
      <div>
        {loaded ? success : <h1>Carregando..</h1> }

        <form>
          <fieldset>
            <legend>Avaliações</legend>
            <input
              type="email"
              name="email"
              value={ email }
              onChange={ this.handleInputChange }
            />
            <select name="num" value={ num } onChange={ this.handleInputChange }>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <br />
            <textarea
              name="text"
              value={ text }
              data-testid="product-detail-evaluation"
              onChange={ this.handleInputChange }
            />
            <br />
            <button type="button">Avaliar</button>
          </fieldset>
        </form>
        <Link
          to="/cart"
          data-testid="shopping-cart-button"
        >
          Carrinho
        </Link>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  onClickButton: PropTypes.func.isRequired,
  clearSearch: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  category: PropTypes.string.isRequired,
  search: PropTypes.string.isRequired,
}.isRequired;

export default ProductDetails;
