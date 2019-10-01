/**
 * @class for the core-hello tag/element
 */
class HelloWorldElement extends HTMLElement {
  /**
   * HelloWorldElement
   * @constructor
   */
  constructor () {
    super();

    /** Attributes:
     * lang: ['en', 'sp', 'jp'] as String   (english by default)
     * rainbow:  as String  (no rainbow by deafult)
     * font-size:
     * font-family:
     **/
    // Set default values for attributes
    // this.lang = "en";
    /** @member {String}  */
    this.rainbow = '}';

    /** @member {String} */
    this.fontSize = '12px';

    /** @member {String} */
    this.fontFamily = 'Open Sans';

    /** @member {Object} */
    this.helloMap = { 'en': 'Hello World', 'sp': 'Hola Mundo', 'fr': 'Bonjour le Monde' };

    /** @member {String} */
    this.helloString = this.helloMap['en'];

    /** @member {Object} */
    this.langAvailable = ['en', 'sp', 'fr'];

    // initialize CSS for rainbow effect
    this.initializeRainbowCSS();
    // Set the attributes and name based on user config
    this.initUserAttribute();
    this.name = this.innerHTML;

    // Add Shadow DOM
    const shadowRoot = this.attachShadow({
      mode: 'open'
    });
    let elementContent = `
        <style>
            h1{
                font-size: ${this.fontSize};
                font-family: ${this.fontFamily};
                ${this.rainbow};
        </style>
        <h1 >${this.helloString} ${this.name}</h1>`;
    shadowRoot.innerHTML = elementContent;
  }

  /**
   * Initializes attributes of web component
   */
  initUserAttribute () {
    // If user entered a language, set lang if available
    let userLanguage = this.lang;
    if (!this.langAvailable.includes(userLanguage)) {
      this.lang = 'en';
      this.helloString = this.helloMap[this.lang];
    } else {
      this.helloString = this.helloMap[this.lang];
    }

    // Set rainbow if user configuers rainbow attribute
    if (this.hasAttribute('rainbow')) {
      this.rainbow = this.rainbowCSS;
    }

    // Sets font-size if configured
    let attr = this.getAttribute('font-size');
    if (attr) {
      this.fontSize = attr;
    }

    // Sets font-family if configured
    attr = this.getAttribute('font-family');
    if (attr) {
      this.fontFamily = attr;
    }
  }
  initializeRainbowCSS () {
    // CSS attributes
    /** @member {String} */
    this.rainbowCSS = `
      transform: translateY(-50%); white-space: nowrap;
      animation: textAnimate 5s linear infinite alternate;
      background: linear-gradient( 92deg, #95d7e3, #eb76ff );
      background: -webkit-linear-gradient( 92deg, #95d7e3, #eb76ff );
      background-size:600vw 600vw;
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      &::after {
        position: absolute; content: attr(data-text);
        left: 0; right: 0; background: none;
        box-shadow: 2px 4px 2px rgba(0,0,0,0.50);
        z-index: -1;
      }
    }
    @keyframes textAnimate {
      from {
        filter: hue-rotate(0deg); background-position-x: 0%;
      }
      to {
        filter: hue-rotate(360deg);
        background-position-x: 600vw;
      }
    }`;
  }
}

window.customElements.define('core-hello', HelloWorldElement);
