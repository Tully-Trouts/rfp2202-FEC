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

  const getQuestions = (id) => {
    axios.get('/api/qa/questions', {
      params: {
        // eslint-disable-next-line camelcase
        product_id: id,
        page: 1,
        count: 10000
      }
    })
      .then((response) => {
        setQuestions(response.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getQuestions(product.id);
  }, [product.id]);


  const handleLoadMoreQuestions = (e) => {
    e.preventDefault();
    if (e.target.value === 'loadMore') {
      setToLoad(toLoad + 2);
      setLoadingMore(true);
    } else {
      setToLoad(4);
      setLoadingMore(false);
    }
  };

  let loadMoreButton;
  if (questions.length > toLoad) {
    loadMoreButton = <Button className={'More_Qs'} size={1} value='loadMore' onClick={handleLoadMoreQuestions}>Load More Questions</Button>;
  } else if (questions.length > 4 && questions.length <= toLoad) {
    loadMoreButton = <Button className='More_Qs' size={1} value='collapse' onClick={handleLoadMoreQuestions}>Collapse</Button>;
  } else {
    loadMoreButton = <></>;
  }

  return (
    <div id='QA'>
      <h3 id='QA_Title'>Questions and Answers</h3>
      {loadMoreButton}
    </div>
  );
};

export default QA;