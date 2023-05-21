import { S3Client, PutObjectCommand, PutObjectRequest } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid'
import { HttpException } from '@nestjs/common';
import envsConfig from 'src/config/envs.config';
import { MONTHS } from '../../constants'

const AWS_ACCESS_KEY_ID = envsConfig().AWS.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = envsConfig().AWS.AWS_SECRET_ACCESS_KEY;
const url: string = 'https://facturacion-api-files.s3.us-east-2.amazonaws.com'


const currentYear = new Date().getFullYear();
const currentMonth = MONTHS[new Date().getMonth()];

if (!AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY) { throw new Error('AWS_ACCESS_KEY or AWS_SECRET_ACCESS_KEY is not defined') }

const client = new S3Client({
    region: envsConfig().AWS.AWS_REGION || 'us-east-2',
    credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY
    }
})

export async function uploadFile(file: any) {
    if (!file) {
        throw new HttpException('No se ha recibido ningún archivo', 400);
    }

    const fileName = `${uuidv4()}.zip`;
    const uploadPams: PutObjectRequest = {
        Bucket: envsConfig().AWS.AWS_BUCKET_NAME,
        Key: `Facturas-${currentYear}/${currentMonth}/${fileName}`,
        Body: file.data,
        ACL: 'public-read',
    }

    const command = new PutObjectCommand(uploadPams);
    const result = await client.send(command);
    return {
        location: `${url}/Facturas-${currentYear}/${currentMonth}/${fileName}`,
        ...result
    }

}