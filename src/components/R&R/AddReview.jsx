import React from 'react';

class AddReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setModal: false,
      summary: '',
      body: '',
      nickname: '',
      email: '',
      img: [],
      star: 0,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.submitReview = this.submitReview.bind(this);
    this.handleSummaryChange = this.handleSummaryChange.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.handleNicknameChange = this.handleNicknameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleImgChange = this.handleImgChange.bind(this);
    this.handleStarChange = this.handleStarChange.bind(this);
  }

  toggleModal() {
    if (this.state.setModal === false) {
      this.setState({setModal: true});
    } else {
      this.setState({setModal: false, summary: '', body: '', nickname: '', email: '', img: []});
    }
  }

  submitReview() {
    this.setState({setModal: false, summary: '', body: '', nickname: '', email: '', img: []});
  }

  handleSummaryChange(event) {
    this.setState({summary: event.target.value});

  }
  handleBodyChange(event) {
    this.setState({body: event.target.value});
  }
  handleNicknameChange(event) {
    this.setState({nickname: event.target.value});
  }
  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }
  handleImgChange(event) {
    if (this.state.img.length < 5) {
      this.setState({img: [...this.state.img, ...event.target.files]});
    } else {
      console.log('Max photos uploaded');
    }
  }
  handleStarChange(event) {
    this.setState({star: event.target.value});
  }


  render() {

    if (this.state.setModal) {
      document.body.classList.add('active-modal');
    } else {
      document.body.classList.remove('active-modal');
    }

    return (
      <div>
        <button
          onClick={this.toggleModal}
          className="btn-AddReview">
          Add Review
        </button>
        {this.state.setModal && (
          <div className="modalRR">
            <div className="overlayRR"></div>
            <div className="modal-content">
              <h2>Write your review: {this.props.productName}</h2>
              <div className="star-rating">
                <input
                  type="radio"
                  name="stars"
                  id="star-a"
                  value="5"
                  onChange={this.handleStarChange} />
                <label for="star-a"></label>
                <input
                  type="radio"
                  name="stars"
                  id="star-b"
                  value="4"
                  onChange={this.handleStarChange} />
                <label for="star-b"></label>
                <input
                  type="radio"
                  name="stars"
                  id="star-c"
                  value="3"
                  onChange={this.handleStarChange} />
                <label for="star-c"></label>
                <input
                  type="radio"
                  name="stars"
                  id="star-d"
                  value="2"
                  onChange={this.handleStarChange} />
                <label for="star-d"></label>
                <input type="radio"
                  name="stars"
                  id="star-e"
                  value="1"
                  onChange={this.handleStarChange} />
                <label for="star-e"></label>
              </div>
              <input className="review-summary"
                type="text"
                placeholder="Example: Best purchase ever!"
                value={this.state.summary}
                onChange={this.handleSummaryChange} />
              <br></br>
              <input className="review-body"
                type="text"
                placeholder="Why did you like the product or not?"
                value={this.state.body}
                onChange={this.handleBodyChange} />
              <br></br>
              <input className="Nickname"
                type="text"
                placeholder="Example: jackson11!"
                value={this.state.nickname}
                onChange={this.handleNicknameChange} />
              <br></br>
              <input className="email"
                type="text"
                placeholder="Example: jackson11@email.com"
                value={this.state.email}
                onChange={this.handleEmailChange} />
              <br></br>
              <input className="img"
                type="file"
                multiple
                name="myImage"
                onChange={this.handleImgChange} />
              <button
                className='close-modal'
                onClick={this.toggleModal}>
                  Close
              </button>
              <button
                className='submit-review'
                onClick={this.submitReview}>
                  Submit
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default AddReview;