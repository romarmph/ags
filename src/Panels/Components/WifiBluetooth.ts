const NetworkService = await Service.import("network");
const BluetoothService = await Service.import("bluetooth");

const SSID = Variable("No connection", {
  poll: [1000, () => NetworkService.wifi.ssid],
});

const BLUETOOTH = Variable("No device connected", {
  poll: [1000, () => {
    if (!BluetoothService.connected_devices.length) return "No device";
    return BluetoothService.connected_devices.map(device => device.name).join(", ");
  }],
})

const Button = ({ icon, label, onClicked, wlabel }) => {
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
          wlabel,
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
        wlabel: Widget.Label({
          label: SSID.value,
          css: "font-size: 12px; color: #666;",
          xalign: 0,
        }),
        onClicked: () => { }
      }),
      Button({
        icon: 'bluetooth-active-symbolic',
        label: 'Bluetooth',
        wlabel: Widget.Label().poll(1000, (self) => {
          self.label = BLUETOOTH.value;
          self.css = "font-size: 12px; color: #666;";
          self.xalign = 0;
        }),
        onClicked: () => { }
      }),
    ],
  })
}
