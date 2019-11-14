export interface Student {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  address2?: string;
  state: string;
  city: string;
  zip: string;
  startDate: Date;
  graduationDate?: Date;
  coursesTaken: string[];
}
