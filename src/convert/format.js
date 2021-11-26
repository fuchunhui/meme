const formatMenu = (data, title = '常用菜单') => {
  const list = data.map(item => {
    return `- ${item}`;
  });
  const menu = `### ${title}：\n` + list.join('\n');
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

const formatNull = () => {
  const index = Math.floor(Math.random() * warns.length);
  return unescape(warns[index]);
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
  formatHelp
};
