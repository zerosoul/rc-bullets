// import React from 'react';
// const BounceIn = `
// @keyframes BounceIn {
//   from,
//   20%,
//   40%,
//   60%,
//   80%,
//   to {
//     animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
//   }

//   0% {
//     opacity: 0;
//     transform: scale3d(0.3, 0.3, 0.3);
//   }

//   20% {
//     transform: scale3d(1.1, 1.1, 1.1);
//   }

//   40% {
//     transform: scale3d(0.9, 0.9, 0.9);
//   }

//   60% {
//     opacity: 1;
//     transform: scale3d(1.03, 1.03, 1.03);
//   }

//   80% {
//     transform: scale3d(0.97, 0.97, 0.97);
//   }

//   to {
//     opacity: 1;
//     transform: scale3d(1, 1, 1);
//   }
// }`;
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

  // let newStyle = document.createElement('style');
  // newStyle.classList.add(animateClass);
  // document.head.appendChild(newStyle);
  // newStyle.sheet.insertRule(BounceIn, 0);

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
const getContainer = opts => {
  const {
    pause,
    hide,
    zIndex,
    pauseOnHover,
    pauseOnClick,
    animate,
    loopCount,
    direction,
    delay,
    duration,
    animateTimeFun
  } = opts;
  // 创建单条弹幕的容器
  const bulletContainer = document.createElement('div');
  bulletContainer.id = Math.random()
    .toString(36)
    .substring(2);

  // 设置弹幕容器的初始样式
  bulletContainer.style.transitionProperty = 'opacity';
  bulletContainer.style.transitionDuration = '1s';
  bulletContainer.style.cursor = 'pointer';
  bulletContainer.style.position = 'absolute';
  bulletContainer.style.left = 0;
  bulletContainer.style.zIndex = zIndex;
  bulletContainer.style.visibility = 'hidden';
  bulletContainer.style.animationName = animate;
  bulletContainer.style.animationIterationCount = loopCount;
  bulletContainer.style.animationDelay = isNaN(delay) ? delay : `${delay}s`;
  bulletContainer.style.animationDirection = direction;
  bulletContainer.style.animationDuration = isNaN(duration) ? duration : `${duration}s`;
  bulletContainer.style.animationTimingFunction = animateTimeFun;

  // 性能小优化
  bulletContainer.style.willChange = 'transform';
  // 隐藏
  if (hide) {
    bulletContainer.style.opacity = 0;
  }
  // pause on hover
  if (pauseOnHover) {
    bulletContainer.addEventListener(
      'mouseenter',
      () => {
        console.log('enter');

        bulletContainer.style.animationPlayState = 'paused';
      },
      false
    );
    bulletContainer.addEventListener(
      'mouseleave',
      () => {
        console.log('leave');
        if (!pause && !bulletContainer.dataset.clicked) {
          bulletContainer.style.animationPlayState = 'running';
        }
      },
      false
    );
  }
  // pauseonClick
  if (pauseOnClick) {
    bulletContainer.addEventListener(
      'click',
      evt => {
        console.log(evt);
        let currStatus = bulletContainer.style.animationPlayState;
        if (currStatus == 'paused' && bulletContainer.dataset.clicked) {
          bulletContainer.dataset.clicked = '';
          bulletContainer.style.animationPlayState = 'running';
        } else {
          bulletContainer.dataset.clicked = 'true';
          bulletContainer.style.animationPlayState = 'paused';
        }
      },
      false
    );
  }
  return bulletContainer;
};

export { initBulletAnimate, isPlainObject, getContainer };
