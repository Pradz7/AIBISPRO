import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.products.findMany({
      include: {
        categories: true,
        product_sizes: true,
      },
      orderBy: {
        id: 'asc',
      },
    });
  }

  async findOne(id: bigint) {
    return this.prisma.products.findUnique({
      where: {
        id,
      },
      include: {
        categories: true,
        product_sizes: true,
      },
    });
  }
}
