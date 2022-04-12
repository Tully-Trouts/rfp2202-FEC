import React from 'react';
import axios from 'axios';

var Devtool = (props) => {

  const [productList, setProductList] = React.useState([]);
  const [page, setPage] = React.useState(1);

  const log = (...msgs) => {
    console.log('[TULLY-DEV]:', ...msgs);
  };

  var getProducts = (count = 5, page = 1) => {
    log('Getting products list. . .');
    return axios.get('/api/products', { params: {page, count} })
      .then((res) => {
        log('Got products:', res.data);
        return res;
      })
      .catch((err) => {
        log('Issue:', err);
      });
  };

  var renderProduct = (product) => {
    return (
      <li
        key={product.id}
        className="devtool devtool-product-list-item"
        onClick={()=>{
          props.updateProduct(product.id).then((data) => log('product:', data));
        }}>
        <div className="devtool-product product-id">{product.id}</div>
        <div className="devtool-product product-name"><small>{product.name}</small></div>
      </li>
    );
  };

  var renderProducts = () => {
    return productList.map((element) => renderProduct(element));
  };

  var nextPage = () => {
    var next = page + 1;
    getProducts(5, next)
      .then(({data}) => {
        setProductList(data);
        setPage(next);
      });
  };

  React.useEffect(() => {
    log('Devtool rendering. . .');
    if (page === 1) {
      getProducts()
        .then(({data}) => {
          setProductList(data);
        });
    }
  }, [page]);

  return (
    <div className="devtool devtool-container">
      <h3>Tully Trout Devtool:</h3>
      <nav>
        <ul className="devtool devtool-product-list">
          {productList.length > 0 ? renderProducts() : 'Loading. . .'}
          <li className="devtool devtool-product-list-item" onClick={()=>{ nextPage(); }}>
            <small>Next page</small>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Devtool;
