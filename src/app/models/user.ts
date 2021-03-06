import {Collection} from './collection';

export class User {
  id: string;
  username: string;
  email: string;
  password: string;
  collections: Collection[];
}
