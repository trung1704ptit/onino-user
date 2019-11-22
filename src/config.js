export const deviceTypes = [
    {
        deviceIconUrl: require('@/assets/img/icons/common_plug.png'),
        deviceId: new Date().getTime() + 1,
        deviceName: "công tắc",
        deviceType: 'switch',
        buttons: []
    },
    {
        deviceIconUrl: require('@/assets/img/icons/o-cam.png'),
        deviceId: new Date().getTime() + 2,
        deviceName: 'Ổ cắm',
        deviceType: 'timerSocket',
        buttons: []
    },
    {
        deviceIconUrl: require('@/assets/img/icons/common_plug.png'),
        deviceId: new Date().getTime() + 3,
        deviceName: 'Ổ cắm',
        deviceType: 'timerSocket2',
        buttons: []
    },
    {
        deviceIconUrl: require('@/assets/img/icons/parking-meter.png'),
        deviceId: new Date().getTime() + 3,
        deviceName: 'Công tơ điện tử',
        deviceType: 'smartMeter',
        buttons: ['minus', 'plus', 'next', 'back']
    },
    {
        deviceIconUrl: require('@/assets/img/icons/common_plug.png'),
        deviceId: new Date().getTime() + 3,
        deviceName: 'Ổ cắm',
        deviceType: 'airConditioner',
        buttons: ['minus', 'plus', 'dry', 'water']
    },
    {
        deviceIconUrl: require('@/assets/img/icons/temperature-sensor.png'),
        deviceId: new Date().getTime() + 3,
        deviceName: 'Cảm biến',
        deviceType: 'sensor',
        buttons: []
    },
    {
        deviceIconUrl: require('@/assets/img/icons/fan.png'),
        deviceId: new Date().getTime() + 3,
        deviceName: 'Quạt',
        deviceType: 'fan',
        buttons: ['minus', 'plus', 'dry', 'water']
    }
]
