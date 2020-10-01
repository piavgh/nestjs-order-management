import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { CallbackFunction } from '../types/callbackFunction.type';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
    constructor(private configService: ConfigService) {}

    use(req: Request, res: Response, next: CallbackFunction) {
        const authorizationHeader = req.get('Authorization');

        // Check if Authorization header contains a fixed token which is defined in env
        if (!authorizationHeader || authorizationHeader.replace('Bearer ', '') !== this.configService.get('AUTHENTICATION_TOKEN')) {
            throw new HttpException('Permission Denied', HttpStatus.UNAUTHORIZED);
        }

        next();
    }
}
