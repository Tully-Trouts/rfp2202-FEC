import React, {Component} from 'react';

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
        <img src={src} className='A_img' height='100' width='100'/>
      );
    });

    return (
      <div className='Answer'>
        <span className='A'>A: </span>
        <>{images}</>
        <div className='Answer_details'>
          {`by ${answerer_name}, ${date}`}
          <span className='A_helpful'> Helpful? </span>
          <button className='A_helpful_button'>yes </button>
          {` (${helpfulness})`}
          <button className='A_report'>Report</button>
        </div>
      </div>
    );
  }
}

export default Answer;