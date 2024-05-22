import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateAuthorDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
