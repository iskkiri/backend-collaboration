import { appConfig } from '@/common/options/config.options';
import { Inject, Injectable } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { credential } from 'firebase-admin';
import { initializeApp, type App } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getMessaging } from 'firebase-admin/messaging';

@Injectable()
export class FirebaseService {
  private firebaseAdmin: App;

  constructor(
    @Inject(appConfig.KEY)
    private config: ConfigType<typeof appConfig>
  ) {
    this.firebaseAdmin = initializeApp({
      credential: credential.cert(
        JSON.parse(this.config.googleApplicationCredentials)
      ),
    });
  }

  getFirestore() {
    return getFirestore(this.firebaseAdmin);
  }

  getMessaging() {
    return getMessaging(this.firebaseAdmin);
  }
}
