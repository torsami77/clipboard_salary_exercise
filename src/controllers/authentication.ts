import { Request, Response }  from "express";
import {
    status, messages, successResponse, errorResponse, 
    conflictResponse, Jwt, bcrypt, user_list
} from '../utils/index';

export default class Account_Controller {
    static async sign_up (req: Request, res: Response){
        try {
            const { username } = req.body;
            const userExits = user_list.find((user) => {
                return user.username == req.body.username;
            })
            if (userExits) {
              return conflictResponse(res, status.conflict, messages.sign_up.conflict);
            }
            const password = bcrypt.hashPassword(req.body.password);
            const id = user_list.length + 1;
            user_list.push({
                id,
                username,
                password,
            })
            const token = await Jwt.generateToken({ id, username });
            return successResponse(res, status.created, messages.sign_up.success, {id, username, token});
        } catch(error){
            return errorResponse(res, status.error, messages.sign_up.error);
        }
    }

    static async sign_in (req: Request, res: Response){
        try {
            const { username, password } = req.body;
            const user: any = user_list.find((user) => {
                console.log(user.username, req.body.username)
                return user.username == req.body.username;
            })
            if (!user) {
              return errorResponse(res, status.unauthorized, messages.sign_in.invalid);
            }
            const isPasswordValid = await bcrypt.comparePassword(user.password, password);
            if (!isPasswordValid) {
              return errorResponse(res, status.unauthorized, messages.sign_in.invalid);
            }
            const { id } = user;
            const token = await Jwt.generateToken({ id, username });
            return successResponse(res, status.success, messages.sign_in.success, {id, username, token});
          } catch (error) {
            console.log(error)
            return errorResponse(res, status.error, messages.sign_in.error);
          }
    }
}