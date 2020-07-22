import { LitElement, html } from 'lit-element'
import a from './styles/css/map.css'

class LitNamed extends LitElement {
  render() {
    return html` <div>LitNamed</div> `
  }
}

LitNamed.styles = a
customElements.define('lit-named', LitNamed)
