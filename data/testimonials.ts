export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  avatar?: string;
  linkedInUrl?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    quote:
      "Prem's Power BI dashboards completely changed how our HODs track weekly performance. His DAX optimization made report loading instant!",
    name: "Senior Manager",
    role: "Analytics & Operations",
    company: "Utkarsh India Limited",
  },
  {
    id: "2",
    quote:
      "Extremely skilled in SQL and Data Integration. Prem delivered automated auction insights that gave us a huge strategic edge.",
    name: "Business Head",
    role: "Strategy & Procurement",
    company: "Bhauram Jodhraj Pvt Ltd",
  },
];