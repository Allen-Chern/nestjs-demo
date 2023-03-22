import { IsNotEmpty } from 'class-validator';

export class UpdateInfoDto {
  @IsNotEmpty()
  name: string;
}
