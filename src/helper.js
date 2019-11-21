import React from 'react';
const initBulletAnimate = screen => {
  if (!screen) {
    return;
  }
  const animateId = 'BULLET_ANIMATE';
  let style = document.createElement('style');
  style.id = animateId;
  document.head.appendChild(style);
  let { width } = screen.getBoundingClientRect();
  let from = `from { visibility: visible; transform: translateX(${width}px); }`;
  let to = `to { visibility: visible; transform: translateX(-100%); }`;
  style.sheet.insertRule(`@keyframes barrage { ${from} ${to} }`, 0);
  window.onresize = () => {
    document.getElementById(animateId).remove();
    initBulletAnimate(screen);
  };
};
const isPlainObject = val => {
  if (val === null) {
    return false;
  }
  return typeof val === 'function' || typeof val === 'object';
};
const getMsgNode = item => {
  if (isPlainObject(item)) {
    const { msg, img } = item;
    return (
      <>
        {img && (
          <p className="head">
            <img src={img} alt="msg head" />
          </p>
        )}
        <p className="msg">{msg}</p>
      </>
    );
  }
  throw Error('Invalid params');
};

export { initBulletAnimate, getMsgNode };
