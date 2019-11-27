import React from 'react';
import ReactDOM from 'react-dom';
import { initBulletAnimate, isPlainObject, getContainer } from './helper';
import StyledBullet from './StyledBullet';

const defaultOpts = {
  animate: 'RightToLeft',
  pauseOnHover: true,
  loopCount: 1,
  duration: 10,
  delay: 0,
  direction: 'normal',
  color: '#fff',
  bgColor: 'rgba(2,2,2,.4)',
  animateTimeFun: 'linear'
};
export default class BulletScreen {
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
    const options = Object.assign(defaultOpts, opts);
    const currCount = this.bullets.length;
    const bulletContainer = getContainer({
      ...options,
      pause: this.allPaused,
      hide: this.allHide,
      zIndex: currCount + 10
    });
    this.target.appendChild(bulletContainer);
    // 加入当前存在的弹幕列表
    this.bullets.push(bulletContainer);
    // 实时获取屏幕的宽高
    const { height: screenHeight } = this.target.getBoundingClientRect();

    // 弹幕渲染进屏幕
    ReactDOM.render(
      React.isValidElement(item) || typeof item === 'string' ? (
        item
      ) : isPlainObject(item) ? (
        <StyledBullet {...item}></StyledBullet>
      ) : null,
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
    this.bullets = [];
  }
}
