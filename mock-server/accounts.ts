import AccountsServer from '@accounts/server';
import {MongoClient } from 'mongodb';
import MongoAdapter from '@accounts/mongo';
import * as faker from 'faker';

const MONGO_URL = 'mongodb://localhost:27017/rocketchatMock';

const initUsers = () => {
  const users = [{username: 'eitan', password: 'eitan'},{username: 'Eitan', password: 'Eitan'}, {username: 'tomer', password: 'tomer'}];

  users.map(async (userData) => {
    const {username, password} = userData;
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
    mongoAdapter = await MongoClient.connect(MONGO_URL).then(db => new MongoAdapter(db));
  }
  catch (e) {
    console.log('Failed connecting to the mongoDb ', e);
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
