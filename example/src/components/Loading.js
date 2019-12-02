import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  padding: 1.5rem 0;
  color: #ccc;
  font-size: 1.4rem;
`;
export default function Loading() {
  return <StyledWrapper>加载中...</StyledWrapper>;
}
