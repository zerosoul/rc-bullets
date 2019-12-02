import React from 'react';
import {
  InputLabel,
  TextField,
  Select,
  MenuItem,
  Paper,
  Grid,
  Avatar,
  FormControlLabel,
  Checkbox
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { themes, heads, animateFuns } from '../../helper';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    marginBottom: theme.spacing(3)
  }
}));
export default function ParamsPanel({
  handleChange,
  toggleStates,
  head,
  theme,
  duration,
  loopCount,
  animateFun,
  isInfinite,
  soundEffect
}) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <InputLabel shrink id="img-label">
            头像
          </InputLabel>
          <Select labelId="img-label" value={head} onChange={handleChange('head')}>
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

          <Select labelId="theme-label" value={theme} onChange={handleChange('theme')}>
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

          <Select labelId="animate-fun" value={animateFun} onChange={handleChange('animateFun')}>
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
            onChange={handleChange('duration')}
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
            onChange={handleChange('loopCount')}
          />
        </Grid>
        <Grid item xs={6}>
          <FormControlLabel
            control={
              <Checkbox
                checked={isInfinite}
                onChange={toggleStates('isInfinite')}
                value="infinite"
                color="secondary"
              />
            }
            label="无限循环"
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormControlLabel
            control={
              <Checkbox
                checked={soundEffect}
                onChange={toggleStates('soundEffect')}
                value="soundEffect"
                color="secondary"
              />
            }
            label="开启音效"
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
