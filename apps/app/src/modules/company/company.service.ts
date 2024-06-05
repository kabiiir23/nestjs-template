import { Inject, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { REQ_CTX_LOGGER } from '@app/core/logger/factories/requestContext.logger';
import { Logger } from 'winston';
import { Company, CompanyModel } from './entities/company.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CompanyService {
  constructor(
    @Inject(REQ_CTX_LOGGER) private readonly logger: Logger,
    @InjectModel(Company.name) private readonly companyModel: CompanyModel,
  ) {}

  async create(createCompanyDto: CreateCompanyDto) {
    const company = await this.companyModel.create(createCompanyDto);
    this.logger.info(`Company created: ${company}`);
    return company;
  }

  findAll() {
    return `This action returns all company`;
  }

  findOne(id: number) {
    return `This action returns a #${id} company`;
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
