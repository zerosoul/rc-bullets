import React, { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import styled from 'styled-components';
import Mock from 'mockjs';
// import { Link } from 'react-router-dom';
import BulletScreen, { StyledBullet } from 'rc-bullets';
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

  const { params, states, toggleStates, handleChange } = useParams();
  const { mocking, isInfinite, open, soundEffect } = states;
  const { theme, loopCount, head, duration, animateFun } = params;
  const handleStart = useCallback(() => {
    if (soundEffect) {
      startSoundEle.play();
    }
  }, [soundEffect]);
  const handleEnd = useCallback(() => {
    if (soundEffect) {
      endSoundEle.play();
    }
  }, [soundEffect]);

  useEffect(() => {
    if (!currScreen) {
      currScreen = new BulletScreen('.screen');
      currScreen.push(
        <StyledBullet
          size="huge"
          head="assets/img/heads/girl.jpg"
          msg="欢迎体验rc-bullets弹幕功能~~"
        />,
        { duration: 40, top: '45%' }
      );
    }
  }, []);
  const handleInput = ({ target: { value } }) => {
    console.log(value);

    setBullet(value);
  };
  const toggleSendMocking = () => {
    console.log('handle mocking start', mocking);

    if (!mocking) {
      mockingInter = setInterval(() => {
        const randomTxt = Mock.Random.csentence(10, 12);
        handleSend(randomTxt, {
          // duration: Math.random() * 50
          // onStart: null,
          // onEnd: null
        });
      }, 500);
    } else {
      clearInterval(mockingInter);
    }
    toggleStates('mocking')();
  };
  const handleSend = (mssg = '', opts = {}) => {
    console.log('current bullet', bullet, mssg);

    if (bullet || mssg) {
      console.log('start send');
      let currHead = head === 'random' ? getRandomHead() : head;
      let currAnimteFun = animateFun === 'random' ? getRandomAniFun() : animateFun;
      let bgColor = theme === 'random' ? getRandomTheme() : theme;
      let newOpts = Object.assign(
        {
          onStart: handleStart,
          onEnd: handleEnd,
          loopCount: isInfinite ? 'infinite' : loopCount,
          animateTimeFun: currAnimteFun,
          duration
        },
        opts
      );
      console.log({ opts });

      // currScreen.push(bullet || mssg, newOpts);
      currScreen.push(
        <StyledBullet msg={bullet || mssg} head={currHead} backgroundColor={bgColor} />,
        newOpts
      );
      console.log({ mssg });

      if (!mssg) {
        setBullet('');
      }
    }
  };

  return (
    <>
      <ParamsPanel
        {...params}
        isInfinite={isInfinite}
        soundEffect={soundEffect}
        handleChange={handleChange}
        toggleStates={toggleStates}
        open={open}
      />
      <StyledWrapper>
        <Suspense fallback={<Loading />}>
          <GithubLink />
        </Suspense>
        <BulletsScreen screen={currScreen} />

        <Suspense fallback={<Loading />}>
          <div className="opts">
            <Suspense fallback={<Loading />}>
              <OptsArea
                bullet={bullet}
                mocking={mocking}
                toggleStates={toggleStates}
                handleMocking={toggleSendMocking}
                handleInput={handleInput}
                handleSend={handleSend.bind(this, '', {})}
              />
            </Suspense>
          </div>
        </Suspense>
      </StyledWrapper>
    </>
  );
}
