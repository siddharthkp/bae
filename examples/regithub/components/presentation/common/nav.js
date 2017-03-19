import React from 'react';
import styled, {injectGlobal} from 'styled-components';
import Logo from '../common/logo';
import Helmet from "react-helmet";

injectGlobal`
  body {
    margin: 0;
    padding: 0;
    background: #EEE;
    color: #FFF;
    font-family: 'Nunito', sans-serif;
  }
`;

const NavBar = styled.div`
  height: 30px;
  padding: 10px;
  background: #FFF;
  border-bottom: 1px solid #DDD;
  text-align: center;
  > img {
    height: 30px;
  }
`;

const Nav = () => (
  <NavBar>
    <Helmet
      title='regithub'
      link={[{href: 'https://fonts.googleapis.com/css?family=Nunito', rel: 'stylesheet'}]}
    />
    <Logo/>
  </NavBar>
);

export default Nav;
