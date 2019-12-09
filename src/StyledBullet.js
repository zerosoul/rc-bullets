import React from 'react';
import { getCorrectTextColor } from './helper';

const WrapperStyle = {
  padding: '8px 18px',
  border: '2px solid #fff',
  borderRadius: '26px',
  position: 'relative',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
  wordBreak: 'keep-all',
  whiteSpace: 'pre-wrap'
};
const MsgStyle = {
  fontSize: '22px',
  fontWeight: '800',
  lineHeight: '1.4'
};
const HeadStyle = {
  position: 'absolute',
  left: '-50px',
  top: '50%',
  transform: 'translateY(-50%)',
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  border: '2px solid #eee',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.8)'
};
const ImageStyle = {
  borderRadius: '50%',
  width: '100%',
  height: '100%'
};
const StyledBullet = ({ msg, head, color, bgColor = '#fff' }) => {
  const fontColor = color || getCorrectTextColor(bgColor);
  return (
    <div style={{ ...WrapperStyle, backgroundColor: bgColor }}>
      {head && (
        <div style={{ ...HeadStyle }}>
          <img src={head} style={ImageStyle} alt="msg head" />
        </div>
      )}
      <div style={{ ...MsgStyle, color: fontColor }}>{msg}</div>
    </div>
  );
};
export default StyledBullet;
