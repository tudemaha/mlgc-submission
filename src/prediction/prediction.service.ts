import { Firestore } from '@google-cloud/firestore';
import { Injectable } from '@nestjs/common';
import PredictionData from './prediction.interface';

@Injectable()
export class PredictionService {
  private firestore = new Firestore({
    projectId: process.env.PROJECT_ID,
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  });

  async create(data: PredictionData) {
    const document = this.firestore.collection('predictions').doc(`${data.id}`);
    await document.set(data);
  }
}
