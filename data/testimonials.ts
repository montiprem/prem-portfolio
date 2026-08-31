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
];