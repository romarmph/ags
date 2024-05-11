import PanelController from "src/Utils/PanelController";
import { wallpaperPanelRevealer } from "./revealers";

const WallpaperList = Widget.Box({

})

export default function() {
  App.addWindow(
    Widget.Window({
      name: "control-panel",
      layer: "overlay",
      monitor: 1,
      anchor: ['bottom', 'right'],
      child: Widget.Box({
        hexpand: true,
        vexpand: true,
        className: "panel-container",
        child: Widget.Revealer({
          revealChild: wallpaperPanelRevealer.bind(),
          transition: 'slide_up',
          transitionDuration: 300,
          child: Widget.Box({
            className: "panel control-panel",
            hexpand: true,
            vertical: true,
            spacing: 12,
            vpack: "center",
            children: [
              Widget.Label("Wallpapers"),
            ],
          }),
        }),
      }),
    })
  )

  return PanelController(wallpaperPanelRevealer);
}
