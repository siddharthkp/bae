import React from 'react'
import styled from 'styled-components'
import Card from '../library/card'
import Input from '../library/input'
import A from '../library/anchor'
import Button from '../library/button'
import Logo from '../common/logo'

const ProfileInput = styled(Card)`
  text-align: center;
  box-sizing: border-box;
  margin: 70px auto 0;
  padding: 30px 50px;
  width: 500px;
  min-height: 100px;

  @media (max-width: 600px) {
    width: 90%;
  }

  > input {
    margin-top: 30px;
  }

  > a {
    width: 100%;
    margin-top: 10px;
  }
`

export default class extends React.Component {
  constructor (props) {
    super(props)
    /* Set initial state */
    this.state = {username: ''}
  }

  /*
    Compose presentation components inside our
    ProfileInput components
  */
  render () {
    return <ProfileInput>
        <Logo/>
        <Input
          autoFocus
          placeholder='github username'
          onChange={this.onChange.bind(this)}
          onKeyUp={this.onKeyUp.bind(this)}
          onFocus={this.onFocus.bind(this)}
        />
        <A href={`/profile?user=${this.state.username}`}>
          <Button>See profile</Button>
        </A>
      </ProfileInput>
  }
  /* Change state on change */
  onChange (event) {
    this.setState({username: event.target.value})
  }
  /* Trigger submit on enter key */
  onKeyUp (event) {
    if (event.which === 13) location.href = `/profile?user=${this.state.username}`
  }
  /* Pick value from input on focus */
  onFocus (event) {
    this.setState({username: event.target.value})
  }
}
