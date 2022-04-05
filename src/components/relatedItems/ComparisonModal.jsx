import React from 'react';
import ReactDom from 'react-dom';

const ComparisonModal = (props) => {
  // need to create table from props
  const { handleModalClick } = props;
  if (!props.show) {
    return null;
  }

  const { currProduct, compProduct } = props;

  let buildModalTable = (current, compare) => {

    const currFeatures = current.features;
    const compFeatures = compare.features;
    console.log('currFeatures:::', currFeatures);
    console.log('compFeatures:::', compFeatures);

    const uniqueFeatures = [...new Set(currFeatures.concat(compFeatures).map(item => item.feature))];

    console.log('uniqueFeatures:::', uniqueFeatures);

    // const currJustFeatures = currFeatures.map(item => item.);
    // const compJustFeatures = compFeatures.map(item => item.value);

    // const currJustValues = currFeatures.map(item => item.value);
    // const currJustValues = currFeatures.map(item => item.value);

    const tableBody = uniqueFeatures.map((feature, index) => {
      console.log('currFeatures.feature', currFeatures.feature);

      return (
        <tr>
          <td>{currFeatures[index].feature === feature ? currFeatures[index].value : ''}</td>
          <td>{feature}</td>
          <td>{compFeatures[index].feature === feature ? compFeatures[index].value : ''}</td>
        </tr>
      )
    });
    return tableBody;
  }

  const modalTable = buildModalTable(currProduct, compProduct);

  return ReactDom.createPortal(
    <div className="modal">
      <div className="modal-header">
        <h6>COMPARING</h6>
        <button type="button" name="modal-close" onClick={handleModalClick}>X</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>{currProduct.name}</th>
            <th></th>
            <th>{compProduct.name}</th>
          </tr>
        </thead>
        <tbody>
          {modalTable}
        </tbody>
      </table>
    </div>,
    document.getElementById("related-items-container"))
};

export default ComparisonModal;