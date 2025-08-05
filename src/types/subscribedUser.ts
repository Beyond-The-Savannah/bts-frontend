import { JSX } from "react";

export interface SubscribedUserProp {
  id: number;
  status: string;
  subscriptionPlan: string;
  career: number | string;
  email: string;
  password:string;
  firstName: string;
  lastName: string;
  phoneNumber:string;
  attachmentName:string;
  file:string;
  imageUrl:string;
  isActive:boolean;
  isDeleted:boolean;

}

// "id": 317,
//   "status": "cancelled",
//   "subscriptionPlan": "Basic Monthly",
//   "career": 0,
//   "email": "gitoshmbae@gmail.com",
//   "password": null,
//   "firstName": "string",
//   "lastName": "null",
//   "phoneNumber": "string",
//   "attachmentName": "RATE CARD 2024- ARAMEX.pdf",
//   "file": null,
//   "imageUrl": "https://julesdb.blob.core.windows.net/bydcvs/RATE CARD 2024- ARAMEX.pdf",
//   "isActive": true,
//   "isDeleted": false
export interface EmailBatchProp{
  from: string;
    to: string[];
    subject: string;
    react: JSX.Element;
}