import { instance } from './api.ts';
import { profileAPI } from './profileAPI.ts';


export const usersAPI = {
    requestUsers(currentPage: number, pageSize: number) {

        return instance.get(`users`,
            {
                withCredentials: true,
                params: { page: currentPage, count: pageSize }
            })
            .then(response => response.data);
    },

    follow(userId: number) {
        return instance.post(`follow/${userId}`);
    },
    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`);
    },
    getProfile(userId: number) {
        console.warn('Obsolete method. Please profileAPI object. ');
        return profileAPI.getProfile(userId);
    }
};
