import React from 'react';
import ReactDom from 'react-dom';

const ComparisonModal = (props) => {
  // need to create table from props
  const { handleModalClick } = props;
  if (!props.show) {
    return null;
  }

  return ReactDom.createPortal(
    <div className="modal">
      <div className="modal-header">
        <h6>COMPARING</h6>
        <button type="button" name="modal-close" onClick={handleModalClick}>X</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>[current product]</th>
            <th></th>
            <th>[compared product]</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>[checkmark(yes/no)]</td>
            <td>[characteristic]</td>
            <td>[checkmark(yes/no)]</td>
          </tr>
        </tbody>
      </table>
    </div>,
    document.getElementById("related-items-container"))
};

export default ComparisonModal;