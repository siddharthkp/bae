import React from 'react'
import styled from 'styled-components'
import Card from '../library/card'
import Link from '../common/link'

import Avatar from './avatar'
import Description from './description'

const Profile = styled(Card)`
  text-align: center;
  box-sizing: border-box;
  margin: 50px auto 0;
  width: 500px;
  min-height: 180px;

  @media (max-width: 600px) {
    width: 90%;
  }
`

export default props => (
  <Profile>
    <Avatar url={props.photo} />
    <br />
    <Link url={props.url}>{props.name}</Link>
    <br />
    <Description content={props.bio || props.error} />
  </Profile>
)
