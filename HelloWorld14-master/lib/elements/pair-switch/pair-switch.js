/**
 * Represents the pair-switch web component
 * @class PairSwitch
 */
class PairSwitch extends HTMLElement {
  /**
   * Creates HTML template with CSS for switch component.
   * @returns {Element} HTML template element with CSS for switch component.
   */
  createTemplate () {
    let template = document.createElement('template');
    template.innerHTML = `
<style>
  :host {
    font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
    font-size: 16px;
    display: flex;
    align-items: center;
  }

  .switch {
    position: var(--position, relative);
    display: inline-block;
    width: var(--width, 70px);
    height: 34px;
  }

  /* Hide default HTML checkbox */
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--inactive-color,#ccc);
    -webkit-transition: .4s;
    transition: .4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
  }

  input:checked + .slider {
    background-color: var(--active-color, #409eff);
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #2196F3;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(calc(var(--width, 70px) - 34px));
    -ms-transform: translateX(calc(var(--width, 70px) - 34px));
    transform: translateX(calc(var(--width, 70px) - 34px));
    t
  }

  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }

  .text-highlight {
    color: var(--active-color, #409eff);
    transition: color 0.6s;
  }
</style>
<span id="inactive-text" style="margin-right: 10px; display: none"></span>
<label class="switch">
  <input style="display: block;" type="checkbox">
  <span class="slider round"></span>
</label>
<span id="active-text" style="margin-left: 10px; display: none; "></span>`;

    return template;
  }

  /* Always call super(); on the first line */
  constructor () {
    super();

    // Set default values for attributes
    /** @member {map} */
    this.valueMap = {
      'active': true,
      'inactive': false
    };

    /**
     * Disables switch functionality
    @member {boolean}
    @default */
    this.disabled = false;

    /**
     * Name of the switch
    @member {String}
    @default */
    this.name = '';

    // Create shadow root and append template for slider
    this.root = this.attachShadow({
      mode: 'open'
    });
    this.root.appendChild(this.createTemplate().content.cloneNode(true));
  }

  /**
   * Defines which attributes that attributeChangedCallback will listen to for changes.
   */
  static get observedAttributes () {
    return ['disabled'];
  }

  /**
   * Initializes the name of the switch.
   */
  initName () {
    if (this.hasAttribute('name')) {
      this.name = this.getAttribute('name');
    }
  }

  /**
   * Sets the switched to checked if user provides attribute. Otherwise, default of inactive is used.
   */
  initChecked () {
    if (this.hasAttribute('checked')) {
      let switchBody = this.shadowRoot.querySelector('input');
      switchBody.checked = true;
      this.shadowRoot.getElementById('active-text').className += 'text-highlight ';
    } else {
      this.shadowRoot.getElementById('inactive-text').className += 'text-highlight ';
    }
  }

  /**
   * If configured, set disabled attribute. The disabled attribute turns the switch grey and makes it immutable.
   */
  initDisabled () {
    let switchBody = this.shadowRoot.querySelector('input');
    let switchClass = this.shadowRoot.querySelector('.switch');
    if (this.hasAttribute('disabled')) {
      switchBody.disabled = true;
      switchClass.style.setProperty('opacity', '0.4');
      this.disabled = true;
    } else {
      switchBody.disabled = false;
      switchClass.style.setProperty('opacity', '1');
      this.disabled = false;
    }
  }

  /**
   * Initializes width value for switch if user provides a value for the width attribute. Otherwise, default of 70px is used.
   */
  initWidth () {
    if (this.hasAttribute('width')) { // FIXME: Does not sanatize the width data
      let switchClass = this.shadowRoot.querySelector('.switch');
      switchClass.style.setProperty('--width', this.getAttribute('width'));
    }
  }

  /**
   * Initializes active and inactive text for switch if user provides a value for the active-text and inactive-text attributes. Otherwise, default of empty string '' is used for either.
   */
  initText () {
    if (this.hasAttribute('active-text')) {
      let activeTextContainer = this.shadowRoot.getElementById('active-text');
      activeTextContainer.style.setProperty('display', 'inline-block');
      activeTextContainer.innerText = this.getAttribute('active-text');
    }

    if (this.hasAttribute('inactive-text')) {
      let inactiveTextContainer = this.shadowRoot.getElementById('inactive-text');
      inactiveTextContainer.style.setProperty('display', 'inline-block');
      inactiveTextContainer.innerText = this.getAttribute('inactive-text');
    }
  }

  /**
   * Initializes active and inactive color for switch if user provides a value for the active-color and inactive-color attributes. Otherwise, default of blue and grey are used for active-color and inactive-color respectively.
   */
  initColor () {
    let inactiveColor = this.hasAttribute('inactive-color') ? this.getAttribute('inactive-color') : '';
    let activeColor = this.hasAttribute('active-color') ? this.getAttribute('active-color') : '';

    if (inactiveColor.length === 7) {
      let inactiveColorHex = inactiveColor.substr(1);
      if ((typeof inactiveColorHex === 'string') &&
        (inactiveColorHex.length === 6) &&
        (!isNaN(parseInt(inactiveColorHex, 16)))
      ) {
        let sliderClass = this.shadowRoot.querySelector('.slider');
        sliderClass.style.setProperty('--inactive-color', inactiveColor);
      }
    }

    if (activeColor.length === 7) {
      let activeColorHex = activeColor.substr(1);

      // getting and setting active color
      if ((typeof activeColorHex === 'string') &&
        (activeColorHex.length === 6) &&
        (!isNaN(parseInt(activeColorHex, 16)))
      ) {
        let sliderClass = this.shadowRoot.querySelector('.slider');
        let textDesc = this.shadowRoot.querySelectorAll('span');
        textDesc[0].style.setProperty('--active-color', activeColor);
        textDesc[2].style.setProperty('--active-color', activeColor);
        sliderClass.style.setProperty('--active-color', activeColor);
      }
    }
  }

  /**
   * Initializes active and inactive value for switch if user provides a value for the active-value and inactive-value attributes. Otherwise, default of true and false are used for active-value and inactive-value respectively.
   */
  initValue () {
    let switchBody = this.shadowRoot.querySelector('input');

    // Initialize active value and inactive value if provided by the user
    if (this.hasAttribute('active-value')) {
      this.valueMap['active'] = this.getAttribute('active-value');
    }
    if (this.hasAttribute('inactive-value')) {
      this.valueMap['inactive'] = this.getAttribute('inactive-value');
    }
    this.value = switchBody.checked
      ? this.valueMap['active']
      : this.valueMap['inactive'];

    // Check box change event dispatches a component wide change event
    switchBody.addEventListener('change', () => {
      this.value = switchBody.checked
        ? this.valueMap['active']
        : this.valueMap['inactive'];
      this.dispatchEvent(new Event('change'));
    });
  }

  /**
   * Initializes shadow for switch if user provides the shadow attribute. Otherwise, default of no shadow is used.
   */
  initShadow () {
    if (this.hasAttribute('shadow')) {
      this.shadowRoot.querySelector('.slider').style.setProperty('box-shadow', 'inset 0 3px 10px rgba(0,0,0,.3)');
    }
  }

  // for demo purpose, you may keep it later
  initAttach () {
    /* if (this.hasAttribute('attach')) {
      window.addEventListener('load', () => {
        let element = document.getElementById(this.getAttribute('attach'));
        console.log(element);
        if (!element) return;
        if (this.value === this.valueMap['inactive']) element.setAttribute('disabled', true);
        this.addEventListener('change', () => {
          if (this.value === this.valueMap['active']) {
            element.removeAttribute('disabled');
          } else {
            element.setAttribute('disabled', true);
          }
        });
      });
    } */
  }

  // bootstrap theme for peter
  initBootstrapTheme () {
    let sliderClass = this.shadowRoot.querySelector('.slider');
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
    sliderClass.style.setProperty('--active-color', bootstrapTheme);
    let textDesc = this.shadowRoot.querySelectorAll('span');
    textDesc[0].style.setProperty('--active-color', bootstrapTheme);
    textDesc[2].style.setProperty('--active-color', bootstrapTheme);
  }

  /* initialize attributes base on user input here */
  initUserAttribute () {
    this.initName();
    this.initChecked();
    this.initDisabled();
    this.initWidth();
    this.initText();
    this.initColor();
    this.initValue();
    this.initShadow();
    this.initBootstrapTheme();
    this.initAttach();
  }

  /**
   * Method that gets called when component is attached to the DOM. Calls initUserAttribute() to initialize attributes. Sets event listeners to update active and inactive text
   */
  connectedCallback () {
    this.initUserAttribute();
    this.addEventListener('change', () => {
      if (this.value === this.valueMap['active']) {
        this.shadowRoot.getElementById('active-text').className += 'text-highlight ';
        this.shadowRoot.getElementById('inactive-text').className = '';
      } else {
        this.shadowRoot.getElementById('inactive-text').className += 'text-highlight ';
        this.shadowRoot.getElementById('active-text').className = '';
      }
    });
  }

  /**
   * Invoked when one of the pair-switches's attributes is added, removed, or changed.
   * (when these attributes are changed in the dom)
   */
  attributeChangedCallback (attr, oldVal, newVal) {
    this.initDisabled();
  }
}
customElements.define('pair-switch', PairSwitch);
