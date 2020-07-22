import * as LIT from 'lit-element'
import a from './styles/css/map.css'

class LitNamespaced extends LIT.LitElement {
  render() {
    return LIT.html`
      <div>LitNamespaced</div>
    `
  }
}

LitNamespaced.styles = a
customElements.define('lit-namespaced', LitNamespaced)
