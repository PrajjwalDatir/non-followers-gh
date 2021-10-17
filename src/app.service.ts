import { Injectable } from '@nestjs/common'
import axios from 'axios'
import { User } from './users/user.model'

@Injectable()
export class AppService {
    resultUsers: User[] = []
    getHello(): string {
        return 'Find out your non-followers!'
    }

    async getNonFollowingUsers(username: string): Promise<User[]> {
        const linkFollowing = 'https://api.github.com/users/' + username + '/following'
        const linkFollowers = 'https://api.github.com/users/' + username + '/followers'
        // fetch following users via axios and get only { id, login, html_url }
        const following = (await axios.get<User[]>(linkFollowing)).data
        // fetch followers via axios
        const followers = (await axios.get<User[]>(linkFollowers)).data
        // check if user is following or follower return users
        this.resultUsers = following.filter((user) => {
            return !followers.some((follower) => {
                return follower.id === user.id
            })
        })
        return this.resultUsers
    }
}
