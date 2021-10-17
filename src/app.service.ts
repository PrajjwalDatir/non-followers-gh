import { Injectable } from '@nestjs/common'
import axios from 'axios'
import { User } from './users/user.model'

@Injectable()
export class AppService {
    resultUsers: User[] = []
    getHello(): string {
        return 'Hello World!'
    }

    async getNonFollowingUsers(username: string): Promise<User[]> {
        const linkFollowing = 'https://api.github.com/users/' + username + '/following'
        const linkFollowers = 'https://api.github.com/users/' + username + '/followers'
        // fetch following users via axios
        const following = (await axios
            .get(linkFollowing)
            .then((res) => res.data)
            .catch((error) => {
                console.log(error)
            })) as unknown as User[]
        // fetch followers via axios
        const followers = (await axios
            .get(linkFollowers)
            .then((res) => res.data)
            .catch((error) => {
                console.log(error)
            })) as unknown as User[]
        // check if user is following or follower
        // return users
        this.resultUsers = following.filter((user) => {
            return !followers.some((follower) => {
                return follower.login === user.login
            })
        })
        return this.resultUsers
    }
}
