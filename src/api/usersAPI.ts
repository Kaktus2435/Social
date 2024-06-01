import { GetItemsType, APIResponseType, instance } from './api.ts';

export const usersAPI = {
    
    getUsers(currentPage: number, pageSize: number, term: string = '', friend: null | boolean = null) {

        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? '' : `&friend=${friend}`)
        /* ,
            {
                withCredentials: true,
                params: { page: currentPage, count: pageSize } 
            } */)
            .then(res => res.data);
    },

    follow(userId: number) {
        return instance.post<APIResponseType>(`follow/${userId}`).then(res => res.data);
    },
    unfollow(userId: number) {
        return instance.delete<APIResponseType>(`follow/${userId}`).then(res => res.data) as Promise<APIResponseType>;
    }
};
