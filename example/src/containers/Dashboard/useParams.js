import { useState } from 'react';
import {
  getRandomTheme,
  themes,
  animateFuns,
  getRandomAniFun,
  heads,
  getRandomHead
} from '../../helper';

const useParams = () => {
  const [params, setParams] = useState({
    head: 'random',
    theme: 'random',
    animateFun: 'random',
    duration: 20,
    loopCount: 3
  });
  const [states, setStates] = useState({
    mocking: false,
    isInfinite: false,
    open: false
  });
  const toggleStates = prop => () => {
    let newState = !states[prop];
    setStates({ ...states, [prop]: newState });
  };
  const handleChange = prop => event => {
    setParams({ ...params, [prop]: event.target.value });
  };
  return {
    params,
    states,
    toggleStates,
    handleChange
  };
};

export default useParams;
