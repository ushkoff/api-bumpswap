import { Injectable } from '@nestjs/common';
import {
  Config,
  MongoDBConfigInterface,
} from './config.interface';
import { readConfig } from './config-reader';

@Injectable()
export class ConfigService {
  private readonly config: Config;

  constructor() {
    this.config = readConfig();
  }

  get mongoDBConfig(): MongoDBConfigInterface {
    if (!this.config.mongoDB) {
      throw new Error('No mongodb configuration found');
    }

    return this.config.mongoDB;
  }
}
