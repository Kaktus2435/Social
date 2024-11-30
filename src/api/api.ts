import axios from "axios"
import { UserType } from "../types/types.ts"

export const instance = axios.create({
    withCredentials: true,
    headers: {
        "API-KEY": "babce031-0c17-4322-a4a4-67cefa0a6dc9"
    },
    baseURL: `https://social-network.samuraijs.com/api/1.0/`
})

export enum ResultCodeEnum {
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10
}
export type GetItemsType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}
export type APIResponseType<D = {}, RC = ResultCodeEnum> = {
    data: D;
    messages: Array<string>;
    resultCode: RC;

};
