import React from 'react';
import styled from 'styled-components';
import Card from '../library/card';
import Star from '../library/star';
import Clear from '../library/clear';
import Link from '../common/link';

const RepoList = styled(Card)`
  margin: 10px auto;
  box-sizing: border-box;
  width: 500px;
  min-height: 215px;

  @media (max-width: 600px) {
    width: 90%;
  }
`;

const Repo = styled.div`
  color: #777;
  > a {
    float: left;
    margin-top: 10px;
  }
  > span {
    float: right;
  }
`;

export default (props) => <RepoList>
  {props.repos && props.repos.map((repo, index) => (
    <Repo key={index}>
      <Link url={repo.url}>{repo.name}</Link>
      <Star>{repo.stars}</Star>
      <Clear/>
    </Repo>
  ))}
</RepoList>;
