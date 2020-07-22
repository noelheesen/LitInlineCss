import { LitElement, html } from 'lit-element'
import { classMap } from 'lit-html/directives/class-map'
import classmap from './styles/css/classmap.css'

class LitClassmap extends LitElement {
  render() {
    const classes = classMap({
      [classmap.a]: true,
      [classmap['a-b']]: true,
    })

    return html`<div class="${classes}">LitClassmap</div>`
  }
}

customElements.define('lit-classmap', LitClassmap)
