import { run } from './query.js';
import { STORY_TABLE } from './constant.js';

const insertStoryTable = (options, ctx) => {
  const { mid, name, md5, type, feature = '' } = options;
  const sql = `INSERT INTO ${STORY_TABLE} (mid, name, md5, type, feature)
    VALUES (:mid, :name, :md5, :type, :feature);`;

  try {
    run(
      sql,
      {
        ':mid': mid,
        ':name': name,
        ':md5': md5,
        ':type': type,
        ':feature': feature,
      },
      ctx,
    );
    return { error: false, data: mid };
  } catch (error) {
    return { error: true, data: error.toString() };
  }
};

const updateName = (options, ctx) => {
  const { mid, name } = options;
  const sql = `UPDATE ${STORY_TABLE} SET name = :name WHERE mid = :mid;`;

  try {
    run(sql, { ':name': name, ':mid': mid }, ctx);
  } catch (error) {
    return error.toString();
  }
};

export {
  insertStoryTable,
  updateName,
};
