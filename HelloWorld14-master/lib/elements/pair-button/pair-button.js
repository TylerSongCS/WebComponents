/**
 @class A simple web component based button
 */
class PairButton extends HTMLElement {
  /**
   * Creates HTML template with CSS for button component.
   @returns {HTMLTemplateElement} HTML template element with CSS for button component.
   */
  createTemplate () {
    let template = document.createElement('template');

    template.innerHTML = `
    <style>

        /* background text and border color are variables*/
        button {
          --url-icon: url();


          display: flex;
          line-height: 1;
          white-space: nowrap;
          cursor: pointer;
          background: var(--background-color, #409eff);
          border: 1px solid var(--border-color, #409eff);
          color: var(--color, #fff);
          text-align: center;
          text-decoration: none;
          box-sizing: border-box;
          outline: none;
          margin: 0;
          font-weight: 500;
          -webkit-appearance: none;
          padding: 12px 20px;
          font-size: var(--font-size, 15px);
          border-radius: 4px;
          align-items: center;
        }

        button:disabled {
          opacity: 0.4;
        }

        button:disabled:hover {
          opacity: 0.4;
          cursor: not-allowed;
        }

        /* icon holder */
        button .span {
          float: left;
          width: calc(var(--font-size, 15px) + 2px);
          height: calc(var(--font-size, 15px) + 2px);
        }

        /* placeholder gmail icon*/
        span.icon {
          background-image: var(--url-icon);
          float: left;
          width: calc(var(--font-size, 15px) + 2px);
          height: calc(var(--font-size, 15px) + 2px);
          margin-right: 5px;
          background-size: cover;
        }

        .loader {
          border: calc(calc(var(--font-size, 15px) + 2px) * .13) solid #f3f3f3; /* Light grey */
          border-top: calc(calc(var(--font-size, 15px) + 2px) * .13) solid #202328; /* Blue */
          border-radius: 50%;
          width: calc(var(--font-size, 15px) + 2px);
          height: calc(var(--font-size, 15px) + 2px);
          margin-right: 5px;
          animation: spin 2s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        button:hover {
          opacity: 0.8;
        }

        /* sizes */
        .medium {
          padding: 10px 20px;
          font-size: calc(var(--font-size, 15px) - 1px);
          border-radius: 4px;
        }

        .small {
          padding: 9px 15px;
          font-size: calc(var(--font-size, 15px) - 2px);
          border-radius: 3px;
        }

        .mini {
          padding: 7px 15px;
          font-size: calc(var(--font-size, 15px) - 4px);
          border-radius: 3px;
        }

        /* style */
        /* built in themes, primary is default */
        .secondary {
          --color: #fff;
          --background-color: #6c757d;
          --border-color: #6c757d;
        }

        .success {
          --color: #fff;
          --background-color: #67c23a;
          --border-color: #67c23a;
        }

        .danger {
          --color: #fff;
          --background-color: #dc3545;
          --border-color: #dc3545;
        }

        .warning {
          --color: #fff;
          --background-color: #ffc107;
          --border-color: #ffc107;
        }

        .info {
          --color: #fff;
          --background-color: #17a2b8;
          --border-color: #17a2b8;
        }

        .dark {
          --color: #fff;
          --background-color: #343a40;
          --border-color: #343a40;
        }

        .plain {
          --color: var(--background-color, #409eff);
          background-color: #fff;
          --border-color: var(--background-color, #409eff);
        }

        .plain:hover {
          opacity: 1;
          color: #fff;
          background: var(--color);
          border-color: var(--color);
        }

        .round {
          --color: var(--background-color, #409eff);
          background-color: #fff;
          border-radius: 20px;
          padding: 12px 23px;
        }

        .round:hover {
          opacity: 1;
          color: #fff;
          background: var(--color);
          border-color: var(--color);
        }

        /* only work if no text in button (icon button)*/
        .circle {
          --color: var(--background-color, #409eff);
          background-color: #fff;
          border-radius: 50%;
          padding: 12px;
        }

        .circle:hover {
          opacity: 1;
          color: #fff;
          background: var(--color);
          border-color: var(--color);
        }

        .circle .icon {
          margin: 1px;
        }

        .text {
          border-color: transparent;
          color: #409eff;
          background: transparent;
          padding-left: 0;
          padding-right: 0;
        }

        .text:hover {
          opacity: 0.8;
          border-color: transparent;
          color: #409eff;
          background: transparent;
          padding-left: 0;
          padding-right: 0;
        }
    </style>

    <button type="button"><span class="icon" style="display: none"></span>
    
    </button>`;
    return template; // To use icon, use JS to change display of span to inline
  }

  /**
    * Create a new PairButton object with default attributes
    @constructor
    */
  constructor () {
    super();

    /**
     * Define the icon image source corresponding to the icon attribute
     @member {object} */
    this.icons = { // find the icons that you like, put them into icons folder and link them in the map
      edit: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="528.899px" height="528.899px" viewBox="0 0 528.899 528.899" style="enable-background:new 0 0 528.899 528.899;" xml:space="preserve"%3E%3Cpath d="M328.883,89.125l107.59,107.589l-272.34,272.34L56.604,361.465L328.883,89.125z M518.113,63.177l-47.981-47.981c-18.543-18.543-48.653-18.543-67.259,0l-45.961,45.961l107.59,107.59l53.611-53.611C532.495,100.753,532.495,77.559,518.113,63.177z M0.3,512.69c-1.958,8.812,5.998,16.708,14.811,14.565l119.891-29.069L27.473,390.597L0.3,512.69z"/%3E%3C/svg%3E',
      share: 'data:image/svg+xml,%3Csvg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 481.6 481.6" style="enable-background:new 0 0 481.6 481.6;" xml:space="preserve"%3E%3Cpath d="M381.6,309.4c-27.7,0-52.4,13.2-68.2,33.6l-132.3-73.9c3.1-8.9,4.8-18.5,4.8-28.4c0-10-1.7-19.5-4.9-28.5l132.2-73.8 c15.7,20.5,40.5,33.8,68.3,33.8c47.4,0,86.1-38.6,86.1-86.1S429,0,381.5,0s-86.1,38.6-86.1,86.1c0,10,1.7,19.6,4.9,28.5 l-132.1,73.8c-15.7-20.6-40.5-33.8-68.3-33.8c-47.4,0-86.1,38.6-86.1,86.1s38.7,86.1,86.2,86.1c27.8,0,52.6-13.3,68.4-33.9 l132.2,73.9c-3.2,9-5,18.7-5,28.7c0,47.4,38.6,86.1,86.1,86.1s86.1-38.6,86.1-86.1S429.1,309.4,381.6,309.4z M381.6,27.1 c32.6,0,59.1,26.5,59.1,59.1s-26.5,59.1-59.1,59.1s-59.1-26.5-59.1-59.1S349.1,27.1,381.6,27.1z M100,299.8 c-32.6,0-59.1-26.5-59.1-59.1s26.5-59.1,59.1-59.1s59.1,26.5,59.1,59.1S132.5,299.8,100,299.8z M381.6,454.5 c-32.6,0-59.1-26.5-59.1-59.1c0-32.6,26.5-59.1,59.1-59.1s59.1,26.5,59.1,59.1C440.7,428,414.2,454.5,381.6,454.5z"/%3E%3C/svg%3E',
      delete: 'data:image/svg+xml,%3Csvg height="427pt" viewBox="-40 0 427 427.00131" width="427pt" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="m232.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0"/%3E%3Cpath d="m114.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0"/%3E%3Cpath d="m28.398438 127.121094v246.378906c0 14.5625 5.339843 28.238281 14.667968 38.050781 9.285156 9.839844 22.207032 15.425781 35.730469 15.449219h189.203125c13.527344-.023438 26.449219-5.609375 35.730469-15.449219 9.328125-9.8125 14.667969-23.488281 14.667969-38.050781v-246.378906c18.542968-4.921875 30.558593-22.835938 28.078124-41.863282-2.484374-19.023437-18.691406-33.253906-37.878906-33.257812h-51.199218v-12.5c.058593-10.511719-4.097657-20.605469-11.539063-28.03125-7.441406-7.421875-17.550781-11.5546875-28.0625-11.46875h-88.796875c-10.511719-.0859375-20.621094 4.046875-28.0625 11.46875-7.441406 7.425781-11.597656 17.519531-11.539062 28.03125v12.5h-51.199219c-19.1875.003906-35.394531 14.234375-37.878907 33.257812-2.480468 19.027344 9.535157 36.941407 28.078126 41.863282zm239.601562 279.878906h-189.203125c-17.097656 0-30.398437-14.6875-30.398437-33.5v-245.5h250v245.5c0 18.8125-13.300782 33.5-30.398438 33.5zm-158.601562-367.5c-.066407-5.207031 1.980468-10.21875 5.675781-13.894531 3.691406-3.675781 8.714843-5.695313 13.925781-5.605469h88.796875c5.210937-.089844 10.234375 1.929688 13.925781 5.605469 3.695313 3.671875 5.742188 8.6875 5.675782 13.894531v12.5h-128zm-71.199219 32.5h270.398437c9.941406 0 18 8.058594 18 18s-8.058594 18-18 18h-270.398437c-9.941407 0-18-8.058594-18-18s8.058593-18 18-18zm0 0"/%3E%3Cpath d="m173.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0"/%3E%3C/svg%3E',
      search: 'data:image/svg+xml,%3Csvg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="485.213px" height="485.213px" viewBox="0 0 485.213 485.213" style="enable-background:new 0 0 485.213 485.213;" xml:space="preserve"%3E%3Cpath d="M363.909,181.955C363.909,81.473,282.44,0,181.956,0C81.474,0,0.001,81.473,0.001,181.955s81.473,181.951,181.955,181.951 C282.44,363.906,363.909,282.437,363.909,181.955z M181.956,318.416c-75.252,0-136.465-61.208-136.465-136.46 c0-75.252,61.213-136.465,136.465-136.465c75.25,0,136.468,61.213,136.468,136.465 C318.424,257.208,257.206,318.416,181.956,318.416z"/%3E%3Cpath d="M471.882,407.567L360.567,296.243c-16.586,25.795-38.536,47.734-64.331,64.321l111.324,111.324 c17.772,17.768,46.587,17.768,64.321,0C489.654,454.149,489.654,425.334,471.882,407.567z"/%3E%3C/svg%3E',
      upload: 'data:image/svg+xml,%3Csvg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 486.3 486.3" style="enable-background:new 0 0 486.3 486.3;" xml:space="preserve"%3E%3Cpath d="M395.5,135.8c-5.2-30.9-20.5-59.1-43.9-80.5c-26-23.8-59.8-36.9-95-36.9c-27.2,0-53.7,7.8-76.4,22.5 c-18.9,12.2-34.6,28.7-45.7,48.1c-4.8-0.9-9.8-1.4-14.8-1.4c-42.5,0-77.1,34.6-77.1,77.1c0,5.5,0.6,10.8,1.6,16 C16.7,200.7,0,232.9,0,267.2c0,27.7,10.3,54.6,29.1,75.9c19.3,21.8,44.8,34.7,72,36.2c0.3,0,0.5,0,0.8,0h86 c7.5,0,13.5-6,13.5-13.5s-6-13.5-13.5-13.5h-85.6C61.4,349.8,27,310.9,27,267.1c0-28.3,15.2-54.7,39.7-69 c5.7-3.3,8.1-10.2,5.9-16.4c-2-5.4-3-11.1-3-17.2c0-27.6,22.5-50.1,50.1-50.1c5.9,0,11.7,1,17.1,3c6.6,2.4,13.9-0.6,16.9-6.9 c18.7-39.7,59.1-65.3,103-65.3c59,0,107.7,44.2,113.3,102.8c0.6,6.1,5.2,11,11.2,12c44.5,7.6,78.1,48.7,78.1,95.6 c0,49.7-39.1,92.9-87.3,96.6h-73.7c-7.5,0-13.5,6-13.5,13.5s6,13.5,13.5,13.5h74.2c0.3,0,0.6,0,1,0c30.5-2.2,59-16.2,80.2-39.6 c21.1-23.2,32.6-53,32.6-84C486.2,199.5,447.9,149.6,395.5,135.8z"/%3E%3Cpath d="M324.2,280c5.3-5.3,5.3-13.8,0-19.1l-71.5-71.5c-2.5-2.5-6-4-9.5-4s-7,1.4-9.5,4l-71.5,71.5c-5.3,5.3-5.3,13.8,0,19.1 c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4l48.5-48.5v222.9c0,7.5,6,13.5,13.5,13.5s13.5-6,13.5-13.5V231.5l48.5,48.5 C310.4,285.3,318.9,285.3,324.2,280z"/%3E%3C/svg%3E'
    };
    /**
    * Define the icon image source path
    @member {object} */
    this.path = this.icons.edit;

    /**
    * Define the loading value
    @member {object} */
    this.loading = 'false';

    /**
     * Button size
     @member {string}
     @default */
    this.size = '123';

    /**
     * Button type (primary, secondary etc)
     @member {string}
     @default */
    this.type = 'default';

    /**
     * Determine whether this is a plain button
     @member {boolean}
     @default */
    this.plain = false;

    /**
     * Determine whether this is a round button
    @member {boolean}
    @default */
    this.round = false;

    /**
     * Determine whether this is a circle button
    @member {boolean}
    @default */
    this.circle = false;

    /**
     * Determine whether this is a loading button
    @member {boolean}
    @default */
    this.loading = false;

    /**
     *  Whether this button is disabled
    @member {boolean}
    @default */
    this.disabled = false;

    /**
     *  The icon class of the button
    @member {string}
    @default */
    this.icon = 'default';

    /**
     * Same as native button's autofocus
    @member {boolean}
    @default */
    this.autofocus = false;

    /**
     * Same as native button's type (button/submit/reset)
    @member {boolean}
    @default */
    this.nativeType = 'button';

    // Create and attach shadow root
    this.root = this.attachShadow({
      mode: 'open'
    });

    // Add template
    this.root.appendChild(this.createTemplate().content.cloneNode(true));

    /**
     * To access the built in html button our component is built upon
    @member {HTMLElement} */
    this.buttonBody = this.shadowRoot.querySelector('button');

    /**
     * To access the icon holder, which is a span element
    @member {HTMLElement} */
    this.iconHolder = this.shadowRoot.querySelector('.icon');
  }

  /**
    * Determine what attributes will trigger attributeChangedCallback
    @member {function} */
  static get observedAttributes () {
    return ['disabled', 'autofocus', 'native-type', 'type', 'size', 'loading', 'icon'];
  }

  /**
   * Initialize size property based on input attribute
   */
  initSize () {
    if (this.hasAttribute('size')) {
      // update attribute of button body and corresponding properties
      let size = this.getAttribute('size');
      size = ['medium', 'small', 'mini'].includes(size) ? size : 'medium';
      this.buttonBody.setAttribute('size', size);
      this.buttonBody.classList.add(size);
      this.size = size;
    }
  }

  /**
   * Initialize type property based on input attribute
   */
  initType () {
    if (this.hasAttribute('type')) {
      // update attribute of button body and corresponding properties
      // button/submit/reset are the three valid inputs
      let type = this.getAttribute('type');
      type = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'text'].includes(type) ? type : 'primary';
      this.buttonBody.setAttribute('type', type);
      this.buttonBody.classList.add(type);
      this.type = type;
    }
  }

  /**
   * Clears shape classes from component and sets all shape attributes to false. Used in initShape() to avoid conflicting classes. A call to clearShapeAttributes() must be followed by code which sets the new shape attributes.
   */
  clearShapeAttributes () {
    // Remove circle, round, and plain if they exist in class
    if (this.buttonBody.classList.contains('circle')) {
      this.buttonBody.className = this.buttonBody.className.replace('circle', '');
    }
    if (this.buttonBody.classList.contains('round')) {
      this.buttonBody.className = this.buttonBody.className.replace('round', '');
    }
    if (this.buttonBody.classList.contains('plain')) {
      this.buttonBody.className = this.buttonBody.className.replace('plain', '');
    }

    // Set all shape attributes to false
    this.round = false;
    this.circle = false;
    this.plain = false;
  }

  /**
   * Initialize plain/round/circle property based on input attribute
   */
  initShape () {
    // Remove shape classes and attributes if they exist to avoid conflicts
    this.clearShapeAttributes();

    // Set class and attribute
    if (this.hasAttribute('round')) {
      // Add round to class of component to get styling and set round attribute
      this.buttonBody.classList ? this.buttonBody.classList.add('round') : this.buttonBody.className += ' round';
      this.round = true;
    } else if (this.hasAttribute('circle')) {
      // Add circle to class of component to get styling and set circle attribute
      this.buttonBody.classList ? this.buttonBody.classList.add('circle') : this.buttonBody.className += ' circle';
      this.circle = true;
    } else { // Default is plain
      // Add round to class of component to get styling and set plain attribute
      this.buttonBody.classList ? this.buttonBody.classList.add('plain') : this.buttonBody.className += ' plain';
      this.plain = true;
    }
  }

  /**
   * Initialize disabled property based on input attribute
   */
  initDisabled () {
    if (this.hasAttribute('disabled')) {
      // update attribute of button body and corresponding properties
      this.buttonBody.setAttribute('disabled', true);
      this.disabled = true;
    } else {
      this.buttonBody.removeAttribute('disabled');
      this.disabled = false;
    }
  }

  /**
   * Initialize autofocus property based on input attribute
   */
  initAutofocus () {
    // update attribute of button body and corresponding properties
    // This has no visual effect on our button, just leave it there
    if (this.hasAttribute('autofocus')) {
      this.buttonBody.setAttribute('autofocus', true);
      this.autofocus = true;
    } else {
      this.buttonBody.removeAttribute('autofocus');
      this.autofocus = false;
    }
  }

  /**
   * Initialize native type property based on input attribute
   */
  initNativeType () {
    if (this.hasAttribute('native-type')) {
      // update attribute of button body and corresponding properties
      // button/submit/reset are the three valid inputs
      let nativeType = this.getAttribute('native-type');
      nativeType = ['button', 'submit', 'reset'].includes(nativeType) ? nativeType : 'button';
      this.buttonBody.setAttribute('type', nativeType);
      this.nativeType = nativeType;
    }
  }
  /**
   * Initialize icon background property based on input attribute
   */
  initIcon () {
    if (this.hasAttribute('icon')) {
      let iconValue = this.getAttribute('icon');
      if (iconValue in this.icons) {
        let path = this.icons[iconValue];
        this.path = path;
        this.buttonBody.style.setProperty('--url-icon', `url('${this.path}')`);
        // want to set this for icon but not if button is loading
        if (!this.loading) {
          this.buttonBody.querySelector('span').className = 'icon';
          this.iconHolder.setAttribute('style', 'display: inline');
        }
      }
    }
  }
  /**
   * Initialize loading background property based on input attribute
   * gets rid of span class and style class for icon
   */
  initLoading () {
    if (this.hasAttribute('loading')) {
      if (this.getAttribute('loading') === 'true') {
        this.buttonBody.querySelector('span').className = '';
        this.buttonBody.querySelector('span').style = '';
        this.buttonBody.querySelector('span').innerHTML = '<div class="loader"></div>';
        this.loading = true;
      } else {
        this.loading = 'false';
      }
    }
  }

  /**
   * Initialize all attributes
   */
  initUserAttribute () {
    this.initSize();
    this.initType();
    this.initShape();
    this.initDisabled();
    this.initAutofocus();
    this.initNativeType();
    this.initIcon();
    this.initLoading();
  }

  /**
   * Invoked when component is appended to the DOM, calls initUserAttribute() to initialize attributes
   */
  connectedCallback () {
    this.initUserAttribute();
    // Read the user input text and put it into button body
    let text = this.innerHTML;
    this.buttonBody.childNodes[1].textContent = text;
  }

  /**
   * Invoked when one of the attributes specified in observedAttributs() is added, removed, or changed
   */
  attributeChangedCallback () {
    this.initUserAttribute();
  }
}
customElements.define('pair-button', PairButton);
