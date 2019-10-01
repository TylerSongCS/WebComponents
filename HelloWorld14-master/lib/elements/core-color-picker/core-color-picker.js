/**
 * Represents the core-color-picker web component
 * @class ColorPicker
 */
class ColorPicker extends HTMLElement {
  /**
     * Creates HTML template with CSS for slider component.
     * @returns {Element} HTML template element with CSS for slider component.
     */
  createTemplate () {
    const template = document.createElement('template');

    // importing pair-slider and pair-button
    var importedSlider = document.createElement('script');
    var importedButton = document.createElement('script');
    importedSlider.src = '../lib/elements/pair-slider/pair-slider2.js';
    document.head.appendChild(importedSlider);
    importedButton.src = '../lib/elements/pair-button/pair-button.js';
    document.head.appendChild(importedButton);

    template.innerHTML = `
    <style>
      /* The Modal (background) */
      .modal {
        display: none; /* Hidden by default */
        position: fixed; /* Stay in place */
        z-index: 1; /* Sit on top */
        padding-top: 100px; /* Location of the box */
        left: 0;
        top: 0;
        width: 100%; /* Full width */
        height: 100%; /* Full height */
        overflow: auto; /* Enable scroll if needed */
        background-color: rgb(0,0,0); /* Fallback color */
        background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
      }
      /* Modal Content */
      .modal-content {
        background-color: #fefefe;
        margin: auto;
        padding: 20px;
        border: 1px solid #888;
        width: 80%;
      }
      /* The Close Button */
      .close {
        color: #aaaaaa;
        float: right;
        font-size: 28px;
        font-weight: bold;
      }
      .close:hover,
      .close:focus {
        color: #000;
        text-decoration: none;
        cursor: pointer;
      }
      .container {
        display: flex;
        margin: 20px;
        padding: 20px;
      }
      .sliderContainer{
        width: 80%;
        display: inline-block;
      }
      .valueContainer {
        width: 20%;
        display: inline-block;
        display: inline-block;
        padding: 20px;
        margin: 20px 0px 20px 80px;
      }
      .colorContainer {
        height: var(--height, 80%);
        width: var(--width, 100%);
        background-color: red;
      }
      .colorHexa {
        position: relative;
        top: -40px;
        text-align: center;
      }
      .colorHexa input {
        width: 50%;
      }
    </style>
    <div id="modalId" class="modal">
      <!-- Modal content -->
      <div class="modal-content">
        <span class="close">&times;</span>
        <div id="colorPicker" class="container">
          <div class="sliderContainer">
            <pair-slider id="redSlider" min="0" max="255" danger=""></pair-slider>
            <pair-slider id="greenSlider" min="0" max="255" success=""></pair-slider>
            <pair-slider id="blueSlider" min="0" max="255" primary=""></pair-slider>
          </div>
          <div class="valueContainer">
            <div id="colorBox" class="colorContainer"></div>
            <div class="colorHexa"><input id="colorText" class="hexaInput" type="text" value="#FFFFFFF"/></div>
          </div>
        </div>
      </div>
    </div>
    <pair-button id='colorButton'>Select Color</pair-button>`;
    return template;
  }

  constructor () {
    super();

    // Set default values for attributes
    /** @member {boolean} */
    this.disabled = false;

    /** @member {String} */
    this.label = '';

    /** @member {String} */
    this.type = '';

    // Create shadow root and append template for slider
    this.root = this.attachShadow({
      mode: 'open'
    });
    this.root.appendChild(this.createTemplate().content.cloneNode(true));
  }

  /**
   * Initializes label value for color picker if user provides a value for the label attribute.
   * Otherwise, default of the empty string '' is used.
   */
  initLabel () {
    if (this.hasAttribute('label')) {
      // create and add the label
      var l = document.createElement('LABEL');
      l.innerText = this.getAttribute('label');
      l.setAttribute('for', 'colorPicker');
      this.shadowRoot.insertBefore(l, this.shadowRoot.getElementById('#colorPicker'));
    }
  }

  /**
   * If configured, set disabled attribute.
   * The disabled attribute turns the sliders grey and makes them immutable.
   */
  initDisabled () {
    // Set disabled attribute
    if (this.hasAttribute('disabled')) {
      this.disabled = true;
      this.shadowRoot.querySelector('#redSlider').setAttribute('disabled', '');
      this.shadowRoot.querySelector('#greenSlider').setAttribute('disabled', '');
      this.shadowRoot.querySelector('#blueSlider').setAttribute('disabled', '');
    } else {
      this.disabled = false;
      this.shadowRoot.querySelector('#redSlider').disabled = this.disabled;
      this.shadowRoot.querySelector('#greenSlider').disabled = this.disabled;
      this.shadowRoot.querySelector('#blueSlider').disabled = this.disabled;
      // this.shadowRoot.querySelector('#greenSlider').setAttribute('disabled', '');
      // this.shadowRoot.querySelector('#blueSlider').setAttribute('disabled', '');
    }
  }

  /**
   * Initializes height value for color box if user provides a value for the height attribute.
   * Otherwise, default height value of 80% is used.
   */
  initHeight () {
    // if there is a height attribute set by the user
    if (this.hasAttribute('height')) {
      // get the height attribute
      var height = this.getAttribute('height');
      // set the height property to the user determined heigt
      this.shadowRoot.querySelector('.colorContainer').style.setProperty('--height', height);
    }
  }

  /**
   * Initializes width value for color box if user provides a value for the width attribute.
   * Otherwise, default width value of 100% is used.
   */
  initWidth () {
    // if there is a width attribute set by the user
    if (this.hasAttribute('width')) {
      // get the width attribute
      var width = this.getAttribute('width');
      // set the width property to the user determined height
      this.shadowRoot.querySelector('.colorContainer').style.setProperty('--width', width);
    }
  }

  /**
   * Initialize type property based on input attribute, sets color and text of box to init values
   * Otherwise, the default type if type is present is primary
   */
  initType () {
    if (this.hasAttribute('type')) {
      let type = this.getAttribute('type');
      if (type === 'primary') {
        this.shadowRoot.getElementById('colorBox').style.backgroundColor = '#007bff';
        this.shadowRoot.getElementById('colorText').value = '#007bff';
      } else if (type === 'secondary') {
        this.shadowRoot.getElementById('colorBox').style.backgroundColor = '#6c757d';
        this.shadowRoot.getElementById('colorText').value = '#6c757d';
      } else if (type === 'success') {
        this.shadowRoot.getElementById('colorBox').style.backgroundColor = '#28a745';
        this.shadowRoot.getElementById('colorText').value = '#28a745';
      } else if (type === 'danger') {
        this.shadowRoot.getElementById('colorBox').style.backgroundColor = '#dc3545';
        this.shadowRoot.getElementById('colorText').value = '#dc3545';
      } else if (type === 'warning') {
        this.shadowRoot.getElementById('colorBox').style.backgroundColor = '#ffc107';
        this.shadowRoot.getElementById('colorText').value = '#ffc107';
      } else if (type === 'info') {
        this.shadowRoot.getElementById('colorBox').style.backgroundColor = '#17a2b8';
        this.shadowRoot.getElementById('colorText').value = '#17a2b8';
      } else if (type === 'dark') {
        this.shadowRoot.getElementById('colorBox').style.backgroundColor = '#343a40';
        this.shadowRoot.getElementById('colorText').value = '#343a40';
      } else {
        this.shadowRoot.getElementById('colorBox').style.backgroundColor = '#007bff';
        this.shadowRoot.getElementById('colorText').value = '#007bff';
      }
      this.type = type;
    }
  }

  /**
   * Initializes attributes of web component by calling initilization methods.
   */
  initUserAttribute () { // FIXME: Missing initValue() funciton
    // Initialize each attribute
    this.initHeight();
    this.initWidth();
    this.initLabel();
    this.initDisabled();
    this.initType();
  }
  /**
   * Return hex code from rgb
   */
  rgbToHex (rgb) {
    var hex = Number(rgb).toString(16);
    if (hex.length < 2) {
      hex = '0' + hex;
    }
    return hex;
  }

  /**
   *
   * @param {int} r
   * @param {int} g
   * @param {int} b
   */
  fullColorHex (r, g, b) {
    var red = this.rgbToHex(r);
    var green = this.rgbToHex(g);
    var blue = this.rgbToHex(b);
    return red + green + blue;
  }

  /**
   * Following function to convert hexa to rgb
   */
  hexToR (h) {
    return parseInt((this.cutHex(h)).substring(0, 2), 16);
  }
  hexToG (h) {
    return parseInt((this.cutHex(h)).substring(2, 4), 16);
  }
  hexToB (h) {
    return parseInt((this.cutHex(h)).substring(4, 6), 16);
  }
  cutHex (h) {
    return (h.charAt(0) === '#') ? h.substring(1, 7) : h;
  }

  /**
     * Method that gets called when component is attached to the DOM. Calls initUserAttribute() to initialize attributes. Sets event listeners to update display value of slider and fill slider background according to the slider's current value.
     */
  connectedCallback () {
    this.initUserAttribute();
    let shadowRoot = this.shadowRoot;
    let modalBody = shadowRoot.getElementById('modalId');
    let button = shadowRoot.getElementById('colorButton');
    let span = shadowRoot.querySelector('.close');
    let redSlider = shadowRoot.querySelector('#redSlider');
    let greenSlider = shadowRoot.querySelector('#greenSlider');
    let blueSlider = shadowRoot.querySelector('#blueSlider');
    var hexa = this.fullColorHex(redSlider.value, greenSlider.value, blueSlider.value);
    let colorHexa = shadowRoot.getElementById('colorBox');
    let colorText = shadowRoot.getElementById('colorText');
    let self = this;
    var hexaText = '';

    button.addEventListener('click', function () {
      modalBody.style.display = 'block';
      console.log('click !');
    });
    span.addEventListener('click', function () {
      modalBody.style.display = 'none';
      console.log('span click');
    });
    shadowRoot.addEventListener('click', function (e) {
      if (e.target === modalBody) {
        modalBody.style.display = 'none';
      }
    });
    redSlider.addEventListener('input', function (e) {
      hexa = self.fullColorHex(redSlider.value, greenSlider.value, blueSlider.value);
      hexaText = '#' + hexa;
      colorHexa.style.backgroundColor = hexaText;
      colorText.value = hexaText;
      console.log('hexa' + hexa);

      // eslint-disable-next-line no-undef
      events.publish('colorChange', {
        color: hexaText
      });
    });
    greenSlider.addEventListener('input', function (e) {
      hexa = self.fullColorHex(redSlider.value, greenSlider.value, blueSlider.value);
      hexaText = '#' + hexa;
      colorHexa.style.backgroundColor = hexaText;
      colorText.value = hexaText;
      console.log('hexa' + hexa);

      // eslint-disable-next-line no-undef
      events.publish('colorChange', {
        color: hexaText
      });
    });
    blueSlider.addEventListener('input', function (e) {
      hexa = self.fullColorHex(redSlider.value, greenSlider.value, blueSlider.value);
      hexaText = '#' + hexa;
      colorHexa.style.backgroundColor = hexaText;
      colorText.value = hexaText;
      console.log('hexa' + hexa);
      console.log('blue event');

      // eslint-disable-next-line no-undef
      events.publish('colorChange', {
        color: hexaText
      });
    });
    colorText.addEventListener('input', function () {
      console.log('Text input');
      var hexText = colorText.value;
      let red = self.hexToR(hexText);
      let green = self.hexToG(hexText);
      let blue = self.hexToB(hexText);
      colorHexa.style.backgroundColor = hexaText;
      redSlider.changeValue(red);
      greenSlider.changeValue(green);
      blueSlider.changeValue(blue);
    });
  }

  /**
     * Defines which attributes that attributeChangedCallback will listen to for changes.
     */
  static get observedAttributes () {
    return ['disabled'];
  }

  /**
     * Invoked when one of the pair-slider's attributes is added, removed, or changed.
     * (when these attributes are changed in the dom)
     */
  attributeChangedCallback (attr, oldVal, newVal) {
    this.initDisabled();
  }
}

window.customElements.define('color-picker', ColorPicker);
