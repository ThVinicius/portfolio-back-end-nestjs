import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';
import { PrismaService } from '../database/prisma.service';
import { CreateProjectDTO } from '../project/dtos/create-project.dto';
import { filterBadges } from '../utils/filterBadges';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  async catch(
    exception: Prisma.PrismaClientKnownRequestError,
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const prisma = new PrismaService();

    switch (exception.code) {
      case 'P2002': {
        const target = exception.meta?.target as string[];

        const status = HttpStatus.CONFLICT;
        const sendMessage = `Conflito no campo: ${target[0]}`;

        response.status(status).json({
          statusCode: status,
          message: sendMessage,
        });
        break;
      }

      case 'P2025': {
        const allBadges = await prisma.badge.findMany();
        const requestBody = request.body as CreateProjectDTO;

        const requestBadges = requestBody.badges.filter(
          (badge) => typeof badge === 'string',
        ) as string[];

        const notFoundBadges = filterBadges(allBadges, requestBadges);

        const status = HttpStatus.NOT_FOUND;
        const message = `O(s) badge(s) não foi(foram) encontrado(s) no banco de dados: ${notFoundBadges.join(
          ', ',
        )}. Adicione ele(s) usando o objeto {name: nome-do-badge, image: url-do badge}`;

        response.status(status).json({ statusCode: status, message });

        break;
      }
      default:
        // default 500 error code
        super.catch(exception, host);
        break;
    }
  }
}
