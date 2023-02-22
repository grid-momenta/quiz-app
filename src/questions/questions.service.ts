/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Question, Prisma } from '@prisma/client';

@Injectable()
export class QuestionsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.QuestionCreateInput): Promise<Question | null> {
    return await this.prisma.question.create({ data });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.QuestionWhereUniqueInput;
    where?: Prisma.QuestionWhereInput;
    orderBy?: Prisma.QuestionOrderByWithRelationInput;
  }): Promise<Question[] | null> {
    const { skip, take, cursor, where, orderBy } = params;
    return await this.prisma.question.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findOne(id: number): Promise<Question | null> {
    return await this.prisma.question.findFirst({ where: { id } });
  }

  async update(id: number, data: Prisma.QuestionUpdateInput): Promise<Question | null> {
    return await this.prisma.question.update({ where: { id }, data });
  }

  async remove(id: number): Promise<void> {
    await this.prisma.question.delete({ where: { id } });
    return;
  }
}
