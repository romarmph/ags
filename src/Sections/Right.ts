const BluetoothService = await Service.import("bluetooth");
const NotificationService = await Service.import("notifications");


const TimeIndicator = Widget.Button({
	className: "time_indicator",
	hpack: "center",
	child: Widget.Label().poll(
		1000,
		(self) => {
			const date = new Date();
			self.set_text(date.toLocaleString().split(", ").join(" | "));
		}
	),
});

const ControlPanelIndicator = Widget.Button({
	className: "control_button",
	child: Widget.Box({
		spacing: 12,
		children: [
			Widget.Icon({
				icon: "network-wireless-signal-excellent",
			}),
			Widget.Stack({
				shown: BluetoothService.bind('enabled').as(on => on ? 'active' : 'inactive'),
				children: {
					active: Widget.Icon({
						icon: "bluetooth-active-symbolic",
					}),
					inactive: Widget.Icon({
						icon: "bluetooth-disabled-symbolic",
					}),
				}
			}),
			Widget.Icon('audio-volume-high-symbolic'),
			Widget.Icon('battery-good-symbolic'),
			Widget.Icon({
				icon: 'display-brightness-symbolic',
				size: 14,
			}),
		],
	})
});

const NotificationIndicator = Widget.Button({
	className: "control_button",
	child: Widget.Stack({
		children: {
			empty: Widget.Icon({
				icon: "notifications",
			}),
			notifications: Widget.Box({
				spacing: 8,
				children: [
					Widget.Icon({
						icon: "notifications-disabled",
					}),
				],
			}),
		},
		shown: NotificationService.bind("popups").as(popups => {
			return popups.length > 0 ? "notifications" : "empty";
		}),
	}),
});

export default function() {
	return Widget.Box({
		hpack: "end",
		children: [
			ControlPanelIndicator,
			TimeIndicator,
			NotificationIndicator,
		],
	});
}
