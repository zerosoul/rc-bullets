import styled from 'styled-components';

const StyledBullet = styled.div`
  padding: 8px 18px;
  border: 2px solid #fff;
  border-radius: 26px;
  background-color: ${({ bgColor }) => bgColor};
  max-width: 40vw;
  position: relative;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  .msg {
    font-size: 22px;
    line-height: 1.4;
    color: ${({ color }) => color};
  }
  .head {
    position: absolute;
    left: -58px;
    top: 50%;
    transform: translateY(-50%);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 2px solid #eee;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
    img {
      border-radius: 50%;
      width: 100%;
      height: 100%;
    }
    &:after {
      position: absolute;
      top: 50%;
      right: -14px;
      transform: translateY(-50%);
      content: '';
      display: block;
      width: 8px;
      height: 2px;
      background: #fff;
    }
  }
`;
export default StyledBullet;
