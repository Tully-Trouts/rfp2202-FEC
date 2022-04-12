import React, {Component} from 'react';
import { Button, Input } from '../styledComponents';

class QASearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };

    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  handleClear(e) {
    e.preventDefault();
    this.setState({
      search: ''
    });
    this.props.liftClear();
  }

  handleSearchInput(e) {
    e.preventDefault();
    this.setState({
      search: e.target.value
    });
    this.props.liftSearch(e.target.value);
  }

  render() {
    const {handleClear, handleSearchInput, state} = this;
    const {search} = state;
    return (
      <form className='QA_Search'>
        <Input type='text' placeholder='SEARCH QUESTIONS' value={search} onChange={handleSearchInput} size={1}/>
        <Button onClick={handleClear} size={0}>Clear</Button>
      </form>
    );
  }
}

export default QASearch;