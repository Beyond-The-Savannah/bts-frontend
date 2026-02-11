export {};

export type Roles = "client" | "admin";

export type UploadStatus = "idle" | "uploading" | "success" | "error";
declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
    };
  }
}

export interface Plan {
  id: number;
  domain: string;
  name: string;
  plan_code: string;
  description: string;
  amount: number;
  interval: string;
  send_invoices: boolean;
  send_sms: boolean;
  currency: string;
  integration: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface Authorization {
  authorization_code: string;
  bin: string;
  last4: string;
  exp_month: string;
  exp_year: string;
  channel: string;
  card_type: string;
  bank: string;
  country_code: string;
  brand: string;
  reusable: number;
  signature: string;
  account_name: string | null;
}

export interface Customer {
  id: number;
  first_name: string | null;
  last_name: string | null;
  email: string;
  customer_code: string;
  phone: string | null;
  metadata: unknown | null;
  risk_action: string;
  international_format_phone: string | null;
}

export interface MostRecentInvoice {
  subscription: number;
  integration: number;
  domain: string;
  invoice_code: string;
  customer: number;
  transaction: number;
  amount: number;
  period_start: string; // ISO date string
  period_end: string; // ISO date string
  status: string;
  paid: number;
  retries: number;
  authorization: number;
  paid_at: string; // ISO date string
  next_notification: string; // ISO date string
  notification_flag: unknown | null;
  description: unknown | null;
  id: number;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}

// interface Subscription {
export interface SubscribedUser {
  id: number;
  domain: string;
  status: string;
  start: number;
  quantity: number;
  subscription_code: string;
  email_token: string;
  amount: number;
  cron_expression: string;
  next_payment_date: string; // ISO date string
  open_invoice: unknown | null;
  createdAt: string; // ISO date string
  integration: number;
  plan: Plan;
  authorization: Authorization;
  customer: Customer;
  invoice_limit: number;
  split_code: unknown | null;
  metadata: unknown | null;
  payments_count: number;
  most_recent_invoice: MostRecentInvoice;
}

export interface CompanyDetailsProps {
  companyDetails?: {
    id?: number;
    companyName?: string;
    companyHeadQuaters?: string;
    companyContactEmail?: string;
    companyContactPhone?: string;
    companyDescription?: string;
    location?: string;
    imageUrl?: string;
  };
}

export interface JobDetailsProps {
  jobDetails?: {
    jobsId?: number;
    endDate?: string;
    jobName?: string;
    jobDescription?: string;
    companyId?: number;
    language?: string;
    jobUrl?: string;
    salary?: number;
    jobCategoriesId?: number;
    jobSubCategoryId?: number;
    createdBy?: string;
    jobsAndSections?: {
      id?: number;
      sectionName?: string;
      sectionDescription?: string;
      jobTypesId?: number;
      createdBy?: string;
      modifiedBy?: string;
    }[];
  };
}

export interface ServiceProps {
  id: number;
  title: string;
  titleSlug: string;
  subheading: string;
  img: string;
  openGraphImg: string;
  details: string;
  benefits: string[];
  servicePolicy: string;
  valueProposal: string;
  priceKE: number;
  priceUSD: number;
  priceKESString: string;
  priceUSDString: string;
}

export interface OrganizationMembershipProp {
  id: string;
  role: 'org:admin' | 'org:member' | string;
  permissions: string[];
  publicMetadata: Record<string, unknown>;
  privateMetadata: Record<string, unknown>;
  createdAt: number;
  updatedAt: number;
  organization: OrganizationDetails;
  publicUserData: PublicUserData;
}

export interface OrganizationDetails {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
  hasImage: boolean;
  createdAt: number;
  updatedAt: number;
  publicMetadata: Record<string, unknown>;
  privateMetadata: Record<string, unknown>;
  maxAllowedMemberships: number;
  adminDeleteEnabled: boolean;
  membersCount: number;
  createdBy: string;
}

export interface PublicUserData {
  identifier: string;
  firstName: string | null;
  lastName: string | null;
  imageUrl: string;
  hasImage: boolean;
  userId: string;
}