import { DataTypes } from 'sequelize';
import { getDatabaseContext } from '../database';

const sequelize = getDatabaseContext();

const Post = sequelize.define('Post', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    unique: true
  },
  content: DataTypes.TEXT
});

void (async () => {
  await sequelize.sync({ force: true });
  // Code here
})();

export default Post;
