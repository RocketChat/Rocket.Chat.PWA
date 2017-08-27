import { DefaultAvatarPipe } from './default-avatar.pipe';

describe('DefaultAvatarPipe', () => {
  it('create an instance', () => {
    const pipe = new DefaultAvatarPipe();
    expect(pipe).toBeTruthy();
  });
});
