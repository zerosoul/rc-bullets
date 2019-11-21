import React, { useEffect, useState } from 'react';

import BulletScreen from 'rc-bullets';
let Screen = null;
export default function ScreenPage() {
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    Screen = new BulletScreen('.screen');
    window.onstorage = function(e) {
      console.log(
        'The ' + e.key + ' key has been changed from ' + e.oldValue + ' to ' + e.newValue + '.'
      );
      try {
        const { txt, img = null, ...opts } = JSON.parse(e.newValue);
        const newValue = img ? { msg: txt, img } : txt;
        console.log({ newValue });

        if (newValue) {
          // Screen.push(<p>wtf</p>, { ...opts });
          Screen.push(newValue, { ...opts });
        }
      } catch {
        throw Error('parse json error');
      }
    };
    return () => {
      window.onstorage = null;
    };
  }, []);
  const handleAnimateState = () => {
    if (paused) {
      Screen.resume();
    } else {
      Screen.pause();
    }
    setPaused(!paused);
  };
  const handleClear = () => {
    Screen.clear();
  };
  const handleVisible = () => {
    if (visible) {
      Screen.hide();
    } else {
      Screen.show();
    }
    setVisible(!visible);
  };

  return (
    <>
      <button onClick={handleAnimateState}>{paused ? 'resume' : 'pause'}</button>
      <button onClick={handleClear}>clear</button>
      <button onClick={handleVisible}>{visible ? 'hide' : 'show'}</button>
      <section style={{ height: '60vh' }} className="screen"></section>
    </>
  );
}
