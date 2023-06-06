export interface MongoDBConfigInterface {
  uri: string;
  database: string;
  options: {
    readPreference: string;
  }
}

export type Config = {
  mode: string;
  mongoDB: MongoDBConfigInterface;
};
