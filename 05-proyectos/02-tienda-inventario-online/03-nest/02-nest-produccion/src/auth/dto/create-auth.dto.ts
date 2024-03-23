export class CreateAuthDto {
  id: number;
  user: Record<string, any>;
  password: string;
  token: string;
}
