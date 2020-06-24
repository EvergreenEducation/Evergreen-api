import { User } from '@/models';

class UserService {
  async findOrCreate(auth0User, data = {}) {
    let user = await User.findOne({
      where: {
        email: auth0User.email,
        auth0_user_id: auth0User.sub,
      },
    });

    if (!user) {
      user = await User.create({
        email: auth0User.email,
        auth0_user_id: auth0User.sub,
        ...data,
      });
    }

    if (!auth0User.email_verified) {
      throw new Error('Your email has not verified.');
    }

    return user;
  }
}

export default new UserService();
