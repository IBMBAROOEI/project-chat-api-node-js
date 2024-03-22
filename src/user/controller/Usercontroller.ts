import { Request, Response } from 'express';
import { UserService } from '../services/userservice';
import { User } from '../entity/User';
import { Repository } from 'typeorm';
import { validateRigister } from '../validate/validate'
import { validationResult } from "express-validator";

import { AppDataSource } from '../../data-source';
import { UserInput } from '../interface/userinputinterface';

const userService = new UserService();


export class Usercontroller {



  public async login(req: Request, res: Response): Promise<void> {
    const errors = validationResult(req);


    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() })
    }

    else {
      try {
        const userInput: UserInput = req.body;
        const data = await  AppDataSource.getRepository(User).findOne({ where: { email: userInput.email } });
        if (!data) {
          res.status(400).send({ success: false, message: "user register" });
        }
        else {
          const result = await userService.login(userInput);


          if (result && result !== null && result !== undefined) {
            const { user, token } = result;

            user.password = '';
            res.status(200).json({ success: true, data, token: token })

          } else {
            res.status(401).send({ success: false, message: "password incorect" })

          }
        }

      } catch (error) {

        console.log(error);
        res.status(500).send({ success: false, message: "Registration failed" });

      }

    }

  }



  public async registers(req: Request, res: Response): Promise<void> {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() })
    }

    else {
      const userInput: UserInput = req.body;

      try {
        const emailExist = await  AppDataSource.getRepository(User).findOne({ where: { email: userInput.email } });

        if (!emailExist) {
          const { user: data, token } = await userService.register(userInput);

          data.password = '';
          res.status(201).json({ success: true, data, token: token })
        } else {


          res.status(400).send({ success: false, message: "email already exists" });

        }
      } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: "Registration failed" });
      }
    }



  }


  public async profile(req: Request, res: Response): Promise<void> {


    try {
      const user = await userService.getuser(req.params.id);
      res.status(201).json({ success: true, data: user })

    } catch (error) {
      console.log(error);
      res.status(500).send({ success: false, message: "failed" });

    }
  }


}


