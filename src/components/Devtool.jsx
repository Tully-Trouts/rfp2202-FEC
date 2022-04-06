import React from 'react';

var Devtool = (props) => {
  return (
    <div className="devtool">
      <h3>sample products/product IDs for development:</h3>
      <nav>
        <ul className="devtool devtool-product-list">
          {props.productList.map((element) => (
            <li key={element.id} onClick={()=>{ props.updateProduct(element.id); }}>
              <span className="devtool devtool-product">
                {element.id} <br></br>
                <small>{element.name}</small>
              </span>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Devtool;
