import { LitElement, html } from 'lit-element'
import { classMap } from 'lit-html/directives/class-map'
import classmap from './styles/css/classmap.css'

class LitClassmapInline extends LitElement {
  render() {
    return html`
      <div
        class=${classMap({
          [classmap.a]: true,
          [classmap['a-b']]: true,
        })}
      >
        LitClassmapInline
      </div>
    `
  }
}

customElements.define('lit-classmap-inline', LitClassmapInline)
