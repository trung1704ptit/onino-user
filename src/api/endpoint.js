export const baseEndpoint = 'https://api-stg.onino.vn/base';

// user
export const userEndpoint = {
    userRegisterEndpoint: `${baseEndpoint}/user/register`,
    userLoginEndpoint: `${baseEndpoint}/user/login`,
    updateUserProfileEndpoint: `${baseEndpoint}/user/updateUserProfile`,
    uploadAvatarEndpoint: `${baseEndpoint}/user/uploadAvatar`,
}