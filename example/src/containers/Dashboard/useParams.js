import { useState } from 'react';

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
    console.log('prev state', states[prop]);

    let newState = !states[prop];
    setStates(prev => {
      console.log('states prev', prev);
      console.log('new state', newState);

      return { ...prev, [prop]: newState };
    });
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
