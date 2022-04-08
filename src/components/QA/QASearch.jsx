import React, {Component} from 'react';

class QASearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.setState({
      search: ''
    });
    this.props.liftClear();
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
        <input type='text' placeholder='Search Questions' value={search} onChange={handleChange} />
        <button onClick={handleClick}>Clear</button>
      </form>
    );
  }
}

export default QASearch;