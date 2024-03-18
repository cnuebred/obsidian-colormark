import ColorMark from "main"
import { App, Notice, PluginSettingTab, Setting } from "obsidian"

export class ColorMarkSettings extends PluginSettingTab {
	plugin: ColorMark
	current_font_color:string
	current_background_color:string
	constructor(app: App, plugin: ColorMark) {
		super(app, plugin)
		this.plugin = plugin
		this.plugin.settings.custom_colors = []
	}

	display(): void {
		const { containerEl } = this
		containerEl.empty()
		const set = () => new Setting(containerEl)
	}
}
