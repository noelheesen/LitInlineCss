import LIT, { html } from 'lit-element'
import a from './styles/css/map.css'

class LitDefaultNamed extends LIT.LitElement {
  render() {
    return html` <div>LitDefaultNamed</div> `
  }
}

LitDefaultNamed.styles = a
customElements.define('lit-default-named', LitDefaultNamed)
