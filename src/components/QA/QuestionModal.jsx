import React from 'react';
import ReactDOM from 'react-dom';

export default function Modal ({ open, children, onClose }) {
  if (!open) { return null; }

  return ReactDOM.createPortal (
    <>
      <div className='QA_Overlay_Styles' />
      <div className='QA_Modal_Styles' >
        <button onClick={onClose}>Close</button>
        {children}
      </div>
    </>,
    document.getElementById('portal')
  );
}