import { Room } from './Room';
import { User } from './User';

export class Appointment {
    "id": number;
    "agenda": string;
    "description": string;
    "date": {
        "start": string,
        "end": string
    };
    "time": string;
    "roomId": number;
    "userId": number;
    "participants": any[];
    "user": User;
    "room": Room;
}
