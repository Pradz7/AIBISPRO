import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import * as fs from 'fs';
import csv from 'csv-parser';

@Injectable()
export class UploadService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async createDataset(
    fileName: string,
    uploadedBy: bigint,
  ) {
    return this.prisma.datasets.create({
      data: {
        file_name: fileName,
        uploaded_by: uploadedBy,
      },
    });
  }

  async parseCsv(filePath: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const results: any[] = [];

      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => {
          results.push(data);
        })
        .on('end', () => {
          resolve(results);
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  }
}