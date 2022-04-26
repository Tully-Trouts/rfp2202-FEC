/* eslint-disable camelcase */
import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Button, Link } from '../styledComponents';

const modalStyles = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#FFF',
  padding: '50px',
  zIndex: 100000
};

const overlayStyles = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .7)',
  zIndex: 100000
};

export default function QuestionModal ({ open, onClose, product, getQuestions }) {
  if (!open) { return null; }
  const [newQuestionBody, setNewQuestionBody] = useState('');
  const [newQuestionNickname, setNewQuestionNickName] = useState('');
  const [newQuestionEmail, setNewQuestionEmail] = useState('');
  const handleNewQuestionSubmit = (e) => {
    e.preventDefault();
    axios.post('api/qa/questions', {
      body: newQuestionBody,
      name: newQuestionNickname,
      email: newQuestionEmail,
      product_id: product.id
    })
      .then((response) => {
        getQuestions();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return ReactDOM.createPortal (
    <>
      <div style={overlayStyles} />
      <div style={modalStyles} className='Add_QA_Form'>
        <Button size={1} onClick={onClose}>Close</Button>
        <form>
          <h3 className='New_QA_Form_Header'>Ask Your Question Here</h3>
          <h4 className='New_QA_Form_Sub_Header'>about the {product.name}</h4>
          <div>
            <label>Enter Question: </label>
            <div>
              <textarea className={newQuestionBody.length <= 0 ? 'New_QA_Input_Error' : ''} placeholder='Your Question' maxLength={1000} onChange={(e) => setNewQuestionBody(e.target.value)} rows='10' cols='100' />
            </div>
          </div>

          <div className='Flex_New_QA_Submit'>
            <div className='Flex_Nickname_Email'>
              <div>
                <label>Enter Nickname: </label>
                <div>
                  <textarea className={newQuestionNickname.length <= 0 ? 'New_QA_Nickname_Input_Error' : ''} placeholder='Example: jack543!' maxLength={60} onChange={(e) => setNewQuestionNickName(e.target.value)} rows='1' cols='60' />
                </div>
              </div>

              <span>
                <label>Enter Email: </label>
                <div>
                  <textarea className={newQuestionEmail.length <= 0 ? 'New_QA_Email_Input_Error' : ''} placeholder='Example: jack@email.com' maxLength={60} onChange={(e) => setNewQuestionEmail(e.target.value)} rows='1' cols='60' />
                </div>
              </span>
            </div>

            <div>
              <Button size={1} onClick={handleNewQuestionSubmit}>Submit Your Question</Button>
            </div>
          </div>
        </form>
      </div>
    </>,
    document.getElementById('portal')
  );
}
