export const oninoEndpoint = 'https://api-stg.onino.vn';
export const baseEndpoint = `${oninoEndpoint}/base`;
export const publicEndpoint = `${baseEndpoint}/public`;

// user
export const userEndpoint = {
    userRegisterEndpoint: `${baseEndpoint}/user/register`,
    userLoginEndpoint: `${oninoEndpoint}/uaa/oauth/token`,
    updateProfileEndpoint: `${baseEndpoint}/user/updateProfile`,
    uploadAvatarEndpoint: `${baseEndpoint}/user/uploadAvatar`,
    userVerifyEndpoint: `${baseEndpoint}/user/verify`,
    userProfileEndpoint: `${baseEndpoint}/user/getRegistry`,
}

export const roomEndpoint = {
    groupIconsEndpoint: `${publicEndpoint}/groupIconsList`
}

export const authorizeHeader = 'YnJvd3NlcjoxMjM0';