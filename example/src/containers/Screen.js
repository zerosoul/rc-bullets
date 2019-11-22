import React, { useState } from 'react';
import { IconButton } from '@material-ui/core';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import VisibilityIcon from '@material-ui/icons/Visibility';

import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
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
        <IconButton onClick={handleClear}>
          <RotateLeftIcon color="secondary">ddd</RotateLeftIcon>
        </IconButton>
        <IconButton onClick={handleVisible}>
          {visible ? <VisibilityOffIcon /> : <VisibilityIcon />}
        </IconButton>
        <IconButton onClick={handleAnimateState}>
          {paused ? <PlayCircleFilledWhiteIcon /> : <PauseCircleFilledIcon />}
        </IconButton>
      </aside>
      <section style={{ height: '100vh' }} className="screen"></section>
    </>
  );
}
