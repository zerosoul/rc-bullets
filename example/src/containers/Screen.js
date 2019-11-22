import React, { useState } from 'react';

export default function ScreenPage({ screen }) {
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);

  const handleAnimateState = () => {
    if (paused) {
      screen.resume();
    } else {
      screen.pause();
    }
    setPaused(!paused);
  };
  const handleClear = () => {
    screen.clear();
  };
  const handleVisible = () => {
    if (visible) {
      screen.hide();
    } else {
      screen.show();
    }
    setVisible(!visible);
  };

  return (
    <>
      <button onClick={handleAnimateState}>{paused ? '继续' : '暂停'}</button>
      <button onClick={handleClear}>清除</button>
      <button onClick={handleVisible}>{visible ? '隐藏' : '显示'}</button>
      <section style={{ height: '100vh' }} className="screen"></section>
    </>
  );
}
