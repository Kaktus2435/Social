import { instance } from "./api.ts";


export const homeAPI = {
    getUsersHome() {

        return instance.get(`users`)
            .then(response => response.data);
    }
};
