import { Controller, Get, Param } from '@nestjs/common'
import { AppService } from './app.service'
import { User } from './users/user.model'

@Controller('/')
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello()
    }

    @Get('/:username')
    async getNonFollowingUsers(@Param('username') username: string): Promise<string | User[]> {
        // pass the username to the service
        return await this.appService.getNonFollowingUsers(username)
    }
}
