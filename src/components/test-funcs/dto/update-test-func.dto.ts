import { PartialType } from '@nestjs/mapped-types';
import { TestEmailDto } from './create-test-func.dto';

export class UpdateTestFuncDto extends PartialType(TestEmailDto) {}
