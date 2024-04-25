import { Document } from 'mongoose';

export interface ITransaction extends Document {
  from: string;
  receiver: string;
  amount: number;
  message?: string;
  timestamp: Date;
  keyword?: string;
}



export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    verificationToken?: string;
    emailVerified: boolean;
    profileImage?: string;
    ethereumAddress?: string;
  }



export interface GiphyApiResponse {
    data: Array<{
      images: {
        downsized_medium: {
          url: string;
        };
      };
    }>;
  }