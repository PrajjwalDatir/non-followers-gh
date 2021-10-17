import { User } from './users/user.model';
export declare class AppService {
    getHello(): string;
    getNonFollowingUsers(username: string): Promise<string | User[]>;
}
