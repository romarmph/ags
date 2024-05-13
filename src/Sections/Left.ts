import Wallpapers from "src/Panels/Wallpapers"

const HyprlandService = await Service.import("hyprland");


const AppGrid = Widget.Button({
  attribute: Wallpapers(),
  className: "bar-button",
  cursor: "pointer",
  child: Widget.Icon({
    icon: "menu",
    size: 22,
  }),
  onClicked: (self) => self.attribute.toggle(),
});

const WorkspaceIndicator = Widget.Box({
  className: "workspace_indicator",
  spacing: 6,
  children: Array.from({ length: 7 }).map((_, i) =>
    Widget.Button({
      className: "workspace",
      hpack: "center",
      cursor: "pointer",
      onPrimaryClick: () =>
        HyprlandService.message(`dispatch workspace ${i + 1}`),
    }).hook(HyprlandService.active.workspace, (self) =>
      self.toggleClassName(
        "active",
        HyprlandService.active.workspace.id === i + 1
      )
    )
  ),
});

export default function() {
  return Widget.Box({
    hpack: "start",
    children: [AppGrid, WorkspaceIndicator],
  });
}
