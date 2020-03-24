
import { User } from '@/models';

class UserService {
  async search() {
    return User.find();
  }
}

export default new UserService();

