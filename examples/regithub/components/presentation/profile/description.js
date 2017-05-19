import React from 'react'
import styled from 'styled-components'
const Description = styled.div`
  color: #999;
  font-size: 12px;
`

export default props => <Description>{props.content}</Description>
