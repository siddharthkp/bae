import styled from 'styled-components'

const Star = styled.span`
  margin: 10px;
  &::after {
    content: ' ★';
    color: gold;
  }
`

export default Star
