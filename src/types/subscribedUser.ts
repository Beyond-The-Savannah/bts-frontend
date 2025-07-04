import { JSX } from "react";

export interface SubscribedUserProp {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  subscriptionPlan: string;
  status: string;
  career: number | string;
}
export interface EmailBatchProp{
  from: string;
    to: string[];
    subject: string;
    react: JSX.Element;
}