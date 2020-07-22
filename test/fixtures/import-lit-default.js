import LIT from 'lit-element'
import a from './styles/css/map.css'

class LitDefault extends LIT.LitElement {
  render() {
    return LIT.html`
      <div>LitNamespaced</div>
    `
  }
}

LitDefault.styles = a
customElements.define('lit-default', LitDefault)
