import React, {Component} from 'react';

class QnA_Search extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  handleClick (event) {
    event.preventDefault();
  }

  render() {
    const {handleClick} = this
    return (
      <form className='QnA_search_form'>
        <input placeholder='Search Questions' />
        <button onClick={handleClick}>Search</button>
      </form>
    )
  }
}

export default QnA_Search;