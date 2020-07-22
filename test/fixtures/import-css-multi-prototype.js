import { LitElement, html } from 'lit-element'
import base from './styles/css/base.css'
import map from './styles/css/map.css'

class SingleComponent extends LitElement {
  render() {
    return html`<div>Single Component</div>`
  }
}

SingleComponent.styles = [base, map]

customElements.define('s-c', SingleComponent)
