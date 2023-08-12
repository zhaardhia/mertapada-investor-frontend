export interface AbsenceType {
  id: string;
  employee_id: string;
  absence_detail_id: string;
  is_present: boolean;
  date: string;
  created_date: Date;
  updated_date: Date;
}

export interface EmployeeType {
  id: string | undefined;
  name: string | undefined;
  salary: number | undefined;
  status: number | undefined;
  created_date: Date;
  updated_date: Date;
}

export interface SelectedDeleteType {
  id: string | undefined;
  name: string | undefined;
}