import React, {Component} from 'react';

class QASearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
  }

  handleChange(e) {
    this.setState({
      search: e.target.value
    });
    this.props.liftSearch(e.target.value);
  }

  render() {
    const {handleClick, handleChange, state} = this;
    const {search} = state;
    return (
      <form className='QA_Search'>
        <input placeholder='Search Questions' value={search} onChange={handleChange} />
        <button onClick={handleClick}>Search</button>
      </form>
    );
  }
}

export default QASearch;