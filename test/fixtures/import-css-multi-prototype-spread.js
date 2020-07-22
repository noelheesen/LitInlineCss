import { LitElement, html } from 'lit-element'
import styles from './styles/a.css'
import styles2 from './styles/b.css'

const WhyWouldYouDoThis = [styles2]

class SingleComponent extends LitElement {
  render() {
    return html`<div>Single Component</div>`
  }
}

SingleComponent.styles = [styles, ...WhyWouldYouDoThis]

customElements.define('s-c', SingleComponent)
