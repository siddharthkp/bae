import React from 'react'
import styled from 'styled-components'

const Avatar = styled.span`
  display: inline-block;
  height: 100px;
  width: 100px;
  border-radius: 50%;
  border: 5px solid #EEE;
  background-color: #EEE;
  ${props => (props.src ? `background-image: url(${props.src})` : '')};
  background-size: cover;
`

export default props => <Avatar src={props.url} />
