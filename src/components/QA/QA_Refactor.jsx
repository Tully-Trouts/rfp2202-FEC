import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Question from './Question';
import QASearch from './QASearch';
import QuestionModal from './QuestionModal';
import { Button, Link } from '../styledComponents';

const QA = ({ product }) => {
  const [questions, setQuestions] = useState([]);
  const [search, setSearch] = useState('');
  const [isQuestionModalOpen, setIsQuestionModal] = useState(false);
  const [toLoad, setToLoad] = useState(4);
  const [loadingMore, setLoadingMore] = useState(false);

  const getQuestions = () => {
    axios.get('/api/qa/questions', {
      params: {
        // eslint-disable-next-line camelcase
        product_id: product.id,
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
    getQuestions();
  }, [product.id]);

  const sortQuestions = () => {
    questions.sort((a, b) => b.question_helpfulness - a.question_helpfulness);
    if (search.length >= 3) {
      return questions.filter((question) => {
        if (question.question_body.toLowerCase().includes(search.toLowerCase())) {
          return true;
        }
        return false;
      });
    }
    return questions;
  };

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
      <QASearch search={search} setSearch={(input) => setSearch(input)} />
      <div className='Q_List'>
        {sortQuestions().slice(0, toLoad).map((question) =>
          <Question getQuestions={getQuestions} question={question} key={question.question_id} product={product} />
        )}
      </div>
      {loadMoreButton}
      <Button className='Add_Question' onClick={() => setIsQuestionModal(true)} size={1}>Add A Question +</Button>
      <QuestionModal getQuestions={getQuestions} product={product} open={isQuestionModalOpen} onClose={() => setIsQuestionModal(false)}>
      </QuestionModal>

    </div>
  );
};

export default QA;