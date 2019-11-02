import request from '@/utils/request';
import { deviceEndpoint } from './endpoint';

export function getDeviceList() {
    return request({
        url: deviceEndpoint.deviceListEndpoint,
        method: 'get'
    })
}