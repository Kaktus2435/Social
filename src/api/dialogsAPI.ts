import { instance } from "./api.ts";

type DialogType = {
    userId: number;
    name: string;
    messages: string[];
    userName: string;
    photos: {small: string};
    isActive: boolean;

};

export const dialogsAPI = {
    getDialogs(): Promise<DialogType[]> {
        return instance.get<DialogType[]>('dialogs')
            .then((res) => res.data);
    },
    postMessage(userId: number, message: string) {
        return instance.post(`dialogs/${userId}/messages`, {
            body: message,
        })
        .then((res) => res.data);
    },
    getMessagesListFriend(userId: number, currentPage: number, pageSize: number) {
/*         return instance.get(`dialogs/${userId}/messages?page=${currentPage}&count=${pageSize}`, {
 */         
         return instance.get(`dialogs/${userId}/messages`, { 
            
            params: {
                page: currentPage,
                count: pageSize,
            } 
        })
        .then((res) => res.data)
    },


    startChatting(userId: number) {
        return instance.put(`dialogs/${userId}`).then((res) => res.data)
    },
};

