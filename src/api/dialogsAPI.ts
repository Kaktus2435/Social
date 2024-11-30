import { instance } from "./api.ts";

type DialogType = {
    userId: number;
    name: string;
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
    startChatting(userId: number) {
        return instance.put(`dialogs/${userId}`).then((res) => res.data)
    }
};
