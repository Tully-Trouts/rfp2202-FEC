/* eslint-disable camelcase */
import React from 'react';
import axios from 'axios';

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
      recommended: null,
      size: 0,
      width: 0,
      comfort: 0,
      quality: 0,
      length: 0,
      fit: 0,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.submitReview = this.submitReview.bind(this);
    this.handleSummaryChange = this.handleSummaryChange.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.handleNicknameChange = this.handleNicknameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleImgChange = this.handleImgChange.bind(this);
    this.handleStarChange = this.handleStarChange.bind(this);
    this.handleRecommendedChange = this.handleRecommendedChange.bind(this);
    this.handleSizeChange = this.handleSizeChange.bind(this);
    this.handleWidthChange = this.handleWidthChange.bind(this);
    this.handleComfortChange = this.handleComfortChange.bind(this);
    this.handleQualityChange = this.handleQualityChange.bind(this);
    this.handleLengthChange = this.handleLengthChange.bind(this);
    this.handleFitChange = this.handleFitChange.bind(this);
  }

  toggleModal() {
    if (this.state.setModal === false) {
      this.setState({setModal: true});
    } else {
      this.setState({setModal: false, summary: '', body: '', nickname: '', email: '', img: []});
    }
  }

  submitReview() {
    axios.post('api/reviews', {
      product_id: this.props.productId,
      rating: this.state.star,
      summary: this.state.summary,
      body: this.state.body,
      recommend: this.state.recommended,
      name: this.state.nickname,
      email: this.state.email,
      photos: this.state.img,
      characteristics: {
        size: this.state.size,
        width: this.state.width,
        comfort: this.state.comfort,
        quality: this.state.quality,
        length: this.state.length,
        fit: this.state.fit,
      },
    })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
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

  handleRecommendedChange(event) {
    this.setState({recommended: event.target.value});
  }

  handleSizeChange(event) {
    this.setState({size: event.target.value});
  }

  handleWidthChange(event) {
    this.setState({width: event.target.value});

  }

  handleComfortChange(event) {
    this.setState({comfort: event.target.value});
  }

  handleQualityChange(event) {
    this.setState({quality: event.target.value});
  }

  handleLengthChange(event) {
    this.setState({length: event.target.value});
  }

  handleFitChange(event) {
    this.setState({fit: event.target.value});
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

    if (this.props.submitCharOption === 1) {
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
                <div className="recommended-select"> Do you recommend this product?
                  <label for="recommend-option"></label>
                  <input type="radio"
                    name="recommendation"
                    value='true'
                    onChange={this.handleRecommendedChange}/> Yes
                  <label for="recommend-option" >
                  </label>
                  <input type="radio"
                    name="recommendation"
                    value="false"
                    onChange={this.handleRecommendedChange}/> No
                </div>
                <div className="char-option-comfort"> Comfort
                  <label class="char-comfort"></label>
                  <input type="radio"
                    name="Comfort"
                    value="1"
                    onChange={this.handleComfortChange} />
                  <input type="radio"
                    name="Comfort"
                    value="2"
                    onChange={this.handleComfortChange} />
                  <input type="radio"
                    name="Comfort"
                    value="3"
                    onChange={this.handleComfortChange} />
                  <input type="radio"
                    name="Comfort"
                    value="4"
                    onChange={this.handleComfortChange} />
                  <input type="radio"
                    name="Comfort"
                    value="5"
                    onChange={this.handleComfortChange} />
                </div>
                <div className="char-option-quality"> Quality
                  <label class="char-quality"></label>
                  <input type="radio"
                    name="Quality"
                    value="1"
                    onChange={this.handleQualityChange} />
                  <input type="radio"
                    name="Quality"
                    value="2"
                    onChange={this.handleQualityChange} />
                  <input type="radio"
                    name="Quality"
                    value="3"
                    onChange={this.handleQualityChange} />
                  <input type="radio"
                    name="Quality"
                    value="4"
                    onChange={this.handleQualityChange} />
                  <input type="radio"
                    name="Quality"
                    value="5"
                    onChange={this.handleQualityChange} />
                </div>
                <div className="char-option-length"> Length
                  <label class="char-length"></label>
                  <input type="radio"
                    name="Length"
                    value="1"
                    onChange={this.handleLengthChange} />
                  <input type="radio"
                    name="Length"
                    value="2"
                    onChange={this.handleLengthChange} />
                  <input type="radio"
                    name="Length"
                    value="3"
                    onChange={this.handleLengthChange} />
                  <input type="radio"
                    name="Length"
                    value="4"
                    onChange={this.handleLengthChange} />
                  <input type="radio"
                    name="Length"
                    value="5"
                    onChange={this.handleLengthChange} />
                </div>
                <div className="char-option-fit"> Fit
                  <label class="char-fit"></label>
                  <input type="radio"
                    name="Fit"
                    value="1"
                    onChange={this.handleFitChange} />
                  <input type="radio"
                    name="Fit"
                    value="2"
                    onChange={this.handleFitChange} />
                  <input type="radio"
                    name="Fit"
                    value="3"
                    onChange={this.handleFitChange} />
                  <input type="radio"
                    name="Fit"
                    value="4"
                    onChange={this.handleFitChange} />
                  <input type="radio"
                    name="Fit"
                    value="5"
                    onChange={this.handleFitChange} />
                </div>
                <input className="review-summary"
                  type="text"
                  placeholder="Example: Best purchase ever!"
                  value={this.state.summary}
                  onChange={this.handleSummaryChange} />
                <br></br>
                <textarea className="review-body"
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
    } else if (this.props.submitCharOption === 2) {
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
                <div className="recommended-select"> Do you recommend this product?
                  <label for="recommend-option"></label>
                  <input type="radio"
                    name="recommendation"
                    value="true"
                    onChange={this.handleRecommendedChange}/> Yes
                  <label for="recommend-option" >
                  </label>
                  <input type="radio"
                    name="recommendation"
                    value="false"
                    onChange={this.handleRecommendedChange}/> No
                </div>
                <div className="char-option-size"> Size
                  <label class="char-size"></label>
                  <input type="radio"
                    name="Size"
                    value="1"
                    onChange={this.handleSizeChange} />
                  <input type="radio"
                    name="Size"
                    value="2"
                    onChange={this.handleSizeChange} />
                  <input type="radio"
                    name="Size"
                    value="3"
                    onChange={this.handleSizeChange} />
                  <input type="radio"
                    name="Size"
                    value="4"
                    onChange={this.handleSizeChange} />
                  <input type="radio"
                    name="Size"
                    value="5"
                    onChange={this.handleSizeChange} />
                </div>
                <div className="char-option-width"> Width
                  <label class="char-width"></label>
                  <input type="radio"
                    name="Width"
                    value="1"
                    onChange={this.handleWidthChange} />
                  <input type="radio"
                    name="Width"
                    value="2"
                    onChange={this.handleWidthChange} />
                  <input type="radio"
                    name="Width"
                    value="3"
                    onChange={this.handleWidthChange} />
                  <input type="radio"
                    name="Width"
                    value="4"
                    onChange={this.handleWidthChange} />
                  <input type="radio"
                    name="Width"
                    value="5"
                    onChange={this.handleWidthChange} />
                </div>
                <div className="char-option-comfort"> Comfort
                  <label class="char-comfort"></label>
                  <input type="radio"
                    name="Comfort"
                    value="1"
                    onChange={this.handleComfortChange} />
                  <input type="radio"
                    name="Comfort"
                    value="2"
                    onChange={this.handleComfortChange} />
                  <input type="radio"
                    name="Comfort"
                    value="3"
                    onChange={this.handleComfortChange} />
                  <input type="radio"
                    name="Comfort"
                    value="4"
                    onChange={this.handleComfortChange} />
                  <input type="radio"
                    name="Comfort"
                    value="5"
                    onChange={this.handleComfortChange} />
                </div>
                <div className="char-option-quality"> Quality
                  <label class="char-quality"></label>
                  <input type="radio"
                    name="Quality"
                    value="1"
                    onChange={this.handleQualityChange} />
                  <input type="radio"
                    name="Quality"
                    value="2"
                    onChange={this.handleQualityChange} />
                  <input type="radio"
                    name="Quality"
                    value="3"
                    onChange={this.handleQualityChange} />
                  <input type="radio"
                    name="Quality"
                    value="4"
                    onChange={this.handleQualityChange} />
                  <input type="radio"
                    name="Quality"
                    value="5"
                    onChange={this.handleQualityChange} />
                </div>
                <input className="review-summary"
                  type="text"
                  placeholder="Example: Best purchase ever!"
                  value={this.state.summary}
                  onChange={this.handleSummaryChange} />
                <br></br>
                <textarea className="review-body"
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
    } else {
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
                <div className="recommended-select"> Do you recommend this product?
                  <label for="recommend-option"></label>
                  <input type="radio"
                    name="recommendation"
                    value="true"
                    onChange={this.handleRecommendedChange}/> Yes
                  <label for="recommend-option" >
                  </label>
                  <input type="radio"
                    name="recommendation"
                    value="false"
                    onChange={this.handleRecommendedChange}/> No
                </div>
                <div className="char-option-size"> Size
                  <label class="char-size"></label>
                  <input type="radio"
                    name="Size"
                    value="1"
                    onChange={this.handleSizeChange} />
                  <input type="radio"
                    name="Size"
                    value="2"
                    onChange={this.handleSizeChange} />
                  <input type="radio"
                    name="Size"
                    value="3"
                    onChange={this.handleSizeChange} />
                  <input type="radio"
                    name="Size"
                    value="4"
                    onChange={this.handleSizeChange} />
                  <input type="radio"
                    name="Size"
                    value="5"
                    onChange={this.handleSizeChange} />
                </div>
                <div className="char-option-width"> Width
                  <label class="char-width"></label>
                  <input type="radio"
                    name="Width"
                    value="1"
                    onChange={this.handleWidthChange} />
                  <input type="radio"
                    name="Width"
                    value="2"
                    onChange={this.handleWidthChange} />
                  <input type="radio"
                    name="Width"
                    value="3"
                    onChange={this.handleWidthChange} />
                  <input type="radio"
                    name="Width"
                    value="4"
                    onChange={this.handleWidthChange} />
                  <input type="radio"
                    name="Width"
                    value="5"
                    onChange={this.handleWidthChange} />
                </div>
                <div className="char-option-comfort"> Comfort
                  <label class="char-comfort"></label>
                  <input type="radio"
                    name="Comfort"
                    value="1"
                    onChange={this.handleComfortChange} />
                  <input type="radio"
                    name="Comfort"
                    value="2"
                    onChange={this.handleComfortChange} />
                  <input type="radio"
                    name="Comfort"
                    value="3"
                    onChange={this.handleComfortChange} />
                  <input type="radio"
                    name="Comfort"
                    value="4"
                    onChange={this.handleComfortChange} />
                  <input type="radio"
                    name="Comfort"
                    value="5"
                    onChange={this.handleComfortChange} />
                </div>
                <div className="char-option-quality"> Quality
                  <label class="char-quality"></label>
                  <input type="radio"
                    name="Quality"
                    value="1"
                    onChange={this.handleQualityChange} />
                  <input type="radio"
                    name="Quality"
                    value="2"
                    onChange={this.handleQualityChange} />
                  <input type="radio"
                    name="Quality"
                    value="3"
                    onChange={this.handleQualityChange} />
                  <input type="radio"
                    name="Quality"
                    value="4"
                    onChange={this.handleQualityChange} />
                  <input type="radio"
                    name="Quality"
                    value="5"
                    onChange={this.handleQualityChange} />
                </div>
                <div className="char-option-length"> Length
                  <label class="char-length"></label>
                  <input type="radio"
                    name="Length"
                    value="1"
                    onChange={this.handleLengthChange} />
                  <input type="radio"
                    name="Length"
                    value="2"
                    onChange={this.handleLengthChange} />
                  <input type="radio"
                    name="Length"
                    value="3"
                    onChange={this.handleLengthChange} />
                  <input type="radio"
                    name="Length"
                    value="4"
                    onChange={this.handleLengthChange} />
                  <input type="radio"
                    name="Length"
                    value="5"
                    onChange={this.handleLengthChange} />
                </div>
                <div className="char-option-fit"> Fit
                  <label class="char-fit"></label>
                  <input type="radio"
                    name="Fit"
                    value="1"
                    onChange={this.handleFitChange} />
                  <input type="radio"
                    name="Fit"
                    value="2"
                    onChange={this.handleFitChange} />
                  <input type="radio"
                    name="Fit"
                    value="3"
                    onChange={this.handleFitChange} />
                  <input type="radio"
                    name="Fit"
                    value="4"
                    onChange={this.handleFitChange} />
                  <input type="radio"
                    name="Fit"
                    value="5"
                    onChange={this.handleFitChange} />
                </div>
                <input className="review-summary"
                  type="text"
                  placeholder="Example: Best purchase ever!"
                  value={this.state.summary}
                  onChange={this.handleSummaryChange} />
                <br></br>
                <textarea className="review-body"
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
}

export default AddReview;