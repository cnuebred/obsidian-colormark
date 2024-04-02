import { App, Editor, Menu, Modal, Notice, Plugin} from 'obsidian'
import { font_color_mark__basic_extension } from 'src/extension/mark';
import { ColorMarkSettings } from 'src/settings';
import { DEFAULT_SETTINGS } from 'src/static';


export default class ColorMark extends Plugin {
	settings: any // TODO

	async onload() {
		this.registerEditorExtension(font_color_mark__basic_extension())
		this.registerMarkdownPostProcessor((element, context) => {
			const COLOR_SYNTAX_QUERY_REGEX = /(?<!\=\")(\{(\#(.*?))?(\$(.*?))?\|)([\s\S]+?)(\})/g
			let match

			const replace_key = (...match:string[]) => {
					return `<span style="color:#${match[3]};background-color:#${match[5]};padding:1px;border-radius:3px">${match[6]}</span>`
				}

			while ((match = COLOR_SYNTAX_QUERY_REGEX.exec(element.innerHTML || '')) !== null) {
				element.innerHTML = element.innerHTML?.replace(
					COLOR_SYNTAX_QUERY_REGEX, 
					replace_key
				)}
		});

		await this.loadSettings()
				
		this.registerEvent(
			this.app.workspace.on("editor-menu", (menu, editor) => {
				menu.addSeparator()
				menu.addItem((item) => {
					item.setTitle('🎨 font color')
					item.onClick((evt) => {
					showColorSubMenu(editor, 'font').showAtMouseEvent(evt as MouseEvent)
					})
				})
				menu.addItem((item) => {
					item.setTitle('🖌️ background color')
					item.onClick((evt) => {
					showColorSubMenu(editor, 'background').showAtMouseEvent(evt as MouseEvent)
					})
				})
			})
			)
			//this.addSettingTab(new ColorMarkSettings(this.app, this))
		}
	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData())
	}
	async saveSettings() {
		await this.saveData(this.settings)
	}
}

const showColorSubMenu = (editor: Editor, type: 'font' | 'background'): Menu => {
	// Definicje kolorów
	const colors = {
    'Red 🟥': 'ff0000',
    'Green 🟩': '00ff00',
    'Blue 🟦': '0000ff',
    'Yellow 🟨': 'ffff00',
    'Purple 🟪': '800080',
    'Orange 🟧': 'ffa500',
    'Black ⬛': '000000',
    'White ⬜': 'ffffff',
    'Pink 🌸': 'ffc0cb',
    'Cyan 🔷': '00ffff',
    'Magenta 🟣': 'ff00ff',
    'Lime 💚': '00ff00',
    'Teal 🟩': '008080',
    'Indigo 💙': '4b0082',
    'Maroon 🟤': '800000',
    'Navy 🔵': '000080',
    'Olive 🟢': '808000',
    'Silver ⚪': 'c0c0c0',
    'Gold 🟡': 'ffd700',
    'Turquoise 🟦': '40e0d0',
    'Violet 🟪': 'ee82ee'
};

	const prefix  = type == 'font' ? '#' : type == 'background' ? '$' : ''
	const colorMenu = new Menu();

	Object.entries(colors).forEach(([colorName, colorHex]) => {
			colorMenu.addItem((item) => 
					item.setTitle(colorName)
							.onClick((evt) => applyColor(editor, prefix + colorHex))
			);
	});
	return colorMenu
}

function applyColor(editor: Editor, colorHex: string) {
	const selectedText = editor.getSelection();
	if (!selectedText) {
			new Notice('No text selected.');
			return;
	}
	const coloredText = `{${colorHex}|${selectedText}}`;
	editor.replaceSelection(coloredText);
}