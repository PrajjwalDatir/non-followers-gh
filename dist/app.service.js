"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
let AppService = class AppService {
    getHome() {
        return '<h3 style="text-align:center;">Find out your non-followers on GitHub!</h3><br><h4 style="text-align:center;">Available Routes</h4> <ol style="text-align:center;"><li>/</li><li>/:username</li></ol>';
    }
    async getNonFollowingUsers(username) {
        var _a, _b;
        const linkFollowing = 'https://api.github.com/users/' + username + '/following';
        const linkFollowers = 'https://api.github.com/users/' + username + '/followers';
        try {
            const following = (_a = (await axios_1.default.get(linkFollowing)).data) === null || _a === void 0 ? void 0 : _a.map((user) => ({
                id: user.id || null,
                login: user.login || '',
                html_url: user.html_url || '',
            }));
            const followers = (_b = (await axios_1.default.get(linkFollowers)).data) === null || _b === void 0 ? void 0 : _b.map((user) => ({
                id: user.id || '',
                login: user.login || '',
                html_url: user.html_url || '',
            }));
            if (!followers || !following)
                return 'Failed to fetch';
            const resultUsers = following.filter((user) => {
                return !followers.some((follower) => {
                    return follower.id === user.id;
                });
            });
            return resultUsers;
        }
        catch (_c) {
            return 'Server Error';
        }
    }
};
AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map