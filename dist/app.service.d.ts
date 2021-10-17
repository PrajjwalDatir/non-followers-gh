import { User } from './users/user.model';
export declare class AppService {
    getHome(): string;
    getNonFollowingUsers(username: string): Promise<string | User[]>;
}
