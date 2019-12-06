import React, { useState } from 'react';
import { IconButton, Tooltip, Modal } from '@material-ui/core';
import {
  RotateLeft,
  PlayCircleFilledWhite,
  PauseCircleFilled,
  Visibility,
  VisibilityOff,
  MonetizationOn
} from '@material-ui/icons';
import RewardImg from '../assets/img/reward.jpg';
export default function ScreenPage({ screen }) {
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

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
  const toggleModal = () => {
    setModalVisible(prev => !prev);
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
      <Modal open={modalVisible} onClose={toggleModal}>
        <img
          style={{
            outline: 'none',
            width: '20rem',
            border: '2px solid #666',
            borderRadius: '5px',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)'
          }}
          src={RewardImg}
          alt="奖励图"
        />
      </Modal>
      <aside
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 998,
          padding: '.5rem .8rem'
        }}
      >
        <Tooltip title="清屏" arrow>
          <IconButton onClick={handleClear}>
            <RotateLeft color="error"></RotateLeft>
          </IconButton>
        </Tooltip>
        <IconButton onClick={toggleModal}>
          <MonetizationOn color="secondary"></MonetizationOn>
        </IconButton>
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
      <section style={{ height: '70vh', marginTop: '15vh' }} className="screen"></section>
    </>
  );
}
