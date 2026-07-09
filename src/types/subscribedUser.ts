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
export interface CombinedSubscribedUsersProp {
  id: number| string;
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


export interface EmailBatchProp{
  from: string;
    to: string[];
    subject: string;
    react: JSX.Element;
}