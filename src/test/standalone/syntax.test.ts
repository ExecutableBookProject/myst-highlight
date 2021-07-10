"use strict"
import * as assert from "assert"
import * as fs from "fs"
import MarkdownIt from "markdown-it"
import * as path from "path"
import { mystBlockPlugin } from "../../mdPlugins"

suite("Syntax Fixtures: MyST Blocks", () => {
  const fixtures = fs.readFileSync(
    path.join(__dirname, "../../../test_static/syntax-fixtures", "myst_block.md"),
    "utf8"
  )
  const mdit = MarkdownIt("commonmark").use(mystBlockPlugin)
  fixtures
    .split(/\n\r?\.\n\r?\n\r?/)
    .map(s => s.split(/\n\r?\.\n\r?/))
    .forEach(([name, text, expected]) => {
      test(name, () => {
        const rendered = mdit.render(text)
        assert.equal(rendered.trim(), expected.trim())
      })
    })
})
