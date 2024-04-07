export const UPDATE_STORY_FAIL = '更新故事内容失败';
export const UPDATE_TEXT_FAIL = '更新文本内容失败';
export const CREATE_REPEAT_TITLE = '已经存在相同命令的表情，你需要换个标题';
export const UPDATE_ADDITIONAL_FAIL = '更新故事附加文本失败';
export const UPDATE_GIF_FAIL = '更新动图内容失败';
export const GET_FEATURE_FAIL = '获取 Feature 失败';

export const COMMAND_LIST = [
  'special', // 彩蛋菜单
  'help', // 帮助指令
  'image', // 图片菜单
  'release', // 最近版本发布changelog
  '*', // 随机内容
  '中秋',
  'gif'
];

// 按照拼音顺序排列，避免重复添加
const ROLER = [
  '23333',
  'RD', 'FE', 'PM', 'QA',
  '吃瓜群众',
  '打工人', '大伙', '大家', '大佬',
  '干饭人', '工具人', '瓜娃子',
  '韭菜',
  '某同学', '年轻人',
  '气氛组',
  '我滴乖乖', '小可爱', '兄弟们',
  '一起爬山？', '绝绝子'
];

export const getRole = () => {
  return ROLER[Math.floor(Math.random() * ROLER.length)];
};
