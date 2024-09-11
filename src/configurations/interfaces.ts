export interface IUser {
    id?: string;        // Optional because it is auto-incremented
    name: string;
    email: string;
    password?: string;  // optional for security!
    isAdmin: boolean;
    createdAt?: Date;   // Optional because it is auto-generated
    updatedAt?: Date;   // Optional because it is auto-updated
}
  