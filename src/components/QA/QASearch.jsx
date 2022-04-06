import React, {Component} from 'react';

class QASearch extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  handleClick (event) {
    event.preventDefault();
  }

  render() {
    const {handleClick} = this;
    return (
      <form className='QA_Search'>
        <input placeholder='Search Questions' />
        <button onClick={handleClick}>Search</button>
      </form>
    );
  }
}

export default QASearch;