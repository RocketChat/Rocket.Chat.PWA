import AccountsServer from '@accounts/server';
import MongoAdapter from '@accounts/mongo';
import * as faker from 'faker';
import { getMongoClient } from './db';


const initUsers = () => {
  const users = [{ username: 'eitan', password: 'eitan' }, {
    username: 'Eitan',
    password: 'Eitan'
  }, { username: 'tomer', password: 'tomer' }];

  users.map(async (userData) => {
    const { username, password } = userData;
    const user = await AccountsServer.findUserByUsername(username);
    if (!user) {
      AccountsServer.createUser({
        username,
        password,
        profile: {
          avatar: faker.image.avatar(),
          name: username + ' ' + username,
        }
      });
    }
  });
};

export const initAccounts = async () => {
  let mongoAdapter = null;
  try {
    mongoAdapter = await getMongoClient().then(db => new MongoAdapter(db));
  }
  catch (e) {
    console.error('Failed connecting to the mongoDb ', e);
    return;
  }
  AccountsServer.config({
    tokenConfigs: {
      accessToken: {
        expiresIn: '3d',
      },
      refreshToken: {
        expiresIn: '30d',
      },
    }
  }, mongoAdapter);

  initUsers();

  return AccountsServer;
};
