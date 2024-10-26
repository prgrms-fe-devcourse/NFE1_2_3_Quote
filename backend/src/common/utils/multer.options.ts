import * as multer from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

const createFolder = (folder: string) => {
  try {
    console.log('💾 Create a root uploads folder...');
    fs.mkdirSync(path.join(__dirname, '..', `uploads`));
  } catch (error) {
    console.log('The folder already exists...');
  }
  try {
    console.log(`💾 Create a ${folder} uploads folder...`);
    fs.mkdirSync(path.join(__dirname, '..', `uploads/${folder}`));
  } catch (error) {
    console.log(`The ${folder} folder already exists...`);
  }
};

const storage = (folder: string): multer.StorageEngine => {
  createFolder(folder);
  return multer.diskStorage({
    destination(req, file, cb) {
      //* 어디에 저장할 지
      const folderName = path.join(__dirname, '..', `uploads/${folder}`);
      //업로드의 @@폴더(도메인마다 다름)에 저장
      cb(null, folderName);
    },

    filename(req, file, cb) {
      //* 어떤 이름으로 올릴 지
      const ext = path.extname(file.originalname);
      //파일 읽어서 확장자 추출
      const fileName = `${path.basename(
        file.originalname,
        ext,
      )}${Date.now()}${ext}`;
      //기존에 있던 파일과 이름이 겹치면 오류가 난다. 그래서 현재시간 붙여서 저장을 한다.
      cb(null, fileName);
    },
  });
};
//multerOptions함수의 두 번째 인자로 들어갈 함수. multerOptions를 반환한다.
export const multerOptions = (folder: string) => {
  //매개변수로 받은 폴더 명으로 옵션 설정
  //user이미지 업로드 할 때는 user를 넣어줬는데,
  //도메인 별로 폴더를 나눠서 저장할 수 있음.
  const result: MulterOptions = {
    storage: storage(folder),
  };

  return result;
};
