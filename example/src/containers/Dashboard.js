import React, { useState } from 'react';
import styled from 'styled-components';
import { getRandomTheme, themes, animateFuns } from '../helper';
import Img1 from '../assets/img/avator.jpg';

const StyledWrapper = styled.section`
  position: relative;
  height: 100vh;
  padding: 2rem 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  .input,
  .sendBtn,
  .dur,
  .img {
    border-radius: 0.5rem;
    border: 1px solid #333;
  }
  .input,
  .dur,
  .img {
    padding: 0.5rem 0.8rem;
    margin-bottom: 2rem;
  }
  .sendBtn {
    cursor: pointer;
    text-transform: uppercase;
    color: #fff;
    background: rgba(2, 2, 2, 0.4);
    font-size: 1.5rem;
    font-weight: bold;
    padding: 0.4rem 0.6rem;
    border: 2px solid #fff;
  }
  .demo {
    text-transform: uppercase;
    padding: 4px 8px;
    font-size: 1.5rem;
    font-weight: 800;
    position: absolute;
    top: 5px;
    right: 5px;
  }
`;

export default function Dashboard() {
  const [bullet, setBullet] = useState('');
  const [theme, setTheme] = useState('random');
  const [animateFun, setAnimateFun] = useState('linear');
  const [duration, setDuration] = useState(20);
  const [img, setImg] = useState('');
  const handleInput = ({ target: { value } }) => {
    console.log(value);

    setBullet(value);
  };
  const handleSend = () => {
    console.log('current bullet', bullet);

    if (bullet) {
      console.log('start send');

      let currThemeKey = theme == 'random' ? getRandomTheme() : theme;
      let { color, bgColor } = themes[currThemeKey];
      let newV = JSON.stringify({
        animateTimeFun: animateFun,
        txt: bullet,
        duration,
        img,
        color,
        bgColor,
        ts: new Date().getTime()
      });
      console.log({ newV });

      localStorage.setItem('BULLET', newV);
      setBullet('');
    }
  };
  const handleImgSelect = ({ target: { value } }) => {
    console.log({ value });
    setImg(value);
  };
  const handleThemeSelect = ({ target: { value } }) => {
    console.log({ value });

    setTheme(value);
  };
  const handleAnimateFunSelect = ({ target: { value } }) => {
    console.log({ value });

    setAnimateFun(value);
  };

  const handleDurChange = ({ target: { value } }) => {
    console.log({ value });
    setDuration(value);
  };

  return (
    <StyledWrapper>
      <a className="demo" target="_blank" href="preview">
        preview
      </a>
      <select className="img" value={img} onChange={handleImgSelect}>
        <option value="">select head image</option>
        <option value={Img1}>girl</option>
        <option
          value={
            'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K'
          }
        >
          react
        </option>
      </select>
      <select className="theme" value={theme} onChange={handleThemeSelect}>
        <option value="random">random theme</option>
        {Object.keys(themes).map(key => {
          return (
            <option key={key} value={key}>
              {key}
            </option>
          );
        })}
      </select>
      <select className="animateFun" value={animateFun} onChange={handleAnimateFunSelect}>
        {animateFuns.map(fun => {
          return (
            <option key={fun} value={fun}>
              {fun}
            </option>
          );
        })}
      </select>
      <input
        className="dur"
        value={duration}
        onChange={handleDurChange}
        type="number"
        placeholder="duration"
      />
      <textarea
        rows="4"
        className="input"
        value={bullet}
        onChange={handleInput}
        placeholder="input bullet"
      />
      <button className="sendBtn" onClick={handleSend}>
        send
      </button>
    </StyledWrapper>
  );
}
