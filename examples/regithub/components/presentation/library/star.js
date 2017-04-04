import styled from 'styled-components'

const Star = styled.span`
  margin: 10px;
  &::after {
    content: ' \\2605';
    color: gold;
  }
`

export default Star
