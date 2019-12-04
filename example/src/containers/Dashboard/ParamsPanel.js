import React from 'react';
import {
  InputLabel,
  TextField,
  Select,
  MenuItem,
  Avatar,
  List,
  ListItem,
  FormControlLabel,
  Checkbox,
  SwipeableDrawer
} from '@material-ui/core';
import { themes, heads, animateFuns } from '../../helper';
export default function ParamsPanel({
  open,
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
  return (
    <SwipeableDrawer
      onOpen={() => {
        console.log('open drawer');
      }}
      onClose={toggleStates('open')}
      open={open}
    >
      <List>
        <ListItem>
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
        </ListItem>
        <ListItem>
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
        </ListItem>
        <ListItem>
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
        </ListItem>
        <ListItem>
          <TextField
            InputProps={{
              inputProps: { min: 1 }
            }}
            label="时长/秒"
            type="number"
            value={duration}
            onChange={handleChange('duration')}
          />
        </ListItem>
        <ListItem>
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
        </ListItem>
        <ListItem>
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
        </ListItem>
        <ListItem>
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
        </ListItem>
      </List>
    </SwipeableDrawer>
  );
}
