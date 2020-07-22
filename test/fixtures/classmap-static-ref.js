import { LitElement, html } from 'lit-element'
import { classMap } from 'lit-html/directives/class-map'
import classmap from './styles/css/classmap.css'

const classes = {
  [classmap.a]: true,
  [classmap['a-b']]: true,
}

class ClassmapStaticRef extends LitElement {
  render() {
    return html` <div class=${classMap(classes)}>ClassmapStaticRef</div> `
  }
}

export default ClassmapStaticRef
