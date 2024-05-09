import PanelController from "src/Utils/PanelController";
import { allRevealers, calendarRevealer } from "./revealers";


export default function() {
  App.addWindow(
    Widget.Window({
      name: "calendar",
      layer: "overlay",
      anchor: ['bottom', 'right'],
      child: Widget.Box({
        css: 'padding: 0.1px',
        child: Widget.Revealer({
          revealChild: calendarRevealer.bind(),
          transition: 'slide_up',
          transitionDuration: 300,
          child: Widget.Calendar({
            className: "panel calendar",
            css: "padding: 10px",
            showDayNames: true,
            showWeekNumbers: false,
          }),
        }),
      }),
    })
  )

  return PanelController(calendarRevealer, allRevealers);
}
