import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';
import { SignInDTO } from '../dtos/sign-in.dto';

@Injectable()
export class SignInValidationMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const body = req.body;

    const signInRequestBody = new SignInDTO(body.username, body.password);

    const validations = await validate(signInRequestBody);

    if (validations.length) {
      throw new BadRequestException(
        validations.reduce((acc, curr) => {
          return [
            ...acc,
            ...Object.values(curr.constraints as Record<string, string>),
          ];
        }, []),
      );
    }

    next();
  }
}
