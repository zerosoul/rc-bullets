import React from 'react';
const BounceIn = `
@keyframes BounceIn {
  from,
  20%,
  40%,
  60%,
  80%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  0% {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }

  20% {
    transform: scale3d(1.1, 1.1, 1.1);
  }

  40% {
    transform: scale3d(0.9, 0.9, 0.9);
  }

  60% {
    opacity: 1;
    transform: scale3d(1.03, 1.03, 1.03);
  }

  80% {
    transform: scale3d(0.97, 0.97, 0.97);
  }

  to {
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }
}`;
const initBulletAnimate = screen => {
  if (!screen) {
    return;
  }
  const animateClass = 'BULLET_ANIMATE';

  let style = document.createElement('style');
  style.classList.add(animateClass);
  document.head.appendChild(style);
  let { width } = screen.getBoundingClientRect();
  let from = `from { visibility: visible; transform: translateX(${width}px); }`;
  let to = `to { visibility: visible; transform: translateX(-100%); }`;
  style.sheet.insertRule(`@keyframes RightToLeft { ${from} ${to} }`, 0);

  let newStyle = document.createElement('style');
  newStyle.classList.add(animateClass);
  document.head.appendChild(newStyle);
  newStyle.sheet.insertRule(BounceIn, 0);

  window.onresize = () => {
    [...document.querySelectorAll(`.${animateClass}`)].map(ele => {
      ele.remove();
    });
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
