import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Link } from '../styledComponents';

const modalStyles = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'rgb(230, 230, 230)',
  padding: '50px',
  zIndex: 200
};

export default function AnswerImagesModal ({ open, children, onClose }) {
  if (!open) { return null; }

  return ReactDOM.createPortal (
    <>
      <div style={modalStyles} >
        <Button onClick={onClose}>Cancel</Button>
        {children}
      </div>
    </>,
    document.getElementById('portal')
  );
}