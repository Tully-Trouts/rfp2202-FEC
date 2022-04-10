import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Link } from '../styledComponents';

const modalStyles = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#FFF',
  padding: '50px',
  zIndex: 100
};

const overlayStyles = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .7)',
  zIndex: 100
};

export default function Modal ({ open, children, onClose }) {
  if (!open) { return null; }

  return ReactDOM.createPortal (
    <>
      <div style={overlayStyles} />
      <div style={modalStyles} >
        <Button onClick={onClose}>Close</Button>
        {children}
      </div>
    </>,
    document.getElementById('portal')
  );
}