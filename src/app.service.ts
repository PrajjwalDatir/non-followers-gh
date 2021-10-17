import { Injectable } from '@nestjs/common'
import axios from 'axios'
import { User } from './users/user.model'

@Injectable()
export class AppService {
    getHello(): string {
        return 'Find out your non-followers!'
    }

    async getNonFollowingUsers(username: string): Promise<string | User[]> {
        const linkFollowing = 'https://api.github.com/users/' + username + '/following'
        const linkFollowers = 'https://api.github.com/users/' + username + '/followers'
        // fetch following users via axios and get only { id, login, html_url }
        try {
            const following = (await axios.get<User[]>(linkFollowing)).data?.map((user) => ({
                id: user.id || null,
                login: user.login || '',
                html_url: user.html_url || '',
            }))
            // fetch followers via axios
            const followers = (await axios.get<User[]>(linkFollowers)).data?.map((user) => ({
                id: user.id || '',
                login: user.login || '',
                html_url: user.html_url || '',
            }))
            // check if user is following or follower return users
            if (!followers || !following) return 'Failed to fetch'
            const resultUsers = following.filter((user) => {
                return !followers.some((follower) => {
                    return follower.id === user.id
                })
            })
            return resultUsers
        } catch {
            return 'Server Error'
        }
    }
}
