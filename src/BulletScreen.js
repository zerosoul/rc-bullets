import React from 'react';
import ReactDOM from 'react-dom';
import { initBulletAnimate, isPlainObject, getContainer } from './helper';
import StyledBullet from './StyledBullet';

const defaultOpts = {
  top: null,
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
export default class BulletScreen {
  target = null;
  options = defaultOpts;
  bullets = [];
  allPaused = false;
  allHide = false;
  constructor(ele, opts = {}) {
    // 更新默认配置项
    this.options = Object.assign({}, this.options, opts);
    // 设置弹幕目标
    if (typeof ele === 'string') {
      this.target = document.querySelector(ele);
      if (!this.target) {
        throw new Error('The display target does not exist');
      }
    } else if (ele instanceof HTMLElement) {
      this.target = ele;
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
  push(item, opts = {}) {
    const options = Object.assign({}, this.options, opts);
    console.log({ options });

    const { onStart, onEnd, top } = options;
    const bulletContainer = getContainer({
      ...options,
      currScreen: this
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
        bulletContainer.style.top = top ? top : Math.random() * (screenHeight - height) + 'px';
      }
    );

    if (onStart) {
      // 创建一个监听弹幕动画开始的事件
      bulletContainer.addEventListener('animationstart', () => {
        if (onStart) {
          onStart.call(null, bulletContainer.id, this);
        }
      });
    }
    // 创建一个监听弹幕动画完成的事件
    bulletContainer.addEventListener('animationend', () => {
      // 如果设置了动画完成自定义函数，则执行
      if (onEnd) {
        onEnd.call(null, bulletContainer.id, this);
      }
      // 从集合中剔除
      this.bullets = this.bullets.filter(function(obj) {
        return obj.id !== bulletContainer.id;
      });
      ReactDOM.unmountComponentAtNode(bulletContainer);
      bulletContainer.remove();
    });

    // 返回该容器的ID
    return bulletContainer.id;
  }
  _toggleAnimateStatus = (id, status = 'paused') => {
    const currItem = this.bullets.find(item => item.id == id);
    if (currItem) {
      currItem.style.animationPlayState = status;
      return;
    }

    this.allPaused = status === 'paused' ? true : false;
    this.bullets.forEach(item => {
      item.style.animationPlayState = status;
    });
  };
  pause(id = null) {
    this._toggleAnimateStatus(id, 'paused');
  }
  resume(id = null) {
    this._toggleAnimateStatus(id, 'running');
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
  clear(id = null) {
    const currItem = this.bullets.find(item => item.id == id);
    if (currItem) {
      ReactDOM.unmountComponentAtNode(currItem);
      currItem.remove();
      this.bullets = this.bullets.filter(function(item) {
        return item.id !== id;
      });
      return;
    }
    this.bullets.forEach(item => {
      ReactDOM.unmountComponentAtNode(item);
      item.remove();
    });
    this.bullets = [];
  }
}
