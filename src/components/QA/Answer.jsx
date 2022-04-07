/* eslint-disable camelcase */
import React, {Component} from 'react';
import moment from 'moment';

class Answer extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const {answer} = this.props;
    const {answerer_name, date, body, helpfulness, photos} = answer;
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
          <span className='A_Helpful'> Helpful? </span>
          <button className='A_Helpful_Button'>yes </button>
          {` (${helpfulness})`}
          <button className='A_Report'>Report</button>
        </div>
      </div>
    );
  }
}

export default Answer;