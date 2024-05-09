//@ts-nocheck
import Gtk from 'gi://Gtk?version=3.0'

const username = Utils.exec(`whoami`)
const Popover = Widget.subclass(Gtk.Popover);

function ShutdownButton() {
  const PowerMenu = Popover({
    setup: self => {
      self.set_relative_to(self)
      self.set_position(Gtk.PositionType.LEFT)
    },
    child: Widget.Box({
      spacing: 8,
      children: [
        Widget.Button({
          child: Widget.Icon({
            icon: 'system-shutdown-symbolic',
            size: 18
          }),
          onPrimaryClick: () => Utils.subprocess(
            [`systemctl`, `poweroff`],
            () => { }
          )
        }),
        Widget.Button({
          child: Widget.Icon({
            icon: 'system-restart-panel',
            size: 18
          }),
          onPrimaryClick: () => Utils.subprocess(
            [`systemctl`, `reboot`],
            () => { }
          )
        }),
        Widget.Button({
          child: Widget.Icon({
            icon: 'weather-clear-night-symbolic',
            size: 12
          }),
          onPrimaryClick: () => {
            PowerMenu.popdown()
            Utils.subprocess(
              [`bash`, `-c`, `systemctl suspend && swaylock`],
              () => { }
            )
          }
        }),
      ]
    })
  })

  return Widget.Button({
    className: 'shutdown_button',
    hpack: 'end',
    vpack: 'center',
    hexpand: true,
    child: Widget.Icon({
      icon: 'open-menu-symbolic',
      size: 20
    }),
    onClicked: () => PowerMenu.popup(),
    setup: (self) => {
      PowerMenu.set_relative_to(self)
      PowerMenu.set_position(Gtk.PositionType.LEFT)
    }
  })
}

export default function() {
  const Face = Widget.Box({
    className: 'face',
    widthRequest: 32,
    css: `background-image: url("/home/${username}/.face.jpg");`
      + "background-size: cover; background-position: center; background-repeat: no-repeat;",
  })

  const Username = Widget.Label({
    className: 'username',
    label: username,
    xalign: 0
  })

  const WM = Widget.Label({
    className: 'wm',
    label: 'HYPRLAND',
    xalign: 0
  })

  return Widget.Box({
    className: 'user_box',
    spacing: 12,
    hexpand: true,
    children: [
      Face,
      Widget.Box({
        className: 'details',
        vpack: 'center',
        spacing: 2,
        vertical: true,
        children: [
          Username,
          WM
        ]
      }),
      ShutdownButton()
    ]
  })
}
