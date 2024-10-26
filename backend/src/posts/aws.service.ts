import * as path from 'path';
import * as AWS from 'aws-sdk';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PromiseResult } from 'aws-sdk/lib/request';

// 이미지 변환 및 crop원하면 sharp 라이브러리

@Injectable()
//의존성 주입이 가능한 서비스
export class AwsService {
  private readonly awsS3: AWS.S3;
  public readonly S3_BUCKET_NAME: string;

  constructor(private readonly configService: ConfigService) {
    //인스턴스 객체 생성
    this.awsS3 = new AWS.S3({
      accessKeyId: this.configService.get('AWS_S3_ACCESS_KEY'), // process.env.AWS_S3_ACCESS_KEY
      secretAccessKey: this.configService.get('AWS_S3_SECRET_KEY'),
      region: this.configService.get('AWS_S3_REGION'),
    });
    this.S3_BUCKET_NAME = this.configService.get('AWS_S3_BUCKET_NAME'); // nest-s3
  }

  async uploadFileToS3(
    folder: string,
    file: Express.Multer.File,
    //어떤폴더에 받을지 폴더이름이랑 파일을 받는다.
    //aws는 폴더가 아니라 링크라는 개념.
  ): Promise<{
    key: string;
    s3Object: PromiseResult<AWS.S3.PutObjectOutput, AWS.AWSError>;
    contentType: string;
  }> {
    try {
      const key = `${folder}/${Date.now()}_${path.basename(
        file.originalname,
      )}`.replace(/ /g, '');
      console.log(key);
      //폴더 안에서 현재 날짜와 multer로 받은 파일의 이름을 합쳐서 key로 만든다.
      //공백지우기
      //단순히 식별을 하기 위한용도라, uuid를 사용해도 된다.
      const s3Object = await this.awsS3
        .putObject({
          Bucket: this.S3_BUCKET_NAME,
          //어디에
          Key: key,
          //이름저장
          Body: file.buffer,
          //실제 이미지 데이터
          ACL: 'public-read',
          ContentType: file.mimetype,
          //받은 데이터 타입
        })
        .promise();
      return { key, s3Object, contentType: file.mimetype };
    } catch (error) {
      throw new BadRequestException(`File upload failed : ${error}`);
    }
  }

  async deleteS3Object(
    key: string,
    callback?: (err: AWS.AWSError, data: AWS.S3.DeleteObjectOutput) => void,
  ): Promise<{ success: true }> {
    try {
      await this.awsS3
        .deleteObject(
          {
            Bucket: this.S3_BUCKET_NAME,
            Key: key,
          },
          callback,
        )
        .promise();
      return { success: true };
    } catch (error) {
      throw new BadRequestException(`Failed to delete file : ${error}`);
    }
  }

  public getAwsS3FileUrl(objectKey: string) {
    return `https://${this.S3_BUCKET_NAME}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${objectKey}`;
  }
}
