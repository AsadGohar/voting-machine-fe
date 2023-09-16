export type IUser = {
  _id:string,
	name?: string;
  email?: string;
  password?: string;
  role?: string;
  constituency?: string;
  picture?: string;
  isVerified?: boolean;
  cnic?:string
}
