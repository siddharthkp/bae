import React from 'react';
import styled from 'styled-components';

import A from '../library/anchor';
import Blink from '../library/blink';

const Loading = styled(A)`
  background: #2CC1ED;
  width: 40%;
  height: 22px;
  margin-top: 10px;
  &::before {
    content: 'x';
  }
  animation: ${Blink} 2s linear infinite;
`;

export default (props) => {
  if (props.url) return <A href={props.url}>{props.children}</A>;
  else return <Loading/>;
};
