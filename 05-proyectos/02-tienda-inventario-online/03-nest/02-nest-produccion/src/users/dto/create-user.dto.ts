export class CreateUserDto {
  id: number;
  username: string;
  userpass: string;
  role: string;
  state: number;
  encrypt: any;
  createdAt: Date;
  updatedAt: Date;
}
