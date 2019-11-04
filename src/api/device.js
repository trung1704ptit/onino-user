import request from '@/utils/request';
import { deviceEndpoint } from './endpoint';

export function getDeviceList() {
    return request({
        url: deviceEndpoint.deviceListEndpoint,
        method: 'get'
    })
}

export function updateDevice(data) {
    return request({
        url: deviceEndpoint.updateDeviceEndpoint,
        method: 'put',
        data
    })
}

export function registerDevice(data) {
    return request({
        url: deviceEndpoint.registerDeviceEndpoint,
        method: 'post',
        data
    })
}