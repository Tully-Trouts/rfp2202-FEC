import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Question from './Question';
import QASearch from './QASearch';
import QuestionModal from './QuestionModal';
import { Button, Link } from '../styledComponents';

const QA = ({ product }) => {
  const [questions, setQuestions] = useState([]);
  const [newQuestionBody, setNewQuestionBody] = useState('');
  const [newQuestionNickname, setNewQuestionNickName] = useState('');
  const [newQuestionEmail, setNewQuestionEmail] = useState('');
  const [isQuestionModalOpen, setIsQuestionModal] = useState(false);
  const [toLoad, setToLoad] = useState(4);
  const [loadingMore, setLoadingMore] = useState(false);

  const getQuestions = (productId) => {
    axios.get('/api/qa/questions', {
      params: {
        // eslint-disable-next-line camelcase
        product_id: productId,
        page: 1,
        count: 10000
      }
    })
      .then((response) => {
        setQuestions(response.data.results);
        console.log('QUESTIONS STATE SHEEEEEEEEEEEEEEEE -- ', questions);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getQuestions(product.productId);
    console.log(questions);
  });


  return (
    <div id='QA'>
      <h3 id='QA_Title'>Questions and Answers</h3>

    </div>
  );
};

export default QA;