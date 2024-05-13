import PanelController from "src/Utils/PanelController";
import { wallpaperPanelRevealer } from "./revealers";
import WallpaperService from "src/Services/Wallpaper";

const WALLPAPERS_PATH = `/home/${Utils.exec("whoami")}/.config/swww`;

function Wallpaper(wallpaper) {
  return Widget.Button({
    className: 'wallpaper',
    cursor: 'pointer',
    onClicked: () => {
      WallpaperService.set(`${WALLPAPERS_PATH}/${wallpaper}`);
    },
    child: Widget.Overlay({
      className: 'overlay',
      child: Widget.Box(),
      overlays: [
        Widget.Icon({
          className: 'img',
          icon: WALLPAPERS_PATH + "/" + wallpaper,
          size: 450
        })
      ]
    }),
  })
}

export default function() {
  App.addWindow(
    Widget.Window({
      name: "wallpaper-panel",
      layer: "overlay",
      monitor: 1,
      anchor: ['top', 'left', 'bottom'],
      margins: [8, 0, 8, 8],
      child: Widget.Box({
        hexpand: true,
        vexpand: true,
        className: "widget-container",
        child: Widget.Revealer({
          hexpand: true,
          revealChild: wallpaperPanelRevealer.bind(),
          transition: 'slide_down',
          transitionDuration: 200,
          child: Widget.Scrollable({
            vexpand: true,
            hexpand: true,
            css: "padding: 0.1px;",
            child: Widget.Box({
              className: "widget wallpaper",
              vertical: true,
              hexpand: true,
              spacing: 12,
              widthRequest: 400,
              children: Utils.exec(`ls ${WALLPAPERS_PATH}`).split("\n").map(Wallpaper),
            })
          }),
        }),
      }),
    })
  )

  return PanelController(wallpaperPanelRevealer);
}
