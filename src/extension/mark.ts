import { EditorView, Decoration, ViewPlugin, ViewUpdate } from "@codemirror/view"
import { Range } from "@codemirror/state"

const color_syntax_query_regex = () => new RegExp(/(\{(\#(.*?))?(\$(.*?))?\|)([\s\S]+?)(\})/g)

const font_color_mark__basic = ViewPlugin.fromClass(class {
  decorations
  constructor(view: EditorView) {
    this.decorations = this.createDecorationSet(view)
  }
  update(update: ViewUpdate) {
    if (update.docChanged ||
      update.viewportChanged ||
      (update.selectionSet && update.startState.selection?.main.from == update.startState.selection?.main.to))
      this.decorations = this.createDecorationSet(update.view)
  }
  createDecorationSet(view: EditorView) {
    let decorations = []

    for (let { from, to } of view.visibleRanges) {
      const text = view.state.doc.sliceString(from, to)
      const re = color_syntax_query_regex()
      let match
      while ((match = re.exec(text)) !== null) {
        const start = from + match.index
        const matchStart = start + match[1].length
        const matchEnd = matchStart + match[6].length
        this.isEditingInsideMarkers(decorations, view)
        if (match[2])
          decorations.push(
            Decoration.mark(
              { attributes: { style: `color:#${match[3]}` } }
            ).range(matchStart, matchEnd))
        if (match[4])
          decorations.push(
            Decoration.mark(
              { attributes: { style: `background-color:#${match[5]};padding:1px;border-radius:3px` } }
            ).range(matchStart, matchEnd))
      }
    }

    return Decoration.set(decorations, true)
  }
  isEditingInsideMarkers(decorations: Range<Decoration>[], view: EditorView) {
    const { from, to } = view.state.selection.main

    const doc = view.state.doc.toString()

    const re = color_syntax_query_regex()
    let match
    while ((match = re.exec(doc)) !== null) {
      const start = match.index
      const matchStart = start + match[1].length
      const matchEnd = matchStart + match[6].length
      const end = start + match[0].length
      if (!(from >= start && to <= end)) {
        decorations.push(Decoration.replace({}).range(start, matchStart))
        decorations.push(Decoration.replace({}).range(matchEnd, end))
      }
    }
  }
}, {
  decorations: v => v.decorations
})

export function font_color_mark__basic_extension() {
  return font_color_mark__basic
}


//SHOW window for remote changes - commits -> changed files

// this.registerEvent(
// 	this.app.workspace.on('editor-menu', (menu, editor: Editor) => {
// 		menu.addItem((item) => {
// 			item
// 				.setTitle("Get Block")
// 				.setIcon("block")
// 				.onClick(async () => {
// 					console.log(editor)
// 					console.log(editor.getScrollInfo())
// 					console.log(editor.getValue())
// 					console.log(editor.getLine(editor.listSelections()[0].head.line))
// 					console.log(editor.getDoc())
// 				})
// 		})
// 	})
// )
