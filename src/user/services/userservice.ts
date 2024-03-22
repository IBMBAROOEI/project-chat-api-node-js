import { User } from '../entity/User';
import { AppDataSource } from '../../data-source';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserInput } from '../interface/userinputinterface';

// const userRepository: Repository<User> = AppDataSource.getRepository(User);





export const generatetoken = (user: User): string => {
  const payload = { sub: user._id };
  return jwt.sign(payload, "secret", { expiresIn: "500h" });
};



export class UserService {


  public async getuser(id: string): Promise<User | null> {


    const user = await AppDataSource.getMongoRepository(User).findOne
      ({ where: { _id: new ObjectId(id) } });

    return user;
  }


  public async register(userInput: UserInput)
    : Promise<{ user: User, token: string }> {
    const hashedPassword = await bcrypt.hash(userInput.password, 10);
    const newUser = AppDataSource.getMongoRepository(User).create({
      email: userInput.email,
      password: hashedPassword
    });
    await AppDataSource.getMongoRepository(User).save(newUser);

    const token = generatetoken(newUser);


    return { user: newUser, token };

  }



  public async login(userInput: UserInput)
    : Promise<{ user: User, token: string } | null | undefined> {

    try {
      const { email, password } = userInput;
      const user = await AppDataSource.getMongoRepository(User).findOne({ where: { email } });

      if (!user) {
        return null;
      }
      const check = await bcrypt.compare(password,user.password);

      if (!check) {
        console.log("Incorrect password");
        return null;
      }
      const token = generatetoken(user);
      return { user, token };

    } catch (error) {

      console.log(error)
    }

  }
}
