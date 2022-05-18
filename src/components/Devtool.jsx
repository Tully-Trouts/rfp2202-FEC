/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

function Devtool({ updateProduct }) {
  const [productList, setProductList] = React.useState([]);
  const [page, setPage] = React.useState(1);

  const log = (...msgs) => {
    // eslint-disable-next-line no-console
    console.log('[TULLY-DEV]:', ...msgs);
  };

  // eslint-disable-next-line no-shadow
  const getProducts = (count = 5, page = 1) => {
    log('Getting products list. . .');
    return axios.get('/api/products', { params: { page, count } })
      .then((res) => {
        log('Got products:', res.data);
        return res;
      })
      .catch((err) => {
        log('Issue:', err);
      });
  };

  const renderProduct = (product) => (
    <li
      key={product.id}
      className="devtool devtool-product-list-item"
      onClick={() => {
        updateProduct(product.id).then((data) => log('product:', data));
      }}
    >
      <div className="devtool-product product-id">{product.id}</div>
      <div className="devtool-product product-name"><small>{product.name}</small></div>
    </li>
  );

  const renderProducts = () => productList.map((element) => renderProduct(element));

  const nextPage = () => {
    const next = page + 1;
    log('Get next page request:', next);
    setPage(next);
  };

  React.useEffect(() => {
    log('Devtool rendering. . .');
    getProducts(5, page)
      .then(({ data }) => {
        setProductList(data);
      });
  }, [page]);

  return (
    <div className="devtool devtool-container">
      <h3>shop:</h3>
      <nav>
        <ul className="devtool devtool-product-list">
          {productList.length > 0 ? renderProducts() : 'Loading. . .'}
          <li className="devtool devtool-product-list-item" onClick={() => { nextPage(); }}>
            <small>Next page</small>
          </li>
        </ul>
      </nav>
    </div>
  );
}

Devtool.propTypes = {
  updateProduct: PropTypes.func.isRequired,
};

export default Devtool;
