import request from '@/utils/request';
import { publicEndpoint } from './endpoint';

export function getDeviceIcons() {
    return request({
        url: publicEndpoint.deviceIconsEndpoint,
        method: 'get'
    })
}

export function getGroupIcons() {
    return request({
        url: publicEndpoint.groupIconsEndpoint,
        method: 'get'
    })
}