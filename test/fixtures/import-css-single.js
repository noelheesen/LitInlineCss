import { LitElement, html } from 'lit-element'
import styles from './styles/css/map.css'

class SingleComponent extends LitElement {
  render() {
    return html`<div>Single Component</div>`
  }
}

SingleComponent.styles = styles

customElements.define('s-c', SingleComponent)
