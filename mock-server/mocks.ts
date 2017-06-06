import { MockList } from 'graphql-tools';
import * as faker from 'faker';

export const mocks = {
  Query: () => ({
    channelsByUser: () => new MockList([3, 15]),
  }),
  User : () => ({
    name : () => faker.name.firstName() + ' ' + faker.name.lastName(),
    avatar : () => faker.image.avatar(),
  }),
  Channel: () => ({
    title: faker.random.word(),
    direct: faker.random.boolean(),
    unseenMessages: faker.random.boolean() ? faker.random.number(30) : 0,
  }),

};
