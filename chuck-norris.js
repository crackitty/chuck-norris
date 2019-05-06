import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `chuck-norris`
 * An element that shows random chuck norris jokes
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class ChuckNorris extends PolymerElement {
  static get template() {
    return html`<style>
        :host {
          display: block;
        }
      </style>
      <div>[[joke]]</div>`;
  }

  static get properties() {
    return {
      joke: { 
        type: String,
        value: 'Waiting for Chuck to say something funny...', 
      },
    };
  }


  static get is() {
    return 'chuck-norris'
  }
}

window.customElements.define(ChuckNorris.is, ChuckNorris);
