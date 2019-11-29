import React from 'react';
import { Button, TextField, Grid, Tooltip, Fab } from '@material-ui/core';
import { Settings, Close, Send, PlayCircleFilled, PauseCircleFilled } from '@material-ui/icons';
export default function OptsArea({
  popperAnchorEl,
  handleMocking,
  handleInput,
  handleSend,
  bullet,
  mocking,
  toggleStates,
  open
}) {
  return (
    <Grid container spacing={2} alignItems="center" justify="center">
      <Grid item>
        <Tooltip placement="bottom" title={mocking ? '停止模拟' : '开始模拟'} arrow>
          <Fab size="small" color="primary" onClick={handleMocking}>
            {mocking ? <PauseCircleFilled /> : <PlayCircleFilled />}
          </Fab>
        </Tooltip>
      </Grid>
      <Grid item>
        <Tooltip placement="bottom" title={open ? '关闭设置' : '设置'} arrow>
          <Fab size="small" color="primary" ref={popperAnchorEl} onClick={toggleStates('open')}>
            {open ? <Close /> : <Settings />}
          </Fab>
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
  );
}
