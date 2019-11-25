import { useEffect, useState } from 'react';
import BulletScreen from './BulletScreen';

function useBulletScreen(ele) {
  const [screen, setScreen] = useState(null);
  const [bullets, setBullets] = useState([]);
  useEffect(() => {
    let tmp = new BulletScreen(ele);
    setScreen(tmp);
  }, [ele]);
  const sendBullet = (bullet, opts = {}) => {
    let curr = screen.push(bullet, opts);
    setBullets(prev => {
      prev.push(curr);
    });
  };
  const pause = () => {
    screen.pause();
  };
  const resume = () => {
    screen.resume();
  };
  const hide = () => {
    screen.hide();
  };
  const show = () => {
    screen.show();
  };
  const reset = () => {
    setBullets([]);
    screen.clear();
  };
  return { screen, sendBullet, count: bullets.length, pause, resume, reset, hide, show };
}

export default useBulletScreen;
