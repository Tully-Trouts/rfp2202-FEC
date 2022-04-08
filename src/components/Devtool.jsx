import React from 'react';

var Devtool = (props) => {
  return (
    <div className="devtool devtool-container">
      <h3>Tully Trout Devtool:</h3>
      <nav>
        <ul className="devtool devtool-product-list">
          {props.productList.map((element) => (
            <li
              key={element.id}
              className="devtool devtool-product-list-item"
              onClick={()=>{
                props.updateProduct(element.id).then((data) => console.log('product:', data));
              }}>
              <div className="devtool-product product-id">{element.id}</div>
              <div className="devtool-product product-name"><small>{element.name}</small></div>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Devtool;
