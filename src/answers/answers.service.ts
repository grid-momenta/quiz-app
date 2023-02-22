/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Answer, Prisma } from '@prisma/client';

@Injectable()
export class AnswersService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.AnswerCreateInput): Promise<Answer | null> {
    return await this.prisma.answer.create({ data });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.AnswerWhereUniqueInput;
    where?: Prisma.AnswerWhereInput;
    orderBy?: Prisma.AnswerOrderByWithRelationInput;
  }): Promise<Answer[] | null> {
    const { skip, take, cursor, where, orderBy } = params;
    return await this.prisma.answer.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findOne(id: number): Promise<Answer | null> {
    return await this.prisma.answer.findFirst({ where: { id } });
  }

  async update(
    id: number,
    data: Prisma.AnswerUpdateInput,
  ): Promise<Answer | null> {
    return await this.prisma.answer.update({ where: { id }, data });
  }

  async remove(id: number): Promise<void> {
    await this.prisma.answer.delete({ where: { id } });
    return;
  }
}
