import React from 'react';
import ReactDOM from 'react-dom';
import { getMsgNode, initBulletAnimate } from './helper';
import StyledBullet from './StyledBullet';

const defaultOpts = {
  animate: 'RightToLeft',
  pauseOnHover: true,
  loopCount: 1,
  duration: 10,
  color: '#fff',
  bgColor: 'rgba(2,2,2,.4)',
  animateTimeFun: 'linear'
};
export default class Bullet {
  target = null;
  bullets = [];
  allPaused = false;
  allHide = false;
  constructor(option) {
    // 设置弹幕目标
    if (typeof option === 'string') {
      this.target = document.querySelector(option);
      if (!this.target) {
        throw new Error('The display target does not exist');
      }
    } else if (option instanceof HTMLElement) {
      this.target = option;
    } else {
      throw new Error('The display target of the barrage must be set');
    }

    // 屏幕目标必须具备的CSS样式
    const { position } = getComputedStyle(this.target);
    if (position === 'static') {
      this.target.style.position = 'relative';
      this.target.style.overflow = 'hidden';
    }
    // 插入css animation
    initBulletAnimate(this.target);
  }
  push(item, opts = defaultOpts) {
    const {
      animate,
      duration,
      loopCount,
      animateTimeFun,
      pauseOnHover,
      color,
      bgColor
    } = Object.assign(defaultOpts, opts);
    // 实时获取屏幕的宽高
    const { height: screenHeight } = this.target.getBoundingClientRect();
    // 创建单条弹幕的容器
    const bulletContainer = document.createElement('div');
    bulletContainer.id = new Date().getTime();
    this.target.appendChild(bulletContainer);
    // 加入当前存在的弹幕列表
    this.bullets.push(bulletContainer);
    // 设置弹幕容器的初始样式
    bulletContainer.style.transitionProperty = 'opacity';
    bulletContainer.style.transitionDuration = '1s';
    bulletContainer.style.cursor = 'pointer';
    bulletContainer.style.position = 'absolute';
    bulletContainer.style.left = 0;
    bulletContainer.style.zIndex = 9;
    bulletContainer.style.visibility = 'hidden';
    bulletContainer.style.animationName = animate;
    bulletContainer.style.animationIterationCount = loopCount;
    bulletContainer.style.animationDuration = `${duration}s`;
    bulletContainer.style.animationTimingFunction = animateTimeFun;

    // 性能小优化
    bulletContainer.style.willChange = 'transform';
    if (this.allHide) {
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
          if (!this.allPaused) {
            bulletContainer.style.animationPlayState = 'running';
          }
        },
        false
      );
    }
    // 弹幕渲染进屏幕
    ReactDOM.render(
      React.isValidElement(item) || typeof item === 'string' ? (
        item
      ) : (
        <StyledBullet color={color} bgColor={bgColor}>
          {getMsgNode(item)}
        </StyledBullet>
      ),
      bulletContainer,
      () => {
        // 获取当前弹幕的尺寸
        const { height } = bulletContainer.getBoundingClientRect();
        // 设置当前弹幕的高度为随机
        bulletContainer.style.top = Math.random() * (screenHeight - height) + 'px';
      }
    );

    // 创建一个监听弹幕动画完成的事件
    bulletContainer.addEventListener('animationend', () => {
      // 从集合中剔除
      this.bullets = this.bullets.filter(function(obj) {
        return obj.id !== bulletContainer.id;
      });
      ReactDOM.unmountComponentAtNode(bulletContainer);
      bulletContainer.remove();
    });
  }
  pause() {
    this.allPaused = true;
    this.bullets.forEach(item => {
      item.style.animationPlayState = 'paused';
    });
  }
  resume() {
    this.allPaused = false;
    this.bullets.forEach(item => {
      item.style.animationPlayState = 'running';
    });
  }
  hide() {
    this.allHide = true;
    this.bullets.forEach(item => {
      item.style.opacity = 0;
    });
  }
  show() {
    this.allHide = false;
    this.bullets.forEach(item => {
      item.style.opacity = 1;
    });
  }
  clear() {
    this.bullets.forEach(item => {
      ReactDOM.unmountComponentAtNode(item);
      item.remove();
    });
  }
}
