export type NewUser = {
  email: string;
  firstName: string;
  lastName: string;
  role: string | null;
};

export type NewUserDTO = {
  first_name: string;
  last_name: string;
  email: string;
  role: string | null;
};
