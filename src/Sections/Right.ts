import Calendar from "src/Panels/Calendar";
import ControlPanel from "src/Panels/ControlPanel";

const BluetoothService = await Service.import("bluetooth");
const NotificationService = await Service.import("notifications");
const BatteryService = await Service.import("battery");


const TimeIndicator = Widget.Button({
	attribute: Calendar(),
	className: "time_indicator",
	hpack: "center",
	child: Widget.Label().poll(
		1000,
		(self) => {
			const date = new Date();
			const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
			const time = date.toLocaleTimeString().split(" ")[0].split(":").slice(0, 2).join(":") + " " + date.toLocaleTimeString().split(" ")[1];
			self.set_text(days[date.getDay()] + " " + time);
			self.css = "font-weight: 600";
		}
	),
	onClicked: (self) => self.attribute.toggle(),
});

const ControlPanelIndicator = Widget.Button({
	className: "control_button",
	attribute: ControlPanel(),
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
			Widget.Icon({
				icon: 'display-brightness-symbolic',
				size: 14,
			}),
		],
	}),
	onClicked: (self) => self.attribute.toggle(),
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


const BatteryIcon = (charging: boolean) => Widget.Icon({
	icon: BatteryService.bind("percent").as(percent => {
		const roundedBatteryLevel = Math.round(percent / 10) * 10;
		const batteryState = charging ? "-charging" : "";
		return "battery-level-" + roundedBatteryLevel + batteryState + "-symbolic";
	}),
});

const BatteryIndicator = Widget.Button({
	className: "control_button",
	child: Widget.Box({
		spacing: 4,
		children: [
			Widget.Stack({
				children: {
					charging: BatteryIcon(true),
					discharging: BatteryIcon(false),
				},
				shown: BatteryService.bind("charging").as(charging => charging ? "charging" : "discharging"),
			}),
			Widget.Label({
				label: BatteryService.bind("percent").as(percent => percent + "%"),
				css: "font-size: 12px;",
			}),
		],
	}),
})

export default function() {
	return Widget.Box({
		hpack: "end",
		children: [
			ControlPanelIndicator,
			BatteryIndicator,
			TimeIndicator,
			NotificationIndicator,
		],
	});
}
