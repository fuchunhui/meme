/**
 * 检测文本中是否包含带有双引号包含的空格串，如【abc de "fg hijk"】
 * @param {*} value 检测值
 * @returns 匹配后的内容或者 null
 */
const matchText = value => {
  const pattern = /“.*\s+.*”$|".*\s+.*"$/g;
  const found = value.match(pattern);
  return found ? found[0] : null;
};

export {
  matchText
};
