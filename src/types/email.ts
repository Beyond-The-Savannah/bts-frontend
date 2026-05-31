export interface EmailProps {
  email?: string;
  firstName: string;
  amount: number;
  serviceName: string;
}
export interface EventTicketEmailProps {
  email?: string;
  firstName: string;
  lastName: string;
  amount: number;
  eventName: string;
}

export interface PaystackWebhookEmailProps{
  firstName:string,
    email:string,
    paystackId:number,
    customerId:string,
    eventName:string,
}