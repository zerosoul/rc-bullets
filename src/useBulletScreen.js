import { useEffect, useState } from 'react';
import BulletScreen from './BulletScreen';
let screen = null;
function useBulletScreen(ele) {
  const [bullets, setBullets] = useState([]);
  useEffect(() => {
    screen = new BulletScreen(ele);
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
