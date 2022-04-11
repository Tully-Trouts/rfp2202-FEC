/* eslint-disable camelcase */
import React, {Component} from 'react';
import moment from 'moment';
import { Link } from '../styledComponents';
import axios from 'axios';


class Answer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleHelpful = this.handleHelpful.bind(this);
    this.handleReport = this.handleReport.bind(this);
  }

  handleReport(e) {
    e.preventDefault();
    const {answer} = this.props;
    axios.put(`api/qa/questions/${answer[0]}/report`)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleHelpful(e) {
    e.preventDefault();
    const {answer} = this.props;
    axios.put(`api/qa/questions/${answer[0]}/helpful`)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const {answer} = this.props;
    const {handleReport, handleHelpful} = this;
    const {answerer_name, date, body, helpfulness, photos} = answer[1];
    const answerId = answer[0];

    const images = photos.map((src) => {
      return (
        <img src={src} key={src} className='A_Images' />
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