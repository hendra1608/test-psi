import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import {
  Strategy,
  VerifyCallback,
  StrategyOptionsWithRequest,
  Profile,
} from 'passport-google-oauth20';
import { Request } from 'express';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    const options: StrategyOptionsWithRequest = {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: 'http://localhost:5000/auth/google/callback',
      scope: ['email', 'profile'],
      passReqToCallback: true, // wajib kalau pakai WithRequest
    };
    super(options);
  }

  validate(
    Request: Request,
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ) {
    const { name, emails } = profile;

    if (!emails || emails.length === 0) {
      throw new Error('No email found in Google profile');
    }

    return {
      email: emails[0].value,
      name: name?.givenName + ' ' + name?.familyName,
    };
  }
}
