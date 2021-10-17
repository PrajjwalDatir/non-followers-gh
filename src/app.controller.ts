import { Controller, Get, Param } from '@nestjs/common'
import { AppService } from './app.service'
import { User } from './users/user.model'

@Controller('/')
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHome(): string {
        return this.appService.getHome()
    }

    @Get('/:username')
    async getNonFollowingUsers(@Param('username') username: string): Promise<string | User[]> {
        // pass the username to the service
        return await this.appService.getNonFollowingUsers(username)
    }
}
