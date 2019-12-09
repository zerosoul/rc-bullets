import React from 'react';
import { getCorrectTextColor } from './helper';

const WrapperStyle = {
  padding: '.4em 1em',
  border: '2px solid #fff',
  borderRadius: '2.2em',
  position: 'relative',
  boxShadow: '0 0 .8em rgba(0, 0, 0, 0.5)',
  wordBreak: 'keep-all',
  whiteSpace: 'pre-wrap'
};
const MsgStyle = {
  fontSize: '1.8em',
  fontWeight: '800',
  lineHeight: '1.4'
};
const HeadStyle = {
  position: 'absolute',
  left: '-4.6em',
  top: '50%',
  transform: 'translateY(-50%)',
  width: '4em',
  height: '4em',
  borderRadius: '50%',
  border: '2px solid #eee',
  boxShadow: '0 0 .8em rgba(0, 0, 0, 0.8)'
};
const ImageStyle = {
  borderRadius: '50%',
  width: '100%',
  height: '100%'
};
const sizes = {
  small: '10px',
  normal: '12px',
  large: '14px',
  huge: '16px'
};
const StyledBullet = ({ msg, head, size = 'normal', color, backgroundColor = '#fff' }) => {
  color = color || getCorrectTextColor(backgroundColor);
  const fontSize = sizes[size] || size;
  return (
    <div style={{ ...WrapperStyle, backgroundColor, fontSize }}>
      {head && (
        <div style={{ ...HeadStyle }}>
          <img src={head} style={ImageStyle} alt="msg head" />
        </div>
      )}
      <div style={{ ...MsgStyle, color }}>{msg}</div>
    </div>
  );
};
export default StyledBullet;
