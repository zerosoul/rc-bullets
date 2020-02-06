import convert from 'color-convert';

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

};
const isPlainObject = val => {
  if (val === null) {
    return false;
  }
  return typeof val === 'function' || typeof val === 'object';
};
const getContainer = opts => {
  const {
    currScreen,
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
  // 随机ID
  bulletContainer.id = Math.random()
    .toString(36)
    .substring(2);

  // 设置弹幕容器的初始样式
  bulletContainer.style.transitionProperty = 'opacity';
  bulletContainer.style.transitionDuration = '0.5s';
  bulletContainer.style.cursor = 'pointer';
  bulletContainer.style.position = 'absolute';
  bulletContainer.style.left = 0;
  // bulletContainer.style.zIndex = zIndex;
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
  if (currScreen.allHide) {
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
        if (!currScreen.allPaused && !bulletContainer.dataset.clicked) {
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
function getRGB(str) {
  var match = str.match(/rgba?\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})\)?(?:, ?(\d(?:\.\d?))\))?/);
  return match ? [match[1], match[2], match[3]] : [0, 0, 0];
}
function getCorrectTextColor(rgb = [0, 0, 0]) {
  /*
  From this W3C document: http://www.webmasterworld.com/r.cgi?f=88&d=9769&url=http://www.w3.org/TR/AERT#color-contrast

  Color brightness is determined by the following formula:
  ((Red value X 299) + (Green value X 587) + (Blue value X 114)) / 1000

  I know this could be more compact, but I think this is easier to read/explain.

  */
  if ((typeof rgb === 'string' || rgb instanceof String) && rgb.indexOf('#') > -1) {
    console.log('rgb is hex');
    rgb = convert.hex.rgb(rgb);
  } else if (typeof rgb === 'string') {
    console.log('rgb string', rgb);
    rgb = getRGB(rgb);
    console.log('rgb converted', rgb);
  }
  console.log({ rgb });

  const threshold = 130; /* about half of 256. Lower threshold equals more dark text on dark background  */
  const [hRed, hGreen, hBlue] = rgb;

  const cBrightness = (hRed * 299 + hGreen * 587 + hBlue * 114) / 1000;
  if (cBrightness > threshold) {
    return '#50616d';
  } else {
    return '#e9f1f6';
  }
}

const options = {
  // 跑道高度
  trackHeight: 50,
  // 弹幕之间的间距
  gap: '10px',
  animate: 'RightToLeft',
  pauseOnHover: true,
  pauseOnClick: false,
  onStart: null,
  onEnd: null,
  loopCount: 1,
  duration: 10,
  delay: 0,
  direction: 'normal',
  animateTimeFun: 'linear'
};
export { options, initBulletAnimate, isPlainObject, getContainer, getCorrectTextColor };
