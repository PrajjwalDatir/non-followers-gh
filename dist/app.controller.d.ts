import { AppService } from './app.service';
import { User } from './users/user.model';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    getNonFollowingUsers(username: string): Promise<string | User[]>;
}
