import React from 'react';

var Devtool = (props) => {
  return (
    <div className="devtool">
      <h3>sample products/product IDs for development:</h3>
<<<<<<< HEAD
      <nav>
        <ul className="devtool devtool-product-list">
          {props.productList.map((element) => (
            <li
              key={element.id}
              onClick={()=>{ props.updateProduct(element.id); }}
              className="devtool devtool-product-list-item">
              <div className="devtool-product product-id">{element.id}</div>
              <div className="devtool-product product-name"><small>{element.name}</small></div>
            </li>
          ))}
        </ul>
      </nav>
=======
      <ul>
        {props.productList.map((element) => (
          <li key={element.id} onClick={(event)=>{ props.updateProduct(event, element.id); }}>
            {`${element.id} - ${element.name}`}
          </li>
        ))}
      </ul>
>>>>>>> develop
    </div>
  );
};

export default Devtool;
