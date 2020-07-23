import LIT, { css } from 'lit-element';

class LitDefault extends LIT.LitElement {
  render() {
    return LIT.html`
      <div>LitNamespaced</div>
    `
  }
}

LitDefault.styles = css`.map { display: block; }`;
customElements.define('lit-default', LitDefault);
