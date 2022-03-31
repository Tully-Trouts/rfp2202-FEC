import React from 'react';
import Overview from './Overview.jsx';
import QnA from './Q&A.jsx';
import Ratings from './Ratings.jsx';
import RelatedItems from './RelatedItems.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div>
        <Overview />
        <QnA />
        <Ratings />
        <RelatedItems />
      </div>
    )
  }
}

export default App;
