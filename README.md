# LitInlineCss

Me likes seperate CSS files. This project fills the gaps in typed-css-modules with rollup. **note that this is a project that is still under development and does not yet have any stable releases**

## How it works

### Example input - output

```JS
import { LitElement, html } from 'lit-element'
import { classMap } from 'lit-element/directives/class-map'
import style from './style.css'

class ExampleComponent extends LitElement {
  render() {
    const classes = classMap({
      [style.a]: this.isA,
      [style['a-b']]: this.isAB,
    })

    /* ... */
  }
}
ExampleComponent.styles = style
```

```JS
import { LitElement, html, css } from 'lit-element'
import { classMap } from 'lit-element/directives/class-map'

class ExampleComponent extends LitElement {
  render() {
    const classes = classMap({
      'a': this.isA,
      'a-b': this.isAB,
    })

    /* ... */
  }
}
ExampleComponent.styles = css`.a { display: block; } .a-b { display: inline; }`
```

### Typescript

You can either generate typings (`.d.ts`) files or declare a module (`declare module '*.css'`) so that you can import the styles without warnings.
