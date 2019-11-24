import React, { useState } from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import {
  RotateLeft,
  PlayCircleFilledWhite,
  PauseCircleFilled,
  Visibility,
  VisibilityOff
} from '@material-ui/icons';

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
      <aside style={{ position: 'fixed', left: 0, top: 0, zIndex: 999 }}>
        <Tooltip title="清屏" arrow>
          <IconButton onClick={handleClear}>
            <RotateLeft color="error"></RotateLeft>
          </IconButton>
        </Tooltip>
        <Tooltip title={visible ? '隐藏' : '显示'} arrow>
          <IconButton onClick={handleVisible}>
            {visible ? <VisibilityOff color="secondary" /> : <Visibility color="secondary" />}
          </IconButton>
        </Tooltip>
        <Tooltip title={paused ? '开始' : '暂停'} arrow>
          <IconButton onClick={handleAnimateState}>
            {paused ? (
              <PlayCircleFilledWhite color="secondary" />
            ) : (
              <PauseCircleFilled color="secondary" />
            )}
          </IconButton>
        </Tooltip>
      </aside>
      <section style={{ height: '100vh' }} className="screen"></section>
    </>
  );
}
