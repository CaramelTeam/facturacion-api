import { IsArray, IsOptional, IsString } from "class-validator";

export class TestEmailDto {
    @IsString()
    template: string

    @IsArray()
    to: string[]

    @IsString()
    @IsOptional()
    bcc: string[]

    @IsString()
    subject: string

    @IsString()
    title: string

}