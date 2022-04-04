import React from 'react';

const ComparisonModal = (props) => {
  // need to create table from props
  if (!props.show) {
    return null;
  }

  return (
    <div className="modal">
      <h6>COMPARING</h6>
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
    </div>
  );
};

export default ComparisonModal;