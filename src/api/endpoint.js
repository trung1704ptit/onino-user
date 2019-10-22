export const oninoEndpoint = 'https://api-stg.onino.vn';
export const baseEndpoint = `${oninoEndpoint}/base`;

// user
export const userEndpoint = {
    userRegisterEndpoint: `${baseEndpoint}/user/register`,
    userLoginEndpoint: `${oninoEndpoint}/uaa/oauth/token`,
    updateUserProfileEndpoint: `${baseEndpoint}/user/updateUserProfile`,
    uploadAvatarEndpoint: `${baseEndpoint}/user/uploadAvatar`,
    userVerifyEndpoint: `${baseEndpoint}/user/verify`,
    userProfileEndpoint: `${baseEndpoint}/user/getRegistry`,
}

export const authorizeHeader = 'YnJvd3NlcjoxMjM0';