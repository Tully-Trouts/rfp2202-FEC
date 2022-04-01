import React from 'react';

var Devtool = (props) => {
  return (
    <div className="devtool">
      <h3>sample products/product IDs for development:</h3>
      <ul>
        {props.productList.map((element) => (
          <li key={element.id} onClick={()=>{ props.updateProduct(element.id) }}>
            {`${element.id} - ${element.name}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Devtool;
