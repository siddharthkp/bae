import React from 'react';

import Repositories from '../presentation/profile/repositories';
import getRepos from '../../api/repos';

export default class extends React.Component {
  constructor (props) {
    super(props);
    /*
      Set initial state.
      Initilising with 5 placeholders
    */
    this.state = {
      repos: [{}, {}, {}, {}, {}]
    };
  }
  componentDidMount () {
    /* Fetch data and set state */
    getRepos(this.props.username)
    .then(repos => this.setState({repos}))
    .catch(error => this.setState(error));
  }
  render () {
    /* Passes data to presentation component */
    return <Repositories {...this.state}/>;
  }
};
