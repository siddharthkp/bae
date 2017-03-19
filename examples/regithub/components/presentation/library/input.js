import styled from 'styled-components'

const Input = styled.input`
  background: #FFF;
  border: 1px solid #DDD;
  border-radius: 2px;
  padding: 10px;
  width: calc(100% - 20px);
  outline: none;
  font-size: 16px;

  &:hover, &:focus {
    border-color: #2CC1ED;
  }
`

export default Input
