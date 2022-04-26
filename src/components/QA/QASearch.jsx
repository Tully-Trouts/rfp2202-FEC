import React, { Component } from 'react';
import { Button, Input } from '../styledComponents';

const QASearch = ({ setSearch }) => {
  return (
    <form className='QA_Search'>
      <Input type='text' placeholder='SEARCH QUESTIONS' onChange={(e) => setSearch(e.target.value)} size={1}/>
      <Button onClick={() => setSearch('')} size={0}>Clear</Button>
    </form>
  );
};

export default QASearch;