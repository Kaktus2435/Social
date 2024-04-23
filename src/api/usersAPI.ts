import { GetItemsType, instance } from './api.ts';
import { profileAPI } from './profileAPI.ts';



export const usersAPI = {
    requestUsers(currentPage: number, pageSize: number) {

        return instance.get<GetItemsType>(`users`,
            {
                withCredentials: true,
                params: { page: currentPage, count: pageSize }
            })
            .then(res => res.data);
    },

    follow(userId: number) {
        return instance.post<ResponseType>(`follow/${userId}`).then(res => res.data);
    },
    unfollow(userId: number) {
        return instance.delete<ResponseType>(`follow/${userId}`).then(res => res.data) as Promise<ResponseType>;
    },
    
    getProfile(userId: number) {
        console.warn('Obsolete method. Please profileAPI object. ');
        return profileAPI.getProfile(userId);
    }
};
