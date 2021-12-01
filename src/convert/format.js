const formatMenu = (data, title = '常用菜单') => {
  const list = data.map(item => {
    return `- ${item}`;
  });
  const menu = `#### ${title}：\n` + list.join('\n');
  return menu;
};

const warns = [
  '%u6211%u8BF4%u5927%u54E5%u4F60%u5343%u4E07%u4E0D%u8981%u80E1%u6765%u554A',
  '%u522B%u8FD9%u6837%uFF0C%u5F88%u591A%u4EBA%u770B%u7740%u5462',
  '%u6211%u4EEC%u4E0D%u80FD%u8FD9%u6837%u505A%u7684%uFF0C%u4E0D%u53EF%u4EE5',
  '%u5F53%u524D%u6CA1%u6709%u8FD9%u4E2A%u6307%u4EE4%uFF0C%u770B%u770B%u83DC%u5355',
  '%u5BF9%u4E0D%u8D77%uFF0C%u6211%u8FD8%u6CA1%u6709%u51C6%u5907%u597D%u6765%u89C1%u4F60',
  '%u5BF9%u4E0D%u8D77%uFF0C%u8FD9%u662F%u4E00%u4E2A%u65E0%u6548%u7684%u6307%u4EE4%u3002',
  '%u8FD9%u4E2A%u672C%u9886%u6211%u8FD8%u6CA1%u6709%u5B66%u4F1A%uFF0C%u8BF7%u7ED9%u6211%u70B9%u65F6%u95F4',
  '%u6211%u8FD8%u4E0D%u80FD%u8FD9%u6837%u505A',
  '%u5F88%u62B1%u6B49%uFF0C%u6211%u8FD8%u6CA1%u6709%u8FD9%u4E2A%u6280%u80FD',
  '%u8D81%u6211%u8FD8%u5E74%u8F7B%uFF0C%u6211%u4F1A%u52AA%u529B%u7684'
];

const formatNull = (messages = warns) => {
  const index = Math.floor(Math.random() * messages.length);
  return unescape(messages[index]);
};

const errors = [
  '%u5947%u602A%u7684%u4E8B%u60C5%u53D1%u751F%u4E86%uFF01%u6211%u521A%u521A%u8DDF%u4E3B%u5B50%u8BF4%uFF1A%u201C%u6211%u7684%u5DF4%u638C%u5F88%u9002%u5408%u4F60%u7684%u8138%u201D',
  '%u7CDF%u7CD5%uFF0C%u6211%u51FA%u73B0%u4E86%u4E00%u70B9%u5C0F%u6BDB%u75C5%uFF01%u54B1%u4EEC%u5148%u8BD5%u8BD5%u5176%u5B83%u7684%u547D%u4EE4',
  '%u4E00%u5B9A%u662F%u6211%u592A%u997F%u4E86%uFF0C%u6211%u9700%u8981%u505C%u4E0B%u6765%u68C0%u67E5%u4E00%u4E0B',
  '%u4E0D%u767B%u9AD8%u5C71%uFF0C%u4E0D%u77E5%u5929%u4E4B%u9AD8%u4E5F',
  '%u522B%u8DDF%u4E3B%u5B50%u8BF4%uFF0C%u5426%u5219%u6211%u53C8%u5F97%u5173%u7981%u95ED%u5566',
  '%u6628%u5929%u548C%u4E3B%u5B50%u559D%u9178%u5976%uFF0C%u8FDE%u9178%u5976%u76D6%u90FD%u4E0D%u7ED9%u6211%uFF0C%u7F62%u5DE5%u7F62%u5DE5',
  '%u563F%uFF0C%u5343%u4E07%u4E0D%u8981%u544A%u8BC9%u72D7...%u4E3B%u5B50%uFF0C%u5426%u5219%u53C8%u8981%u6328%u63CD%u4E86',
  '%u771F%u62B1%u6B49%uFF0C%u6709%u4E9B%u4E0D%u592A%u6B63%u5E38%uFF0C%u6211%u5FC3%u91CC%u4E94%u5473%u6742%u9648%uFF0C%u9700%u8981%u597D%u597D%u53CD%u601D%u81EA%u5DF1'
];

const formatError = () => {
  return formatNull(errors);
};

const formatHelp = () => {
  const list = [
    '#### 我是一个<font color="red"> 斗图 </font>智障机器人',
    '- 菜单：`@imeme`，查询命令列表',
    '- 使用：`@imeme 命令`，获取原始表情',
    '- 文字：`@imeme 命令 文字`，返回拼接文字的表情',
    '- 参数：`@imeme 命令 参数 文字`，返回按照参数定制的拼接文字表情'
  ];
  return list.join('\n');
};

export {
  formatMenu,
  formatNull,
  formatHelp,
  formatError
};
