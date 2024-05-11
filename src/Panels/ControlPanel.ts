import PanelController from "src/Utils/PanelController";
import BrightnessService from "src/Services/Brightness";
import { allRevealers, controlPanelRevealer } from "./revealers";
import UserHeader from "src/Panels/Components/UserHeader";
import MusicPlayer from "src/Panels/Components/MusicPlayer";
import WifiBluetooth from "./Components/WifiBluetooth";

const AudioService = await Service.import("audio");
const Mpris = await Service.import("mpris");

const Slider = ({ icon, value, onChange }) => {
  return Widget.Box({
    className: "slider-container",
    spacing: 8,
    children: [
      Widget.Icon(icon),
      Widget.Slider({
        value: value,
        onChange: onChange,
        className: "slider",
        drawValue: false,
        hexpand: true,
      })
    ]
  })
}


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
          revealChild: controlPanelRevealer.bind(),
          transition: 'slide_up',
          transitionDuration: 300,
          child: Widget.Box({
            className: "panel control-panel",
            hexpand: true,
            vertical: true,
            spacing: 12,
            vpack: "center",
            children: [
              UserHeader(),
              WifiBluetooth(),
              Mpris.players.length > 0 ? MusicPlayer() : Widget.Box(),
              Slider({
                icon: "audio-volume-high-symbolic",
                value: AudioService["speaker"].bind("volume"),
                onChange: ({ value }) => AudioService["speaker"].volume = value,
              }),
              Slider({
                icon: "display-brightness-symbolic",
                value: BrightnessService.bind("screen_value"),
                onChange: ({ value }) => BrightnessService.screen_value = value,
              }),
            ],
          }),
        }),
      }),
    })
  )

  return PanelController(controlPanelRevealer);
}
