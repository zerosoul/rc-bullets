const themes = {
  yingbai: {
    color: 'rgb(22,22,2)',
    bgColor: 'rgba(227,249,253,.8)'
  },
  chabai: {
    color: 'rgb(22,22,2)',
    bgColor: 'rgba(243,249,241,.8)'
  },
  weilan: {
    color: 'rgb(22,22,2)',
    bgColor: 'rgba(112,243,255,.9)'
  },
  zise: {
    color: 'rgb(233, 241, 246)',
    bgColor: 'rgba(141,75,187,.8)'
  },
  fense: {
    color: 'rgb(22,22,2)',
    bgColor: 'rgba(255,179,167,.8)'
  },
  yanzhi: {
    color: 'rgb(233, 241, 246)',
    bgColor: 'rgba(157,41,51,.8)'
  },
  tong: {
    color: 'rgb(233, 241, 246)',
    bgColor: 'rgba(243,83,54,.8)'
  },
  yinhong: {
    color: 'rgb(233, 241, 246)',
    bgColor: 'rgba(190,0,47,.8)'
  }
};
const getRandomTheme = () => {
  const keys = Object.keys(themes);
  let tmpKey = keys[Math.floor(Math.random() * keys.length)];
  return tmpKey;
};

const animateFuns = {
  linear: {
    title: '匀速'
  },
  ease: {
    title: '慢-快-慢'
  },
  'ease-out': {
    title: '快-慢'
  },
  'ease-in': {
    title: '慢-快'
  },
  'cubic-bezier(0.2,-2,0.8,2)': {
    titile: 'cubic-bezier'
  },
  'steps(10, end)': {
    title: '步进'
  }
};
const getRandomAniFun = () => {
  const keys = Object.keys(animateFuns);
  let tmpKey = keys[Math.floor(Math.random() * keys.length)];
  return tmpKey;
};
export { getRandomTheme, themes, animateFuns, getRandomAniFun };
