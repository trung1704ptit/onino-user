export const oninoEndpoint = 'https://api-stg.onino.vn';
export const baseEndpoint = `${oninoEndpoint}/base`;
export const publicBaseEndpoint = `${baseEndpoint}/public`;

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
    groupIconsEndpoint: `${publicBaseEndpoint}/groupIconsList`,
    createRoomEndpoint: `${baseEndpoint}/group/create`,
    getAllRoomEndpoint: `${baseEndpoint}/group/getAll`,
    deleteRoomEndpoint: `${baseEndpoint}/group/delete`,
    groupEndpoint: `${baseEndpoint}/group`,
    updateRoomEndpoint: `${baseEndpoint}/group/update`,
    getRoomDevicesEndpoint: `${baseEndpoint}/group/update`,
}

export const publicEndpoint = {
    deviceIconsEndpoint: `${publicBaseEndpoint}/deviceIconsList`,
    groupIconsEndpoint: `${publicBaseEndpoint}/groupIconsList`,
}

export const deviceEndpoint = {
    deviceListEndpoint: `${baseEndpoint}/device/getAll`
}

export const authorizeHeader = 'YnJvd3NlcjoxMjM0';