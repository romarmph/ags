const NetworkService = await Service.import("network");
const BluetoothService = await Service.import("bluetooth");

const SSID = Variable("No connection", {
  poll: [1000, () => NetworkService.wifi.ssid],
});

const BLUETOOTH = Variable("No device connected", {
  poll: [1000, () => {
    if (BluetoothService.connected_devices.length) return "No device";
    return BluetoothService.connected_devices.toString();
  }],
})

const Button = ({ icon, label, connection, onClicked }) => {
  return Widget.Box({
    className: "connection_button",
    vexpand: false,
    vpack: "center",
    css: "padding: 8px;",
    spacing: 8,
    children: [
      Widget.Icon({
        icon: icon,
        size: 24,
        css: "padding: 8px; color: white; padding: 4px; border-radius: 50%; background-color: #386fd6;"
      }),
      Widget.Box({
        vertical: true,
        hpack: "start",
        vpack: "start",
        spacing: 4,
        children: [
          Widget.Label({
            label: label,
            css: "font-size: 14px; font-weight: 600;",
            xalign: 0,
          }),
          Widget.Label({
            label: connection,
            css: "font-size: 12px; color: #666;",
            maxWidthChars: 12,
            truncate: "end",
            xalign: 0,
          })
        ]
      })
    ]
  })
}

export default function() {
  return Widget.Box({
    className: 'connection_box',
    heightRequest: 48,
    hexpand: true,
    vexpand: true,
    homogeneous: true,
    spacing: 12,
    children: [
      Button({
        icon: 'network-wireless-signal-excellent',
        label: 'Wi-Fi',
        connection: SSID.value,
        onClicked: () => { }
      }),
      Button({
        icon: 'bluetooth-active-symbolic',
        label: 'Bluetooth',
        connection: BLUETOOTH.value,
        onClicked: () => { }
      }),
    ],
  })
}
