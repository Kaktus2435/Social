import { instance } from "./api.ts";

type GetCaptchaUrlResponseType = {
    url: string
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<GetCaptchaUrlResponseType>(`security/get-captcha-url`).then(res => res.data);
    }
};

/* import { APIResponseType, instance, ResultCodeEnum } from "./api.ts";

type GetCaptchaUrlResponseType = {
    url: string
}

export const securityAPI = {
    
        getCaptchaUrl() {
            return instance.get(`security/get-captcha-url`).then((response: {
                data: APIResponseType<ResultCodeEnum, GetCaptchaUrlResponseType>
            }) => {
                return response.data as APIResponseType<ResultCodeEnum, GetCaptchaUrlResponseType>
            })
        },
    };
 */