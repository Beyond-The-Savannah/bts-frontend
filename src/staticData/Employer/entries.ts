export const candidatesEntries = [
  {
    fullName: "Emma Johnson",
    email: "emma.johnson@example.com",
    phone: "+254701234567",
  },
  {
    fullName: "James Mwangi",
    email: "james.mwangi@example.com",
    phone: "+254712345678",
  },
  {
    fullName: "Sophia Kimani",
    email: "sophia.kimani@example.com",
    phone: "+254723456789",
  },
  {
    fullName: "David Onyango",
    email: "david.onyango@example.com",
    phone: "+254734567890",
  },
  {
    fullName: "Lilian Wanjiru",
    email: "lilian.wanjiru@example.com",
    phone: "+254745678901",
  },
  {
    fullName: "Michael Ochieng",
    email: "michael.ochieng@example.com",
    phone: "+254756789012",
  },
  {
    fullName: "Alice Njeri",
    email: "alice.njeri@example.com",
    phone: "+254767890123",
  },
  {
    fullName: "Peter Ndegwa",
    email: "peter.ndegwa@example.com",
    phone: "+254778901234",
  },
  {
    fullName: "Grace Achieng",
    email: "grace.achieng@example.com",
    phone: "+254789012345",
  },
  {
    fullName: "Samuel Otieno",
    email: "samuel.otieno@example.com",
    phone: "+254790123456",
  },
];

export interface NewJobPositingsProp {
  companyName: string;
  role: string;
  location: string;
  department: string;
  deadLineDate: string;
  jobDetails: string;
}

export const newJobPositiings: NewJobPositingsProp[] = [
  {
    companyName: "Amazon",
    role: "Data Engineer",
    location: "Remote",
    department: "Engineering ",
    deadLineDate: "12-2026-17",
    jobDetails: "job details",
  },
];


export const workModes=[
  {
    value:"Remote",
    label:"Remote",
  },
  {
    value:"Hybrid",
    label:"Hybrid",
  },
  {
    value:"On site",
    label:"On Site",
  },
]

export const JobTypes=[
  {
    value:"Full time",
    label:"Full Time",
  },
  {
    value:"Contract",
    label:"Contract",
  },
  {
    value:"Part time",
    label:"Part Time",
  },
  {
    value:"Temporary",
    label:"Temporary",
  },
]

export const Departments = [
  { value: "Human Resources", label: "Human Resources" },
  { value: "Finance & Accounting", label: "Finance & Accounting" },
  { value: "Marketing", label: "Marketing" },
  { value: "Sales", label: "Sales" },
  { value: "Operations", label: "Operations" },
  { value: "Information Technology", label: "Information Technology" },
  { value: "Customer Service", label: "Customer Service" },
  { value: "Legal", label: "Legal" },
  { value: "Product Management", label: "Product Management" },
  { value: "Research & Development", label: "Research & Development" },
  { value: "Administration", label: "Administration" },
  { value: "Quality Assurance", label: "Quality Assurance" },
  { value: "Project Management", label: "Project Management" },
  { value: "Business Development", label: "Business Development" },
  { value: "Logistics", label: "Logistics" },
  { value: "Corporate Communications", label: "Corporate Communications" },
  { value: "Risk Management", label: "Risk Management" },
  { value: "Purchasing & Sourcing", label: "Purchasing & Sourcing" },
  { value: "Investor Relations", label: "Investor Relations" },
  { value: "Creative Services", label: "Creative Services" },
  { value: "Health Care", label: "Health Care" }
];
