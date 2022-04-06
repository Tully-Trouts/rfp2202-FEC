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

    // this doesn't work. Need to refactor
    const tableBody = uniqueFeatures.map((feature, index) => {

      let currValue = '';
      let compValue = '';

      if (currFeatures[index] !== undefined) {
        if (currFeatures[index].feature === feature) {
          currValue = currFeatures[index].value;
        }
      }

      if (compFeatures[index] !== undefined) {
        if (compFeatures[index].feature === feature) {
          compValue = compFeatures[index].value;

        }
      }

      console.log('currValue in map:::', currValue);
      console.log('compValue in map:::', compValue);

      return (
        <tr>
          <td>{currValue}</td>
          <td>{feature}</td>
          <td>{compValue}</td>
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