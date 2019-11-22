export const deviceTypes = [
    {
        deviceIconUrl: require('@/assets/img/icons/common_plug.png'),
        deviceId: new Date().getTime() + 1,
        deviceName: "công tắc",
        deviceType: 'switch',
        buttons: ['minus', 'plus']
    },
    {
        deviceIconUrl: require('@/assets/img/icons/o-cam.png'),
        deviceId: new Date().getTime() + 2,
        deviceName: 'Ổ cắm',
        deviceType: 'timerSocket',
        buttons: ['minus', 'plus', 'back']
    },
    {
        deviceIconUrl: require('@/assets/img/icons/common_plug.png'),
        deviceId: new Date().getTime() + 3,
        deviceName: 'Ổ cắm',
        deviceType: 'timerSocket2',
        buttons: ['minus', 'plus', 'next', 'back']
    }
]
