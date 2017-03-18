import React from 'react';
import Nav from '../components/presentation/common/nav';
import Profile from '../components/presentation/profile/profile';
import RepoContainer from '../components/containers/repositoriesContainer.js';
import getUser from '../api/user';

export default class extends React.Component {
  constructor (props) {
    super(props);
    let username = props.req.query.user;
    this.state = {username};
  }
  asyncComponentWillMount () {
    let username = this.state.username;
    return getUser(username)
  }
  render () {

    return (<div>
      <Nav/>
      <Profile {...this.props}/>
      <RepoContainer {...this.props}/>
    </div>);

  }
}
