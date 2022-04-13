/* eslint-disable camelcase */
import React, {Component} from 'react';
import moment from 'moment';
import { Link } from '../styledComponents';
import axios from 'axios';


class Answer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: this.props.answer
    };
    this.handleHelpful = this.handleHelpful.bind(this);
    this.handleReport = this.handleReport.bind(this);
  }

  handleReport(e) {
    e.preventDefault();
    const {answer, getAllAnswers, questionId} = this.props;
    axios.put(`api/qa/answers/${answer.answer_id}/report`)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
    getAllAnswers(questionId);
  }

  handleHelpful(e) {
    e.preventDefault();
    const {getAllAnswers, questionId, answer} = this.props;
    const {answer_id} = answer;
    console.log('ANSWER WE WANT TO MARK AS HELPFUL -- ', answer_id);
    axios.put(`api/qa/answers/${answer_id}/helpful`)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
    getAllAnswers(questionId);
  }

  render() {
    const {answer} = this.props;
    const {handleReport, handleHelpful} = this;
    const {answerer_name, date, body, helpfulness, photos} = answer;

    console.log(answer);

    const images = photos.map((photo) => {
      return (
        <img src={photo.url} key={photo.id} className='A_Images' />
      );
    });

    return (
      <div className='Answer'>
        <span className='A'>A: </span>
        <span>{body}</span>

        <div>
          <>{images}</>
        </div>

        <div className='A_Details'>
          {`by ${answerer_name}, ${moment(date).format('MMMM, DD, YYYY')}`}

          <span className='A_Helpful'>
            Helpful?{' '}
            <Link onClick={handleHelpful}>Yes</Link>
            {`(${helpfulness}) | `}
            <Link onClick={handleReport}>Report</Link>
          </span>
        </div>
      </div>
    );
  }
}

export default Answer;