
const HyprlandService = await Service.import("hyprland");

const AppGrid = Widget.Button({
	className: "app_grid_btn",
	cursor: "pointer",
	child: Widget.Icon('view-grid-symbolic'),
})

const WorkspaceIndicator = Widget.Box({
	className: "workspace_indicator",
	spacing: 4,
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
	})
}
