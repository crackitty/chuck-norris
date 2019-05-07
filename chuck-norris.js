import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

/**
 * `chuck-norris`
 * An element that shows random chuck norris jokes
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class ChuckNorris extends PolymerElement {
  constructor() {
    super()
  }
  
  static get template() {
    return html`<style>
        :host {
          padding: 10px;
          display: block;
          border: solid black 1px;
          border-radius: 8px;
          font-family: Tahoma; font-size: 12pt;
        }
        .container {
          display: flex;
          flex-direction: row;
        }
        img {
          padding-right: 10px;
        }
        .icon { flex-grow: 0}
        .joke {
          flex-grow: 1;
        }
        .next {
          font-size: 8pt; padding: 8px;
        }
      </style>
      <div class="container">
        <div class="icon"><img src="[[joke.icon_url]]" /></div>
        <div class="joke">[[joke.value]]</div>
      </div>
      <div class="next">Next awesome joke in [[tminus]] seconds</div>
      `;
  }

  static get properties() {
    return {
      auto: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        observer: '_autoChanged'
      },
      every: {
        type: Number,
        value: 5,
        reflectToAttribute: true,
      },
      joke: { 
        type: Object,
        value: function() { return { 
            id: -1, 
            icon_url: 'https://assets.chucknorris.host/img/avatar/chuck-norris.png', 
            value: 'Waiting for Chuck...'
          } 
        },
      },
    };
  }

  async randomChuckJoke() {
    this.set('joke.value', 'Loading...');
    this.joke = await fetch('https://api.chucknorris.io/jokes/random')
      .then(response => response.json());
      this.tminus = this.every;
      this.canContinueCounting = true;
    }

  async _autoChanged(newValue, oldValue) {
    if (newValue === true) {
      this.canContinueCounting = true;
      await this.randomChuckJoke();
      
      this.restartCounter();
    }
  }

  restartCounter() {
    console.log('Clearing counter', this.counter);
    clearInterval(this.counter);

    this.counter = setInterval(async () => {
      let canContinueCounting = true;
      if (this.tminus == 0) {
        canContinueCounting = false;
        await this.randomChuckJoke();
        this.restartCounter();
      } else if (canContinueCounting) {
        this.tminus--;
      }
    }, 1000);
  }

  static get is() {
    return 'chuck-norris'
  }
}

window.customElements.define(ChuckNorris.is, ChuckNorris);
