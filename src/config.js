import commonPlug from '@/assets/img/icons/common_plug.png';
import oCam from '@/assets/img/icons/o-cam.png';

export const deviceTypes = [
     {
        deviceIconUrl: commonPlug,
        deviceId: new Date().getTime() + 1,
        deviceName: "công tắc",
        deviceType: 'switch'
    },
    {
        deviceIconUrl: oCam,
        deviceId: new Date().getTime() + 2,
        deviceName: 'Ổ cắm',
        deviceType: 'timerSocket'
    },
    {
        deviceIconUrl: commonPlug,
        deviceId: new Date().getTime() + 3,
        deviceName: 'Ổ cắm',
        deviceType: 'timerSocket2'
    }
]
