import React from 'react';
import styled from 'styled-components';

import navLogo from '../assets/nav-logo.png';

export default function DesktopNav() {
  return (
    <>
      <Nav>
        <Img src={navLogo} alt="nav-logo" />
      </Nav>
      <Message>
        이 사이트는 모바일 환경을 지원하지 않습니다. 데스크탑으로 이용해주세요.
      </Message>
    </>
  );
}

const Nav = styled.nav`
  position: fixed;
  z-index: 1;
  display: flex;
  justify-content: center;
  padding: 19px 0;
  width: 100%;
  background-color: #ffffff;
`;

const Img = styled.img`
  width: 120px;
  height: 34px;
  cursor: pointer;
`;

const Message = styled.div`
  padding: 140px 100px;
  font-size: 1.8rem;
`;
