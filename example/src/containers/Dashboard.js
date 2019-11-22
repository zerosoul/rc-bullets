import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
// import { Link } from 'react-router-dom';
import BulletScreen from 'rc-bullets';
import {
  Button,
  InputLabel,
  TextField,
  Select,
  MenuItem,
  Popper,
  IconButton,
  Paper,
  Grid
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Settings } from '@material-ui/icons';
import BulletsScreen from './Screen';
import {
  getRandomTheme,
  themes,
  animateFuns,
  getRandomAniFun,
  heads,
  getRandomHead
} from '../helper';
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    marginBottom: theme.spacing(2)
  }
}));
const StyledWrapper = styled.section`
  .opts {
    z-index: 999;
    position: fixed;
    width: 100%;
    bottom: 0;
    background: rgba(2, 2, 2, 0.2);
    padding: 1rem 0;
    .demo {
      text-transform: uppercase;
      padding: 4px 8px;
      font-size: 1.5rem;
      font-weight: 800;
      position: absolute;
      top: 5px;
      right: 5px;
    }
  }
`;
const StyledAvator = styled.img`
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 50%;
  border: 1px solid #fff;
`;
export default function Dashboard() {
  const [currScreen, setCurrScreen] = useState(null);
  const [bullet, setBullet] = useState('');
  const [theme, setTheme] = useState('random');
  const [animateFun, setAnimateFun] = useState('random');
  const [duration, setDuration] = useState(20);
  const [img, setImg] = useState('random');
  const [paramsOpen, setParamsOpen] = useState(false);
  const popperAnchorEl = useRef(null);
  const classes = useStyles();
  const togglePopper = () => {
    setParamsOpen(prev => !prev);
  };
  useEffect(() => {
    let tmp = new BulletScreen('.screen');
    setCurrScreen(tmp);
  }, []);
  const handleInput = ({ target: { value } }) => {
    console.log(value);

    setBullet(value);
  };
  const handleSend = () => {
    console.log('current bullet', bullet);

    if (bullet) {
      console.log('start send');

      let currAnimateKey = animateFun === 'random' ? getRandomAniFun() : animateFun;
      let currThemeKey = theme === 'random' ? getRandomTheme() : theme;
      let currImg = img === 'random' ? getRandomHead() : img;
      let { color, bgColor } = themes[currThemeKey];
      let obj = {
        animateTimeFun: currAnimateKey,
        txt: bullet,
        duration,
        img: currImg,
        color,
        bgColor,
        ts: new Date().getTime()
      };
      console.log({ obj });

      const { txt, img: newImg, ...opts } = obj;
      // const newValue = img ? { msg: txt, img: newImg } : txt;
      currScreen.push({ msg: txt, img: newImg }, { ...opts });
      // send by localStorage
      let newV = JSON.stringify(obj);
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
      <BulletsScreen screen={currScreen} />
      {/* <Link className="demo" target="_blank" to="/preview">
        preview
      </Link> */}
      <div className="opts">
        <Popper anchorEl={popperAnchorEl.current} open={paramsOpen} placement="top-start">
          <Paper className={classes.root}>
            <Grid direction="column" container spacing={1}>
              <Grid item>
                <InputLabel shrink id="img-label">
                  头像
                </InputLabel>
                <Select labelId="img-label" value={img} onChange={handleImgSelect}>
                  <MenuItem value="random">
                    <em>随机</em>
                  </MenuItem>
                  {heads.map(head => {
                    const { title, path } = head;
                    return (
                      <MenuItem key={path} value={path}>
                        <StyledAvator src={path} alt={title} />
                      </MenuItem>
                    );
                  })}
                </Select>
              </Grid>
              <Grid item>
                <InputLabel shrink id="theme-label">
                  主题色
                </InputLabel>

                <Select labelId="theme-label" value={theme} onChange={handleThemeSelect}>
                  <MenuItem value="random">
                    <em>随机</em>
                  </MenuItem>
                  {Object.keys(themes).map(key => {
                    return (
                      <MenuItem key={key} value={key}>
                        <span
                          style={{
                            width: '100%',
                            padding: '.2rem',
                            fontSize: '.6rem',
                            color: themes[key].color,
                            background: themes[key].bgColor
                          }}
                          title={themes[key].title}
                        >
                          {themes[key].title}
                        </span>
                      </MenuItem>
                    );
                  })}
                </Select>
              </Grid>
              <Grid item>
                <InputLabel shrink id="animate-fun-label">
                  运动函数
                </InputLabel>

                <Select labelId="animate-fun" value={animateFun} onChange={handleAnimateFunSelect}>
                  <MenuItem value="random">
                    <em>随机</em>
                  </MenuItem>
                  {Object.keys(animateFuns).map(key => {
                    return (
                      <MenuItem key={key} value={key}>
                        {animateFuns[key].title}
                      </MenuItem>
                    );
                  })}
                </Select>
              </Grid>
              <Grid item>
                <TextField
                  label="时长/秒"
                  type="number"
                  value={duration}
                  onChange={handleDurChange}
                />
              </Grid>
            </Grid>
          </Paper>
        </Popper>
        <Grid container spacing={2} alignItems="center" justify="center">
          <Grid item>
            <IconButton ref={popperAnchorEl} onClick={togglePopper}>
              <Settings color="secondary" />
            </IconButton>
          </Grid>
          <Grid item xs={6}>
            <TextField
              value={bullet}
              label="弹幕内容"
              fullWidth
              multiline
              placeholder="请输入弹幕内容"
              variant="outlined"
              onChange={handleInput}
            />
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" className="sendBtn" onClick={handleSend}>
              发送弹幕
            </Button>
          </Grid>
        </Grid>
      </div>
    </StyledWrapper>
  );
}
