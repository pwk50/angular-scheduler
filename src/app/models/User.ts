import { Appointment } from './Appointment';

export class User {
    "id": number;
    "name": string;
    "email": string;
    "password": string;
    "isApproved": boolean;
    "roles": [];
    "appointments": Appointment[];
}
