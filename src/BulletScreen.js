import React from 'react';
import ReactDOM from 'react-dom';
import { options, initBulletAnimate, isPlainObject, getContainer } from './helper';
import StyledBullet from './StyledBullet';

export default class BulletScreen {
  target = null;
  options = options;
  bullets = [];
  allPaused = false;
  allHide = false;
  tracks = [];
  queues = [];
  constructor(ele, opts = {}) {
    // 更新默认配置项
    this.options = Object.assign(this.options, opts);
    const { trackHeight } = this.options;
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
    // 初始化跑道，全部是空闲状态
    const { height } = this.target.getBoundingClientRect();
    this.tracks = new Array(Math.floor(height / trackHeight)).fill('idle');
    // 屏幕目标必须具备的CSS样式
    const { position } = getComputedStyle(this.target);
    if (position === 'static') {
      this.target.style.position = 'relative';
      // this.target.style.overflow = 'hidden';
    }
    // 插入css animation
    initBulletAnimate(this.target);
  }
  _getTrack() {
    let readyIdxs = [];
    let idx = -1;
    // 优先取空闲状态的
    this.tracks.forEach((st, idx) => {
      if (st==='idle') {
        readyIdxs.push(idx);
      }
    });
    if (readyIdxs.length) {
      idx = readyIdxs[Math.floor(Math.random() * readyIdxs.length)];
    }
    if (idx===-1) {
     // 其次是可以接上状态的
    this.tracks.forEach((st, idx) => {
      if (st==='feed') {
        readyIdxs.push(idx);
      }
    });
    if (readyIdxs.length) {
      idx = readyIdxs[Math.floor(Math.random() * readyIdxs.length)];
    }}
    if (idx !== -1) {
      this.tracks[idx] = 'running';
    }
    return idx;
  }

  push(item, opts = {}) {
    const options = Object.assign({}, this.options, opts);
    console.log({ options });

    const { onStart, onEnd, top } = options;
    const bulletContainer = getContainer({
      ...options,
      currScreen: this
    });

    // 加入当前存在的弹幕列表
    this.bullets.push(bulletContainer);
    console.log('push before queues', this.queues, this.tracks);
    const currIdletrack = this._getTrack();
    if (currIdletrack === -1 || this.allPaused) {
      // 考虑到全部暂停的情景
      this.queues.push([item, bulletContainer, top]);
    } else {
      this._render(item, bulletContainer, currIdletrack, top);
    }

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
  _render = (item, container, track, top) => {
    this.target.appendChild(container);
    const { gap, trackHeight } = this.options;
    // 弹幕渲染进屏幕
    ReactDOM.render(
      React.isValidElement(item) || typeof item === 'string' ? (
        item
      ) : isPlainObject(item) ? (
        <StyledBullet {...item} />
      ) : null,
      container,
      () => {
        let trackTop = track * trackHeight;
        container.dataset.track = track;
        container.style.top = top ? top : `${trackTop}px`;
        let options = {
          root: this.target,
          rootMargin: `0px ${gap} 0px 0px`,
          threshold: 1.0
        };
        let observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            // 完全处于视窗之内
            const { intersectionRatio, target } = entry;
            console.log('bullet id', target.id, intersectionRatio);
            if (intersectionRatio >= 1) {
              let trackIdx = target.dataset.track;
              console.log('curr track value', this.tracks[trackIdx]);
              console.log('curr queues', this.queues);
              if (this.queues.length) {
                const [item, container, customTop] = this.queues.shift();
                this._render(item, container, trackIdx, customTop);
              } else {
                this.tracks[trackIdx] = 'feed';
              }
            }
          });
        }, options);
        observer.observe(container);
      }
    );
  };
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
    const { height } = this.target.getBoundingClientRect();
    this.tracks = new Array(Math.floor(height / this.options.trackHeight)).fill('idle');
    this.queues = [];
    this.bullets = [];
  }
}
