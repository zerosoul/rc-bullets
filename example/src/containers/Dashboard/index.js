import React, { useState, useEffect, useCallback, useRef, lazy, Suspense } from 'react';
import styled from 'styled-components';
import Mock from 'mockjs';
// import { Link } from 'react-router-dom';
import BulletScreen, { StyledBullet } from 'rc-bullets';
import { Popper } from '@material-ui/core';
import BulletsScreen from '../Screen';
import ParamsPanel from './ParamsPanel';
import audioStart from '../../assets/start.mp3';
import audioEnd from '../../assets/end.mp3';
import { getRandomTheme, getRandomHead, getRandomAniFun } from '../../helper';

import Loading from '../../components/Loading';
import useParams from './useParams';
const GithubLink = lazy(() => import('../../components/GithubLink'));
const OptsArea = lazy(() => import('./OptsArea'));
const StyledWrapper = styled.section`
  .opts {
    z-index: 998;
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
    background: rgba(2, 2, 2, 0.2);
    padding: 1rem 0;
  }
`;
const startSoundEle = document.createElement('audio');
startSoundEle.src = audioStart;
const endSoundEle = document.createElement('audio');
endSoundEle.src = audioEnd;
let mockingInter = 0;
let currScreen = null;
export default function Dashboard() {
  const [bullet, setBullet] = useState('');

  const popperAnchorEl = useRef(null);
  const { params, states, toggleStates, handleChange } = useParams();
  const { mocking, isInfinite, open, soundEffect } = states;
  const { theme, loopCount, head, duration, animateFun } = params;
  const handleStart = useCallback(
    (bulletId, screen) => {
      console.log({ bulletId });
      if (soundEffect) {
        startSoundEle.play();
      }
    },
    [soundEffect]
  );
  const handleEnd = useCallback(
    (bulletId, screen) => {
      console.log({ bulletId });
      if (soundEffect) {
        endSoundEle.play();
      }
    },
    [soundEffect]
  );

  useEffect(() => {
    if (!currScreen) {
      currScreen = new BulletScreen('.screen');
    }
  }, [handleStart]);
  const handleInput = ({ target: { value } }) => {
    console.log(value);

    setBullet(value);
  };
  const toggleSendMocking = () => {
    console.log('handle mocking start', mocking);

    if (!mocking) {
      mockingInter = setInterval(() => {
        handleSend(Mock.Random.csentence(3, 28), {
          duration: Math.random() * 50
          // onStart: null,
          // onEnd: null
        });
      }, 500);
    } else {
      clearInterval(mockingInter);
    }
    toggleStates('mocking')();
  };
  const handleSend = (msg = '', opts = {}) => {
    console.log('current bullet', bullet);

    if (bullet || msg) {
      console.log('start send');
      let currHead = head === 'random' ? getRandomHead() : head;
      let currAnimteFun = animateFun === 'random' ? getRandomAniFun() : animateFun;
      let bgColor = theme === 'random' ? getRandomTheme() : theme;

      currScreen.push(
        <StyledBullet msg={bullet || msg} head={currHead} bgColor={bgColor} />,
        Object.assign(
          {
            onStart: handleStart,
            onEnd: handleEnd,
            loopCount: isInfinite ? 'infinite' : loopCount,
            animateTimeFun: currAnimteFun,
            duration
          },
          opts
        )
      );
      if (bullet) {
        setBullet('');
      }
    }
  };

  return (
    <StyledWrapper>
      <Suspense fallback={<Loading />}>
        <GithubLink />
      </Suspense>
      <BulletsScreen screen={currScreen} />

      <Suspense fallback={<Loading />}>
        <div className="opts">
          <Popper anchorEl={popperAnchorEl.current} open={open} placement="top-start">
            <ParamsPanel
              {...params}
              isInfinite={isInfinite}
              soundEffect={soundEffect}
              handleChange={handleChange}
              toggleStates={toggleStates}
            />
          </Popper>
          <Suspense fallback={<Loading />}>
            <OptsArea
              bullet={bullet}
              mocking={mocking}
              open={open}
              toggleStates={toggleStates}
              popperAnchorEl={popperAnchorEl}
              handleMocking={toggleSendMocking}
              handleInput={handleInput}
              handleSend={handleSend}
            />
          </Suspense>
        </div>
      </Suspense>
    </StyledWrapper>
  );
}
