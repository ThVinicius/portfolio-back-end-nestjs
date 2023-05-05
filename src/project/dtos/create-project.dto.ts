import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Min,
  Validate,
  ValidateNested,
} from 'class-validator';
import { ProjectTypeEnum } from '../enums/type.enum';
import { ProjectLinkEnum } from '../enums/link.enum';
import { Type } from 'class-transformer';
import { Badge, IsBadgeArray } from '../decorators/badges-validator.decorator';

export class CreateProjectDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(ProjectTypeEnum, {
    message:
      'O campo type deve ser um desses tipos: FrontEnd, BackEnd ou FullStack',
  })
  @IsNotEmpty()
  type: ProjectTypeEnum;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsUrl()
  @IsNotEmpty()
  image: string;

  @IsNumber()
  @IsOptional()
  @Min(1)
  position?: number;

  @IsArray()
  @Validate(IsBadgeArray)
  badges: (string | Badge)[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LinkProject)
  links: LinkProject[];
}

class LinkProject {
  @IsEnum(ProjectLinkEnum, {
    message:
      'O campo label deve ser uma dessas strings: FrontEnd_Repo, BackEnd_Repo, GitHub_Repo ou Deploy',
  })
  @IsNotEmpty()
  label: ProjectLinkEnum;

  @IsUrl()
  href: string;
}
