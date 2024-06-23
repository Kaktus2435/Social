import { GetItemsType, APIResponseType, instance } from './api.ts';

export const usersAPI = {
    requestUsers(currentPage: number, pageSize: number, term: string) {

        return instance.get<GetItemsType>(`users`,
            {
                withCredentials: true,
                params: { page: currentPage, count: pageSize, term  }
            })
            .then(res => res.data);
    },

    follow(userId: number) {
        return instance.post<APIResponseType>(`follow/${userId}`).then(res => res.data);
    },
    unfollow(userId: number) {
        return instance.delete<APIResponseType>(`follow/${userId}`).then(res => res.data) as Promise<APIResponseType>;
    }
};
