/* eslint-disable camelcase */
import React from 'react';
import axios from 'axios';
import { Button } from '../styledComponents';

class AddReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      char: {},
      submitChar: {},
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
      minBodyChar: 50,
      minCharNeeded: 50,
      comfortDescrib: '',
      widthDescrib: '',
      sizeDescrib: '',
      qualityDescrib: '',
      lengthDescrib: '',
      fitDescrib: '',
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
    this.retrieveMetaList = this.retrieveMetaList.bind(this);
    this.setDefaultChar = this.setDefaultChar.bind(this);
  }

  toggleModal() {
    if (this.state.setModal === false) {
      this.setState({setModal: true});
      this.retrieveMetaList(this.props.productId);
    } else {
      this.setState({setModal: false, summary: '', body: '', nickname: '', email: '', img: []});
    }
  }

  setDefaultChar(data) {
    console.log('Test Location 1: ', data);
    this.setState({char: data});
    console.log('Test Location 2: ', this.state.char);
  }



  retrieveMetaList(productId) {
    console.log('current productId', productId);
    axios({
      method: 'get',
      url: '/api/reviews/meta/',
      params: {
        // eslint-disable-next-line camelcase
        product_id: productId
      }
    })
      .then((result) => {
        console.log('result info type', result.data.characteristics);
        this.setDefaultChar(result.data.characteristics);
      });
  }

  submitReview() {
    axios.post('/api/reviews', {
      product_id: this.props.productId,
      rating: Number(this.state.star),
      summary: this.state.summary,
      body: this.state.body,
      recommend: this.state.recommended,
      name: this.state.nickname,
      email: this.state.email,
      photos: this.state.img,
      characteristics: this.state.submitChar,
    })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
    this.setState({setModal: false, summary: '', body: '', nickname: '', email: '', img: [], submitChar: {}});
  }

  handleSummaryChange(event) {
    this.setState({summary: event.target.value});

  }
  handleBodyChange(event) {

    const charCount = event.target.value.length;
    const minChar = 50;
    const charLength = minChar - charCount;
    if (charLength > -1) {
      this.setState({minCharNeeded: charLength });
    }
    this.setState({ body: event.target.value });
  }
  handleNicknameChange(event) {
    this.setState({nickname: event.target.value});
  }
  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  handleRecommendedChange(event) {
    const isRecommended = event.target.value === 'true' ? true : false;
    this.setState({recommended: isRecommended});
  }

  handleSizeChange(event) {
    const key = this.state.char.Size.id;
    this.setState(prevState => {
      let submitChar = Object.assign({}, prevState.submitChar);
      submitChar[key] = Number(event.target.value);
      return { submitChar };
    });
    if (event.target.value === '1') {
      this.setState({sizeDescrib: 'A size too small'});
    } else if (event.target.value === '2') {
      this.setState({sizeDescrib: '1/2 a size too small'});
    } else if (event.target.value === '3') {
      this.setState({sizeDescrib: 'Perfect'});
    } else if (event.target.value === '4') {
      this.setState({sizeDescrib: '1/2 a size too big'});
    } else if (event.target.value === '5') {
      this.setState({sizeDescrib: 'A size too large'});
    }
  }

  handleWidthChange(event) {
    const key = this.state.char.Width.id;
    this.setState(prevState => {
      let submitChar = Object.assign({}, prevState.submitChar);
      submitChar[key] = Number(event.target.value);
      return { submitChar };
    });
    if (event.target.value === '1') {
      this.setState({widthDescrib: 'Too narrow'});
    } else if (event.target.value === '2') {
      this.setState({widthDescrib: 'Slightly narrow'});
    } else if (event.target.value === '3') {
      this.setState({widthDescrib: 'Perfect'});
    } else if (event.target.value === '4') {
      this.setState({widthDescrib: 'Slightly wide'});
    } else if (event.target.value === '5') {
      this.setState({widthDescrib: 'Too wide'});
    }
  }

  handleComfortChange(event) {
    const key = this.state.char.Comfort.id;
    this.setState(prevState => {
      let submitChar = Object.assign({}, prevState.submitChar);
      submitChar[key] = Number(event.target.value);
      return { submitChar };
    });
    if (event.target.value === '1') {
      this.setState({comfortDescrib: 'Uncomfortable'});
    } else if (event.target.value === '2') {
      this.setState({comfortDescrib: 'Slightly Uncomfortable'});
    } else if (event.target.value === '3') {
      this.setState({comfortDescrib: 'Ok'});
    } else if (event.target.value === '4') {
      this.setState({comfortDescrib: 'Comfortable'});
    } else if (event.target.value === '5') {
      this.setState({comfortDescrib: 'Perfect'});
    }
  }

  handleQualityChange(event) {
    const key = this.state.char.Quality.id;
    this.setState(prevState => {
      let submitChar = Object.assign({}, prevState.submitChar);
      submitChar[key] = Number(event.target.value);
      return { submitChar };
    });
    if (event.target.value === '1') {
      this.setState({qualityDescrib: 'Poor'});
    } else if (event.target.value === '2') {
      this.setState({qualityDescrib: 'Below Average'});
    } else if (event.target.value === '3') {
      this.setState({qualityDescrib: 'What I expected'});
    } else if (event.target.value === '4') {
      this.setState({qualityDescrib: 'Pretty good'});
    } else if (event.target.value === '5') {
      this.setState({qualityDescrib: 'Perfect'});
    }
  }

  handleLengthChange(event) {
    const key = this.state.char.Length.id;
    this.setState(prevState => {
      let submitChar = Object.assign({}, prevState.submitChar);
      submitChar[key] = Number(event.target.value);
      return { submitChar };
    });
    if (event.target.value === '1') {
      this.setState({lengthDescrib: 'Runs short'});
    } else if (event.target.value === '2') {
      this.setState({lengthDescrib: 'Runs slightly short'});
    } else if (event.target.value === '3') {
      this.setState({lengthDescrib: 'Perfect'});
    } else if (event.target.value === '4') {
      this.setState({lengthDescrib: 'Runs slightly long'});
    } else if (event.target.value === '5') {
      this.setState({lengthDescrib: 'Runs long'});
    }
  }

  handleFitChange(event) {
    const key = this.state.char.Fit.id;
    this.setState(prevState => {
      let submitChar = Object.assign({}, prevState.submitChar);
      submitChar[key] = Number(event.target.value);
      return { submitChar };
    });
    if (event.target.value === '1') {
      this.setState({fitDescrib: 'Runs tight'});
    } else if (event.target.value === '2') {
      this.setState({fitDescrib: 'Runs slightly tight'});
    } else if (event.target.value === '3') {
      this.setState({fitDescrib: 'Perfect'});
    } else if (event.target.value === '4') {
      this.setState({fitDescrib: 'Runs slightly long'});
    } else if (event.target.value === '5') {
      this.setState({fitDescrib: 'Runs long'});
    }
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
          <Button
            size={2}
            onClick={this.toggleModal}
            className="btn-AddReview">
            Add Review
          </Button>
          {this.state.setModal && (
            <div className="modalRR">
              <div className="overlayRR"></div>
              <div className="modal-content">
                <h2 className="create-review-title">Write your review: {this.props.productName}</h2>
                <div className="star-rating">
                  <input
                    type="radio"
                    name="stars"
                    id="star-a"
                    value="5"
                    onChange={this.handleStarChange} />
                  <label htmlFor="star-a"></label>
                  <input
                    type="radio"
                    name="stars"
                    id="star-b"
                    value="4"
                    onChange={this.handleStarChange} />
                  <label htmlFor="star-b"></label>
                  <input
                    type="radio"
                    name="stars"
                    id="star-c"
                    value="3"
                    onChange={this.handleStarChange} />
                  <label htmlFor="star-c"></label>
                  <input
                    type="radio"
                    name="stars"
                    id="star-d"
                    value="2"
                    onChange={this.handleStarChange} />
                  <label htmlFor="star-d"></label>
                  <input type="radio"
                    name="stars"
                    id="star-e"
                    value="1"
                    onChange={this.handleStarChange} />
                  <label htmlFor="star-e"></label>
                </div>
                <div className="recommended-select"> Do you recommend this product?
                  <label id="recommend-option"></label>
                  <input type="radio"
                    name="recommendation"
                    value='true'
                    onChange={this.handleRecommendedChange}/> Yes
                  <label id="recommend-option" >
                  </label>
                  <input type="radio"
                    name="recommendation"
                    value='false'
                    onChange={this.handleRecommendedChange}/> No
                </div>
                <div className="Section-box-1">
                  <div className="character-container">
                    <div className="char-option-comfort"> Comfort
                      <label className="char-comfort"></label>
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
                    <div className="char-container">
                      Current Selection: {this.state.comfortDescrib}
                    </div>
                    <div className="char-option-quality"> Quality
                      <label className="char-quality"></label>
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
                    <div className="char-container">
                      Current Selection: {this.state.qualityDescrib}
                    </div>
                    <div className="char-option-length"> Length
                      <label className="char-length"></label>
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
                    <div className="char-container">
                      Current Selection: {this.state.lengthDescrib}
                    </div>
                    <div className="char-option-fit"> Fit
                      <label className="char-fit"></label>
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
                    <div className="char-container">
                      Current Selection: {this.state.fitDescrib}
                    </div>
                  </div>
                  <div className="description-box">
                    <input className="review-summary"
                      maxLength="60"
                      type="text"
                      placeholder="Example: Best purchase ever!"
                      value={this.state.summary}
                      onChange={this.handleSummaryChange} />
                    <br></br>
                    <textarea className="review-body"
                      maxLength="1000"
                      required
                      type="text"
                      placeholder="Why did you like the product or not?"
                      value={this.state.body}
                      onChange={this.handleBodyChange} />
                    <div className="MinCharNeeded">Minimum required characters left: {this.state.minCharNeeded}</div>
                  </div>
                </div>
                <br></br>
                <div className="user-overall-detail-container">
                  <div className="user-detail-container">
                    <div className="nickname-container">
                      <div className="title-section">Nickname</div>
                      <input className="Nickname"
                        maxLength="60"
                        required
                        type="text"
                        placeholder="Example: jackson11!"
                        value={this.state.nickname}
                        onChange={this.handleNicknameChange} />
                      <div className="warning-line" id="username">For privacy reasons, do not use your full name or email address </div>
                    </div>
                    <br></br>
                    <div className="title-section">Email</div>
                    <input className="email"
                      type="text"
                      placeholder="Example: jackson11@email.com"
                      value={this.state.email}
                      onChange={this.handleEmailChange} />
                    <div className="warning-line" id="email">For authentication reasons, you will not be emailed </div>
                    <br></br>
                  </div>
                  <div className="added-Image-Container">
                    <div className="title-section">Add an Image</div>
                    <input className="img"
                      type="file"
                      multiple
                      name="myImage"
                      onChange={this.handleImgChange} />
                  </div>
                </div>
                <button
                  className='close-modal'
                  onClick={this.toggleModal}>
                    Close
                </button>
                <div className="submit-review-btn">
                  <button
                    className='submit-review'
                    onClick={this.submitReview}>
                      Submit
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    } else if (this.props.submitCharOption === 2) {
      return (
        <div>
          <Button
            size={2}
            onClick={this.toggleModal}
            className="btn-AddReview">
            Add Review
          </Button>
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
                  <label htmlFor="star-a"></label>
                  <input
                    type="radio"
                    name="stars"
                    id="star-b"
                    value="4"
                    onChange={this.handleStarChange} />
                  <label htmlFor="star-b"></label>
                  <input
                    type="radio"
                    name="stars"
                    id="star-c"
                    value="3"
                    onChange={this.handleStarChange} />
                  <label htmlFor="star-c"></label>
                  <input
                    type="radio"
                    name="stars"
                    id="star-d"
                    value="2"
                    onChange={this.handleStarChange} />
                  <label htmlFor="star-d"></label>
                  <input type="radio"
                    name="stars"
                    id="star-e"
                    value="1"
                    onChange={this.handleStarChange} />
                  <label htmlFor="star-e"></label>
                </div>
                <div className="recommended-select"> Do you recommend this product?
                  <label htmlFor="recommend-option"></label>
                  <input type="radio"
                    name="recommendation"
                    value="true"
                    onChange={this.handleRecommendedChange}/> Yes
                  <label htmlFor="recommend-option" >
                  </label>
                  <input type="radio"
                    name="recommendation"
                    value="false"
                    onChange={this.handleRecommendedChange}/> No
                </div>
                <div className="Section-box-1">
                  <div className="character-container">
                    <div className="char-option-size"> Size
                      <label className="char-size"></label>
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
                    <div className="char-container">
                      Current Selection: {this.state.sizeDescrib}
                    </div>
                    <div className="char-option-width"> Width
                      <label className="char-width"></label>
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
                    <div className="char-container">
                      Current Selection: {this.state.widthDescrib}
                    </div>
                    <div className="char-option-comfort"> Comfort
                      <label className="char-comfort"></label>
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
                    <div className="char-container">
                      Current Selection: {this.state.comfortDescrib}
                    </div>
                    <div className="char-option-quality"> Quality
                      <label className="char-quality"></label>
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
                    <div className="char-container">
                      Current Selection: {this.state.qualityDescrib}
                    </div>
                  </div>
                  <div className="description-box">
                    <input className="review-summary"
                      maxLength="60"
                      type="text"
                      placeholder="Example: Best purchase ever!"
                      value={this.state.summary}
                      onChange={this.handleSummaryChange} />
                    <br></br>
                    <textarea className="review-body"
                      maxLength="1000"
                      required
                      type="text"
                      placeholder="Why did you like the product or not?"
                      value={this.state.body}
                      onChange={this.handleBodyChange} />
                    <div className="MinCharNeeded">Minimum required characters left: {this.state.minCharNeeded}</div>
                  </div>
                </div>
                <br></br>
                <div className="user-overall-detail-container">
                  <div className="user-detail-container">
                    <div className="nickname-container">
                      <div className="title-section">Nickname</div>
                      <input className="Nickname"
                        maxLength="60"
                        required
                        type="text"
                        placeholder="Example: jackson11!"
                        value={this.state.nickname}
                        onChange={this.handleNicknameChange} />
                      <div className="warning-line" id="username">For privacy reasons, do not use your full name or email address </div>
                    </div>
                    <br></br>
                    <div className="title-section">Email</div>
                    <input className="email"
                      type="text"
                      placeholder="Example: jackson11@email.com"
                      value={this.state.email}
                      onChange={this.handleEmailChange} />
                    <div className="warning-line" id="email">For authentication reasons, you will not be emailed </div>
                    <br></br>
                  </div>
                  <div className="added-Image-Container">
                    <div className="title-section">Add an Image</div>
                    <input className="img"
                      type="file"
                      multiple
                      name="myImage"
                      onChange={this.handleImgChange} />
                  </div>
                </div>
                <button
                  className='close-modal'
                  onClick={this.toggleModal}>
                    Close
                </button>
                <div className="submit-review-btn">
                  <button
                    className='submit-review'
                    onClick={this.submitReview}>
                      Submit
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div>
          <Button
            size={2}
            onClick={this.toggleModal}
            className="btn-AddReview">
            Add Review
          </Button>
          {this.state.setModal && (
            <div className="modalRR">
              <div className="overlayRR"></div>
              <div className="modal-content">
                <h2 className="create-review-title">Write your review: {this.props.productName}</h2>
                <div className="star-rating">
                  <input
                    type="radio"
                    name="stars"
                    id="star-a"
                    value="5"
                    onChange={this.handleStarChange} />
                  <label htmlFor="star-a"></label>
                  <input
                    type="radio"
                    name="stars"
                    id="star-b"
                    value="4"
                    onChange={this.handleStarChange} />
                  <label htmlFor="star-b"></label>
                  <input
                    type="radio"
                    name="stars"
                    id="star-c"
                    value="3"
                    onChange={this.handleStarChange} />
                  <label htmlFor="star-c"></label>
                  <input
                    type="radio"
                    name="stars"
                    id="star-d"
                    value="2"
                    onChange={this.handleStarChange} />
                  <label htmlFor="star-d"></label>
                  <input type="radio"
                    name="stars"
                    id="star-e"
                    value="1"
                    onChange={this.handleStarChange} />
                  <label htmlFor="star-e"></label>
                </div>
                <div className="recommended-select"> Do you recommend this product?
                  <label htmlFor="recommend-option"></label>
                  <input type="radio"
                    name="recommendation"
                    value="true"
                    onChange={this.handleRecommendedChange}/> Yes
                  <label htmlFor="recommend-option" >
                  </label>
                  <input type="radio"
                    name="recommendation"
                    value="false"
                    onChange={this.handleRecommendedChange}/> No
                </div>
                <div className="Section-box-1">
                  <div className="character-container">
                    <div className="char-option-size"> Size
                      <label className="char-size"></label>
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
                    <div className="char-container">
                    Current Selection: {this.state.sizeDescrib}
                    </div>
                    <div className="char-option-width"> Width
                      <label className="char-width"></label>
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
                    <div className="char-container">
                    Current Selection: {this.state.handleDescrib}
                    </div>
                    <div className="char-option-comfort"> Comfort
                      <label className="char-comfort"></label>
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
                      {this.comfortDescription}
                    </div>
                    <div className="char-container">
                      Current Selection: {this.state.comfortDescrib}
                    </div>
                    <div className="char-option-quality"> Quality
                      <label className="char-quality"></label>
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
                    <div className="char-container">
                      Current Selection: {this.state.qualityDescrib}
                    </div>
                    <div className="char-option-length"> Length
                      <label className="char-length"></label>
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
                    <div className="char-container">
                        Current Selection: {this.state.lengthDescrib}
                    </div>
                    <div className="char-option-fit"> Fit
                      <label className="char-fit"></label>
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
                    <div className="char-container">
                        Current Selection: {this.state.fitDescrib}
                    </div>
                  </div>
                  <div className="description-box">
                    <input className="review-summary"
                      maxLength="60"
                      type="text"
                      placeholder="Example: Best purchase ever!"
                      value={this.state.summary}
                      onChange={this.handleSummaryChange} />
                    <br></br>
                    <textarea className="review-body"
                      maxLength="1000"
                      required
                      type="text"
                      placeholder="Why did you like the product or not?"
                      value={this.state.body}
                      onChange={this.handleBodyChange} />
                    <div className="MinCharNeeded">Minimum required characters left: {this.state.minCharNeeded}</div>
                  </div>
                </div>
                <br></br>
                <div className="user-overall-detail-container">
                  <div className="user-detail-container">
                    <div className="nickname-container">
                      <div className="title-section">Nickname</div>
                      <input className="Nickname"
                        maxLength="60"
                        required
                        type="text"
                        placeholder="Example: jackson11!"
                        value={this.state.nickname}
                        onChange={this.handleNicknameChange} />
                      <div className="warning-line" id="username">For privacy reasons, do not use your full name or email address </div>
                    </div>
                    <br></br>
                    <div className="title-section">Email</div>
                    <input className="email"
                      type="text"
                      placeholder="Example: jackson11@email.com"
                      value={this.state.email}
                      onChange={this.handleEmailChange} />
                    <div className="warning-line" id="email">For authentication reasons, you will not be emailed </div>
                    <br></br>
                  </div>
                  <div className="added-Image-Container">
                    <div className="title-section">Add an Image</div>
                    <input className="img"
                      type="file"
                      multiple
                      name="myImage"
                      onChange={this.handleImgChange} />
                  </div>
                </div>
                <button
                  className='close-modal'
                  onClick={this.toggleModal}>
                    Close
                </button>
                <div className="submit-review-btn">
                  <button
                    className='submit-review'
                    onClick={this.submitReview}>
                      Submit
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }
  }
}

export default AddReview;