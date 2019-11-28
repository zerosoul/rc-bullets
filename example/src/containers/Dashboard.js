import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Mock from 'mockjs';
// import { Link } from 'react-router-dom';
import BulletScreen, { StyledBullet } from 'rc-bullets';
import {
  Button,
  InputLabel,
  TextField,
  Select,
  MenuItem,
  Popper,
  IconButton,
  Paper,
  Grid,
  Avatar,
  Tooltip,
  FormControlLabel,
  Checkbox
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Settings, Close, Send, PlayCircleFilled, PauseCircleFilled } from '@material-ui/icons';
import BulletsScreen from './Screen';
import {
  getRandomTheme,
  themes,
  animateFuns,
  getRandomAniFun,
  heads,
  getRandomHead
} from '../helper';
import GithubLink from '../components/GithubLink';
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    marginBottom: theme.spacing(3)
  }
}));
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
let mockingInter = 0;
export default function Dashboard() {
  const [currScreen, setCurrScreen] = useState(null);
  const [mocking, setMocking] = useState(false);
  const [bullet, setBullet] = useState('');
  const [theme, setTheme] = useState('random');
  const [animateFun, setAnimateFun] = useState('random');
  const [duration, setDuration] = useState(20);
  const [loopCount, setLoopCount] = useState(3);
  const [isInfinite, setIsInfinite] = useState(false);
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
  const handleMocking = () => {
    if (mocking) {
      clearInterval(mockingInter);
    } else {
      mockingInter = setInterval(() => {
        let currThemeKey = getRandomTheme();
        let { color, bgColor } = themes[currThemeKey];
        currScreen.push(
          <StyledBullet
            color={color}
            bgColor={bgColor}
            head={getRandomHead()}
            msg={Mock.Random.csentence(3, 28)}
          />,
          {
            duration: Math.random() * 50
          }
        );
      }, 500);
    }
    setMocking(prev => !prev);
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
        loopCount: isInfinite ? 'infinite' : loopCount,
        animateTimeFun: currAnimateKey,
        txt: bullet,
        duration,
        head: currImg,
        color,
        bgColor,
        ts: new Date().getTime()
      };
      console.log({ obj });

      const { txt, head, ...opts } = obj;
      currScreen.push(<StyledBullet msg={txt} head={head} color={color} bgColor={bgColor} />, {
        ...opts
      });
      // currScreen.push({ msg: txt, head: newImg }, { ...opts });
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

  const handleLoopCountChange = ({ target: { value } }) => {
    console.log({ value });

    setLoopCount(value);
  };
  const handleInfiniteChange = ({ target: { value } }) => {
    console.log({ value });

    setIsInfinite(prev => !prev);
  };

  return (
    <StyledWrapper>
      <GithubLink />
      <BulletsScreen screen={currScreen} />
      {/* <Link className="demo" target="_blank" to="/preview">
        preview
      </Link> */}
      <div className="opts">
        <Popper anchorEl={popperAnchorEl.current} open={paramsOpen} placement="top-start">
          <Paper className={classes.root}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
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
                        <Avatar src={path} alt={title} />
                      </MenuItem>
                    );
                  })}
                </Select>
              </Grid>
              <Grid item xs={6}>
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
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6}>
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
              <Grid item xs={6}>
                <TextField
                  InputProps={{
                    inputProps: { min: 1 }
                  }}
                  label="时长/秒"
                  type="number"
                  value={duration}
                  onChange={handleDurChange}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  disabled={isInfinite}
                  InputProps={{
                    inputProps: { min: 1 }
                  }}
                  label="循环次数"
                  type="number"
                  value={isInfinite ? 9999 : loopCount}
                  onChange={handleLoopCountChange}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isInfinite}
                      onChange={handleInfiniteChange}
                      value="infinite"
                      color="secondary"
                    />
                  }
                  label="无限循环"
                />
              </Grid>
            </Grid>
          </Paper>
        </Popper>
        <Grid container spacing={2} alignItems="center" justify="center">
          <Grid item>
            <Tooltip placement="bottom" title={mocking ? '停止模拟' : '开始模拟'} arrow>
              <IconButton onClick={handleMocking}>
                {mocking ? (
                  <PauseCircleFilled color="primary" />
                ) : (
                  <PlayCircleFilled color="primary" />
                )}
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item>
            <Tooltip placement="bottom" title={paramsOpen ? '关闭设置' : '设置'} arrow>
              <IconButton ref={popperAnchorEl} onClick={togglePopper}>
                {paramsOpen ? <Close color="primary" /> : <Settings color="primary" />}
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item xs={6}>
            <TextField
              value={bullet}
              label="弹幕内容"
              fullWidth
              multiline
              placeholder="请输入内容"
              variant="outlined"
              onChange={handleInput}
            />
          </Grid>
          <Grid item>
            <Button endIcon={<Send />} variant="contained" color="primary" onClick={handleSend}>
              发送
            </Button>
          </Grid>
        </Grid>
      </div>
    </StyledWrapper>
  );
}
