const heads = [
  {
    title: '奥特曼',
    path: 'assets/img/heads/aotuman.jpg'
  },
  {
    title: '熊孩子',
    path: 'assets/img/heads/bear.jpg'
  },
  {
    title: '卡通女孩',
    path: 'assets/img/heads/carton.girl.jpg'
  },
  {
    title: '卡通男孩',
    path: 'assets/img/heads/carton.jpg'
  },
  {
    title: 'QQ头像',
    path: 'assets/img/heads/carton2.jpg'
  },
  {
    title: '猫咪',
    path: 'assets/img/heads/cat.jpg'
  },
  {
    title: '小老弟',
    path: 'assets/img/heads/dog.jpg'
  },
  {
    title: '可爱',
    path: 'assets/img/heads/girl.jpg'
  },
  {
    title: '蜡笔小新',
    path: 'assets/img/heads/xiaoxin.jpg'
  },
  {
    title: '动图',
    path: 'assets/img/heads/xiongmao.jpg'
  },
  {
    title: '美女',
    path: 'assets/img/heads/nv.jpg'
  },
  {
    title: '气质美女',
    path: 'assets/img/heads/nv2.jpg'
  },
  {
    title: '动图',
    path: 'assets/img/heads/xiongmao.gif'
  }
];

const themes = [
  {
    title: '莹白',
    color: 'rgb(22,22,2)',
    bgColor: 'rgba(227,249,253,.8)'
  },
  {
    title: '茶白',
    color: 'rgb(22,22,2)',
    bgColor: 'rgba(243,249,241,.8)'
  },
  {
    title: '蔚蓝',
    color: 'rgb(22,22,2)',
    bgColor: 'rgba(112,243,255,.9)'
  },
  {
    title: '紫色',
    color: 'rgb(233, 241, 246)',
    bgColor: 'rgba(141,75,187,.8)'
  },
  {
    title: '粉色',
    color: 'rgb(22,22,2)',
    bgColor: 'rgba(255,179,167,.8)'
  },
  {
    title: '胭脂色',
    color: 'rgb(233, 241, 246)',
    bgColor: 'rgba(157,41,51,.8)'
  },
  {
    title: '彤色',
    color: 'rgb(233, 241, 246)',
    bgColor: 'rgba(243,83,54,.8)'
  },
  {
    title: '殷红',
    color: 'rgb(233, 241, 246)',
    bgColor: 'rgba(190,0,47,.8)'
  }
];

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
  'cubic-bezier(0.2,0.4,0.8,2)': {
    title: 'cubic-bezier'
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
const getRandomHead = () => {
  return heads[Math.floor(Math.random() * heads.length)].path;
};
const getRandomTheme = () => {
  return themes[Math.floor(Math.random() * themes.length)].bgColor;
};
export { getRandomTheme, themes, animateFuns, getRandomAniFun, heads, getRandomHead };
