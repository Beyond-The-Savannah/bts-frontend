export interface SubscriptionProps {
  amount: number;
  authorization: {
    account_name: string | null;
    authorization_code: string;
    bank: string;
    bin: string;
    brand: string;
    card_type: string;
    channel: string;
    country_code: string;
    exp_month: string;
    exp_year: string;
    last4: string;
    reusable: number;
    signature: string;
  };
  createdAt: string;
  cron_expression: string;
  customer: {
    customer_code: string;
    email: string;
    first_name: string | null;
    id: number;
    international_format_phone: string | null;
    last_name: string | null;
    metadata: null;
    phone: string | null;
    risk_action: string;
  };
  domain: string;
  email_token: string;
  id: number;
  integration: number;
  invoice_limit: number;
  metadata: null;
  most_recent_invoice: {
    amount: number;
    authorization: number;
    created_at: string;
    customer: number;
    description: string | null;
    domain: string;
    id: number;
    integration: number;
    invoice_code: string;
    next_notification: string;
    notification_flag: null;
    paid: number;
    paid_at: string;
    period_end: string;
    period_start: string;
    retries: number;
    status: string;
    subscription: number;
    transaction: number;
    updated_at: string;
  };
  next_payment_date: string | null;
  open_invoice: null;
  payments_count: number;
  plan: {
    amount: number;
    createdAt: string;
    currency: string;
    description: string;
    domain: string;
    id: number;
    integration: number;
    interval: string;
    name: string;
    plan_code: string;
    send_invoices: boolean;
    send_sms: boolean;
    updatedAt: string;
  };
  quantity: number;
  split_code: string | null;
  start: number;
  status: string;
  subscription_code: string;
}


export interface Plan {
    id: number;
    domain: string;
    name: string;
    plan_code: string;
    description: string;
    amount: number;
    interval: 'annually'| 'monthly' | string; // Using string for flexibility if other intervals exist
    send_invoices: boolean;
    send_sms: boolean;
    currency: string;
    integration: number;
    createdAt: string; 
    updatedAt: string; 
}

/**
 * Interface for the Authorization details (Card information).
 */
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
    signature: string;
    account_name: string | null;
}

/**
 * Interface for the Customer details.
 */
export interface Customer {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    customer_code: string;
    phone: string;
    metadata: unknown | null;
    risk_action: string;
    international_format_phone: string | null;
}

/**
 * Interface for the most recent invoice associated with the subscription.
 */
export interface MostRecentInvoice {
    subscription: number;
    integration: number;
    domain: string;
    invoice_code: string;
    customer: number;
    transaction: number;
    amount: number;
    period_start: string
    period_end: string
    status: string;
    paid: number; // Often 1 or 0, representing a boolean state
    retries: number;
    authorization: number;
    paid_at: string
    next_notification: string
    notification_flag: unknown | null;
    description: unknown | null;
    id: number;
    created_at: string
    updated_at: string
}


// --- Main Interface ---

/**
 * The main interface representing a single subscription object.
 */
export interface subscriptionDetailsProps {
    id: number;
    domain: string;
    status: 'active' | 'cancelled' | string; // Using a union type for known status values
    start: number; // Unix timestamp
    quantity: number;
    subscription_code: string;
    email_token: string;
    amount: number;
    cron_expression: string;
    next_payment_date: string | null;
    open_invoice: unknown | null;
    createdAt: string
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
