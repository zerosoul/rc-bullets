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

const animateFuns = [
  'linear',
  'ease',
  'ease-in-out',
  'ease-out',
  'ease-in',
  'cubic-bezier(0.2,-2,0.8,2)',
  'steps(10, end)'
];
export { getRandomTheme, themes, animateFuns };
