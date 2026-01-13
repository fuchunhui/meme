export const CREATE_REPEAT_NAME = '已经存在相同命令的表情，你需要换个名称哦';
export const CREATE_STORY_FAIL = '创建表情失败';
export const UPDATE_TEXT_FAIL = '更新文本内容失败';
export const UPDATE_GIF_FAIL = '更新动图内容失败';
export const UPDATE_IMAGE_FAIL = '更新图片表失败';
export const UPDATE_NAME_FAIL = '更新表情名称失败';

export const COMMAND_LIST = [
  'special', // 彩蛋菜单
  'help', // 帮助指令
  'image', // 图片菜单
  'release', // 最近版本发布changelog
  '*', // 随机内容
  'gif',
  'news' // 最近上新的内容
];

// 按照拼音顺序排列，避免重复添加
const ROLER = [
  '23333',
  'RD', 'FE', 'PM', 'QA',
  '吃瓜群众',
  '打工人', '大伙', '大家', '大佬',
  '干饭人', '工具人', '瓜娃子',
  '韭菜', '牛马', '吗喽',
  '某同学', '年轻人',
  '气氛组',
  '我滴乖乖', '小可爱', '兄弟们',
  '一起爬山？', '绝绝子'
];

export const getRole = () => {
  return ROLER[Math.floor(Math.random() * ROLER.length)];
};
