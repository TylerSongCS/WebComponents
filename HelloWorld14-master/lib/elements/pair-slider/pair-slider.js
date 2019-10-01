/**
 * Represents the pair-slider web component
 * @class PairSlider
 */
class PairSlider extends HTMLElement {
  /**
   * Creates HTML template with CSS for slider component.
   * @returns {Element} HTML template element with CSS for slider component.
   */
  createTemplate () {
    const template = document.createElement('template');
    template.innerHTML = `
<style>
  .slider {
    -webkit-appearance: none;
    width: 100%;
    height: 6px;
    background: var(--background, linear-gradient(90deg, var(--active-color, #409eff) 50%, var(--inactive-color, #e4e7ed) 50%));
    outline: none;
    -webkit-transition: 0.2s;
    transition: opacity 0.2s;
    border-radius: 12px;
    cursor: pointer;
  }
  /* Chrome */
  .slider::-webkit-slider-thumb{
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    background: white;
    border-radius: 50%;
    border: 2px solid var(--thumb-color, var(--active-color, #409eff));
    cursor: pointer;
    transition: 0.2s;
  }
  /* Make thumb bigger on hover */
  .slider::-webkit-slider-thumb:hover{
    transform: var(--transform, scale(1.2));
  }
  /* Firefox */
  .slider::-moz-range-thumb{
    width: 20px;
    height: 20px;
    background: white;
    border-radius: 50%;
    border: 2px solid var(--thumb-color, var(--active-color, #409eff));
    cursor: pointer;
    transition: 0.2s;
  }
  /* Make thumb bigger on hover */
  .slider::-moz-range-thumb:hover{
    transform: var(--transform, scale(1.2));
  }

  .tooltip {

  }

  .tooltip .tooltiptext {
    visibility: hidden;
    width: 120px;
    background-color: black;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 5px;

    /* Position the tooltip */
    position: relative;
    top: -10px;
    left: 20px;
    z-index: 1;
  }

</style>
<div class="tooltip">
  <span id="sliderTooltip" class="tooltiptext">0</span>
</div>
  <input type="range" min="0" max="100" value="50" id="slider" class="slider">

<p><span>Value</span>: <span id="value">50</span></p>`;

    return template;
  }

  constructor () {
    super();

    // Set default values for attributes
    /** @member {boolean} */
    this.disabled = false;

    /**
     * Determine whether the tooltip is visible
    @member {boolean}
    @default */
    this.toolTipVisible = false; // if the tool tip is visible

    this.bindValues = {
      value: 0
    };

    /**
     * Stores the label for slider
    @member {String}
    @default */
    this.label = '';

    /**
     * Stores value of slider
    @member {int}
    @default */
    this.value = 50;

    // Create shadow root and append template for slider
    this.root = this.attachShadow({
      mode: 'open'
    });
    this.root.appendChild(this.createTemplate().content.cloneNode(true));
  }
  /**
   * Initializes the value name for slider if user provides the value in attribute. Otherwise, default of 50 is used.
   */
  initValueName () {
    if (this.hasAttribute('value-name')) {
      let outputBody = this.shadowRoot.querySelector('p');
      outputBody.querySelector('span').innerHTML = this.getAttribute('value-name');
    }
  }

  /**
   * Initializes the value for slider if user provides the value in attribute. Otherwise, default of 50 is used.
   */
  initValue () {
    if (this.hasAttribute('value')) {
      if (!isNaN(this.getAttribute('value'))) {
        this.value = this.getAttribute('value');
        console.log('no is nan');
        if (this.shadowRoot.querySelector('input').max) {
          let max = this.shadowRoot.querySelector('input').max;
          console.log(this.value);
          console.log(max);
          if (+this.value > +max) { // if user set value too high, set to max
            console.log('max too high');
            this.value = max;
          }
        }
        if (this.shadowRoot.querySelector('input').min) {
          let min = this.shadowRoot.querySelector('input').min;
          if (+this.value < +min) { // if user set value too low, set to min
            console.log('min too low');
            this.value = min;
          }
        }
        this.shadowRoot.querySelector('input').value = this.value;
        this.shadowRoot.querySelector('#value').innerHTML = this.value;
      }
    }
  }

  /**
   * Initializes minimum value for slider if user provides a value for the minimum attribute. Otherwise, default of 0 is used.
   */
  initMin () {
    if (this.hasAttribute('min')) {
      if (!isNaN(this.getAttribute('min'))) {
        this.shadowRoot.querySelector('input').min = this.getAttribute('min');
      }
    }
  }

  /**
   * Initializes maximum value for slider if user provides a value for the maximum attribute. Otherwise, default of 100 is used.
   */
  initMax () { // FIXME: put in check to make sure max> min
    if (this.hasAttribute('max')) {
      if (!isNaN(this.getAttribute('max'))) {
        this.shadowRoot.querySelector('input').max = this.getAttribute('max');
      }
    }
  }

  /**
   * Initializes label value for slider if user provides a value for the label attribute. Otherwise, default of the empty string '' is used.
   */
  initLabel () {
    if (this.hasAttribute('label')) {
      // console.log("label detected");
      var l = document.createElement('LABEL');
      l.innerText = this.getAttribute('label');
      l.setAttribute('for', 'slider');
      this.shadowRoot.insertBefore(l, this.shadowRoot.getElementById('slider'));
    }
  }

  /**
   * Initializes background fill for slider to fill relative to the slider's current value, min, and max.
   */
  initBackground () {
    // Get pointer to slider web component
    let shadowRoot = this.shadowRoot;
    let sliderBody = shadowRoot.querySelector('input');

    // Set the background fill
    let x = ((sliderBody.value - sliderBody.min) / (sliderBody.max - sliderBody.min)) * 100;
    let color = 'linear-gradient(90deg, var(--active-color, #409eff) ' + x + '%, var(--inactive-color, #e4e7ed) ' + x + '%)';
    sliderBody.style.setProperty('--background', color);
  }

  /**
   * If configured, set disabled attribute. The disabled attribute turns the slider grey and makes it immutable.
   */
  initDisabled () {
    let shadowRoot = this.shadowRoot;
    let sliderBody = shadowRoot.querySelector('input');

    // Disable slider and set disabled colors
    if (this.hasAttribute('disabled')) {
      // Set disabled attribute
      this.disabled = true;
      this.shadowRoot.querySelector('input').disabled = this.disabled;

      // Calculate the percentage to be filled and set disabled colors
      var z = ((sliderBody.value - sliderBody.min) / (sliderBody.max - sliderBody.min)) * 100;
      var color = 'linear-gradient(90deg, var(--disabled-color, #b2b3b7) ' + z + '%, var(--inactive-color, #e4e7ed) ' + z + '%)';
      sliderBody.style.setProperty('--background', color);

      // Disable the thumb color and magnification
      sliderBody.style.setProperty('--transform', 'scale(1)');
      sliderBody.style.setProperty('--thumb-color', 'var(--disabled-color, #b2b3b7)');
    } else { // Enable slider and set enabled colors
      // Remove disabled attribute
      this.disabled = false;
      this.shadowRoot.querySelector('input').disabled = this.disabled;

      // Calculate the percentage to be filled and set enabled colors
      var x = ((sliderBody.value - sliderBody.min) / (sliderBody.max - sliderBody.min)) * 100;
      color = 'linear-gradient(90deg, var(--active-color, #409eff) ' + x + '%, var(--inactive-color, #e4e7ed) ' + x + '%)';
      sliderBody.style.setProperty('--background', color);

      // Enable the thumb color and magnification
      sliderBody.style.setProperty('--transform', 'scale(1.2)');
      sliderBody.style.setProperty('--thumb-color', 'var(--active-color, #409eff)');
    }
  }

  /**
   * Initializes Bootstrap theme for Peter.
   */
  initBootstrapTheme () {
    let sliderBody = this.shadowRoot.querySelector('input');
    let bootstrapTheme = '';
    if (this.hasAttribute('primary')) {
      bootstrapTheme = '#007bff';
    } else if (this.hasAttribute('secondary')) {
      bootstrapTheme = '#6c757d';
    } else if (this.hasAttribute('success')) {
      bootstrapTheme = '#28a745';
    } else if (this.hasAttribute('danger')) {
      bootstrapTheme = '#dc3545';
    } else if (this.hasAttribute('warning')) {
      bootstrapTheme = '#ffc107';
    } else if (this.hasAttribute('info')) {
      bootstrapTheme = '#17a2b8';
    } else if (this.hasAttribute('dark')) {
      bootstrapTheme = '#343a40';
    }
    if (!bootstrapTheme) return;
    sliderBody.style.setProperty('--active-color', bootstrapTheme);
  }

  /**
   * init toot tip attribute
   * boolean toolTipVisible
   */
  initTooltipAttribute () {
    if (this.hasAttribute('tooltip')) {
      this.toolTipVisible = true;
    }
  }

  /**
   * Initializes attributes of web component by calling initilization methods.
   */
  initUserAttribute () { // FIXME: Missing initValue() funciton
    // Initialize each attribute
    this.initValueName();
    this.initMin();
    this.initMax();
    this.initValue();
    this.initBackground();
    this.initLabel();
    this.initDisabled();
    this.initBootstrapTheme();
    this.initTooltipAttribute();
  }

  /**
   * change value
   */
  changeValue (value) {
    console.log('in change value function');
    let shadowRoot = this.shadowRoot;
    let sliderBody = shadowRoot.querySelector('input');
    this.value = value;
    sliderBody.value = value;
    if (!this.disabled) {
      // Calculate the percentage to be filled and set enabled colors
      var x = ((sliderBody.value - sliderBody.min) / (sliderBody.max - sliderBody.min)) * 100;
      var color = 'linear-gradient(90deg, var(--active-color, #409eff) ' + x + '%, var(--inactive-color, #e4e7ed) ' + x + '%)';
      sliderBody.style.setProperty('--background', color);
    } else {
      // Calculate the percentage to be filled and set disabled colors
      x = ((sliderBody.value - sliderBody.min) / (sliderBody.max - sliderBody.min)) * 100;
      color = 'linear-gradient(90deg, var(--disabled-color, #b2b3b7) ' + x + '%, var(--inactive-color, #e4e7ed) ' + x + '%)';
      sliderBody.style.setProperty('--background', color);
    }
  }

  /**
   * Method that gets called when component is attached to the DOM. Calls initUserAttribute() to initialize attributes. Sets event listeners to update display value of slider and fill slider background according to the slider's current value.
   */
  connectedCallback () {
    // console.log(this.shadowRoot.querySelector('input').value);
    this.initUserAttribute();
    // console.log(this.shadowRoot.querySelector('input').value);
    let shadowRoot = this.shadowRoot;
    let sliderBody = shadowRoot.querySelector('input');
    let outputBody = shadowRoot.querySelector('#value');
    let tooltipText = shadowRoot.getElementById('sliderTooltip');
    let toolTipVisible = this.toolTipVisible;
    let self = this;

    // Displays slider value
    sliderBody.oninput = function () {
      console.log('slider value!');
      outputBody.innerHTML = this.value;
      self.value = this.value;
    };

    // Updates slider background fill on mousemove
    sliderBody.addEventListener('mousemove', function (e) {
      console.log('in mouse move');
      // Update slider based on whether it is enabled or disabled
      if (!this.disabled) {
        // Calculate the percentage to be filled and set enabled colors
        var x = ((sliderBody.value - sliderBody.min) / (sliderBody.max - sliderBody.min)) * 100;
        var color = 'linear-gradient(90deg, var(--active-color, #409eff) ' + x + '%, var(--inactive-color, #e4e7ed) ' + x + '%)';
        sliderBody.style.setProperty('--background', color);
      } else {
        // Calculate the percentage to be filled and set disabled colors
        x = ((sliderBody.value - sliderBody.min) / (sliderBody.max - sliderBody.min)) * 100;
        color = 'linear-gradient(90deg, var(--disabled-color, #b2b3b7) ' + x + '%, var(--inactive-color, #e4e7ed) ' + x + '%)';
        sliderBody.style.setProperty('--background', color);
      }
      // tooltip moving
      if (toolTipVisible) {
        var sliderValue = sliderBody.value;
        tooltipText.style.position = 'relative';
        tooltipText.style.left = (e.clientX - 50) + 'px';
        tooltipText.innerHTML = sliderValue;
        let factor = sliderValue / sliderBody.max;
        let offset = sliderBody.offsetWidth;
        let coordX = e.clientX - (offset * factor);
        if (coordX <= 50 && coordX >= 30) {
          if (tooltipText.style.visibility !== 'visible') {
            tooltipText.style.visibility = 'visible';
          }
        }
      }
    });

    // Updates slider background fill on click
    sliderBody.addEventListener('click', function () {
      console.log('in mouse click');
      // Update slider based on whether it is enabled or disabled
      if (!this.disabled) {
        // Calculate the percentage to be filled and set enabled colors
        var x = ((sliderBody.value - sliderBody.min) / (sliderBody.max - sliderBody.min)) * 100;
        var color = 'linear-gradient(90deg, var(--active-color, #409eff) ' + x + '%, var(--inactive-color, #e4e7ed) ' + x + '%)';
        sliderBody.style.setProperty('--background', color);
      } else {
        // Calculate the percentage to be filled and set disabled colors
        x = ((sliderBody.value - sliderBody.min) / (sliderBody.max - sliderBody.min)) * 100;
        color = 'linear-gradient(90deg, var(--disabled-color, #b2b3b7) ' + x + '%, var(--inactive-color, #e4e7ed) ' + x + '%)';
        sliderBody.style.setProperty('--background', color);
      }
    });

    sliderBody.addEventListener('mouseout', function (e) {
      if (toolTipVisible) {
        tooltipText.style.visibility = 'hidden';
      }
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

window.customElements.define('pair-slider', PairSlider);
