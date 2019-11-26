# React 弹幕

> 基于 CSS3 动画，使用 React 构建，可扩展，高性能。

[![NPM](https://img.shields.io/npm/v/rc-bullets.svg)](https://www.npmjs.com/package/rc-bullets) [![NPM downloads](https://img.shields.io/npm/dm/rc-bullets.svg)](http://npmjs.com/package/rc-bullets)

## 演示地址

请访问：[zerosoul.github.io/rc-bullets/](https://zerosoul.github.io/rc-bullets/)

![demo gif](demo.gif)

## 安装

```bash
npm install --save rc-bullets
```

## 初始化一个简单的弹幕场景

```jsx
import React, { useEffect, useState } from 'react';
import BulletScreen, { StyledBullet } from 'rc-bullets';
export default function Demo() {
  // 弹幕屏幕
  const [screen, setScreen] = useState(null);
  // 弹幕内容
  const [bullet, setBullet] = useState('');
  useEffect(() => {
    // 给页面中某个元素初始化弹幕屏幕，一般为一个大区块
    let s = new BulletScreen('.screen');
    // or
    // let s=new BulletScreen(document.querySelector('.screen));
    setScreen(s);
  }, []);
  // 弹幕内容输入事件处理
  const handleChange = ({ target: { value } }) => {
    setBullet(value);
  };
  // 发送弹幕
  const handleSend = () => {
    if (bullet) {
      // push
      screen.push(bullet);
      // or 使用 StyledBullet

      screen.push(<StyledBullet msg={bullet} />);
    }
  };
  return (
    <main>
      <div className="screen" style={{ width: '100vw', height: '80vh' }}></div>
      <input value={bullet} onChange={handleChange} />
      <button onClick={handleSend}>发送</button>
    </main>
  );
}
```

## 特性

- 支持传入 React 组件，灵活控制弹幕内容和 UI，并提供一个默认样式组件：`<StyledBullet/>`
- 弹幕屏幕管理：清屏，暂停，隐藏（后续可能会加入针对单个弹幕的控制）
- 弹幕动画参数化：运动函数（匀速/ease/步进/cubic-bezier）、时长（秒）、循环次数等
- 鼠标悬浮弹幕暂停

## 常用 API

- 初始化弹幕屏幕：`const screen = BulletScreen(<queryString>|<HTMLElement>)`
- 发送弹幕：`screen.push(<string>|<ReactElement>)`
- 弹幕清屏：`screen.clear()`
- 暂停弹幕：`screen.pause()`
- 弹幕继续：`screen.resume()`
- 隐藏弹幕（滚动继续）：`screen.hide()`
- 显示弹幕：`screen.show()`
- 自带的一个弹幕样式组件：`<StyledBullet msg="<弹幕内容>" head="<头像地址>" color="<字体颜色>" bgColor="<背景色>">`

## TO DO

- react hooks 版本：`useBulletScreen`

## License

MIT © [zerosoul](https://github.com/zerosoul)
