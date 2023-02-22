/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Quiz, Prisma } from '@prisma/client';

@Injectable()
export class QuizzesService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.QuizCreateInput): Promise<Quiz | null> {
    return await this.prisma.quiz.create({ data });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.QuizWhereUniqueInput;
    where?: Prisma.QuizWhereInput;
    orderBy?: Prisma.QuizOrderByWithRelationInput;
  }): Promise<Quiz[] | null> {
    const { skip, take, cursor, where, orderBy } = params;
    return await this.prisma.quiz.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findOne(id: number): Promise<Quiz | null> {
    return await this.prisma.quiz.findFirst({ where: { id } });
  }

  async update(
    id: number,
    data: Prisma.QuizUpdateInput,
  ): Promise<Quiz | null> {
    return await this.prisma.quiz.update({ where: { id }, data });
  }

  async remove(id: number): Promise<void> {
    await this.prisma.quiz.delete({ where: { id } });
    return;
  }
}
