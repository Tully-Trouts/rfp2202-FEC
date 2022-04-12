import React from 'react';
import ReactDom from 'react-dom';

const ComparisonModal = (props) => {
  const { handleModalClick } = props;
  if (!props.show) {
    return null;
  }

  const { currProduct, compProduct } = props;

  let buildModalTable = (current, compare) => {

    const currFeatures = current.features;
    const compFeatures = compare.features;

    const uniqueFeatures = [...new Set(currFeatures.concat(compFeatures).map(item => item.feature))];

    // probably need to refactor this to find a more efficient solution
    const tableBody = uniqueFeatures.map((feature, index) => {
      let currValue = currFeatures.find(item => item.feature === feature);
      let compValue = compFeatures.find(item => item.feature === feature);

      return (
        <tr key={index}>
          <td>{!!currValue ? currValue.value : ''}</td>
          <td className="modal-characteristic">{feature}</td>
          <td>{!!compValue ? compValue.value : ''}</td>
        </tr>
      );
    });
    return tableBody;
  };

  const modalTable = buildModalTable(currProduct, compProduct);

  return ReactDom.createPortal(
    <div className="comparison-modal absolute">
      <div className="header between">
        <h6>COMPARING</h6>
        <button className="sm card-button close-remove" type="button" onClick={handleModalClick}>X</button>
      </div>
      <table className="comparison-table">
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
    document.getElementById('related-items-container'));
};

export default ComparisonModal;