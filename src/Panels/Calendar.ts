import PanelController from "src/Utils/PanelController";
import { allRevealers, calendarRevealer } from "./revealers";


export default function() {
  App.addWindow(
    Widget.Window({
      name: "calendar",
      layer: "overlay",
      monitor: 1,
      anchor: ['bottom', 'right'],
      child: Widget.Box({
        className: "panel-container",
        child: Widget.Revealer({
          revealChild: calendarRevealer.bind(),
          transition: 'slide_up',
          transitionDuration: 300,
          child: Widget.Calendar({
            className: "panel calendar",
            showDayNames: true,
            showWeekNumbers: false,
          }),
        }),
      }),
    })
  )

  return PanelController(calendarRevealer);
}
