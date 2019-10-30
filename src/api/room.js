import request from '@/utils/request';
import { roomEndpoint } from './endpoint';

export function getGroupIcons() {
    return request({
        url: roomEndpoint.groupIconsEndpoint,
        method: 'get'
    })
}