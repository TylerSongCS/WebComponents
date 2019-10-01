/**
 * Represents the pair-dialog web component
 * @class PairDialog
 */
class PairDialog extends HTMLElement {
  /**
     * Creates HTML template with CSS for dialog component.
     * @returns {Element} HTML template element with CSS for slider component.
     */
  createTemplate () {
    const template = document.createElement('template');
    template.innerHTML = `
    <style>
    /* The Modal (background) */
    .modal {
      display: none; /* Hidden by default */
      position: fixed; /* Stay in place */
      z-index: 1; /* Sit on top */
      padding-top: var(--padding-top, 15%); /* Location of the box */
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
      position: relative;
      background-color: #fefefe;
      font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
      margin: auto;
      padding: 0;
      border: 1px solid #888;
      width: var(--dialog-width, 25%);
      height: var(--dialog-height, 10%);
      box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
      -webkit-animation-name: animatetop;
      -webkit-animation-duration: 0.4s;
      animation-name: animatetop;
      animation-duration: 0.4s
    }

    /* Add Animation */
    @-webkit-keyframes animatetop {
      from {top:-300px; opacity:0}
      to {top:0; opacity:1}
    }

    @keyframes animatetop {
      from {top:-300px; opacity:0}
      to {top:0; opacity:1}
    }

    /* The Close Button */
    .close {
      float: right;
      font-size: 28px;
      height: 29px;
    }

    .close:hover,
    .close:focus {
      color: #409eff;
      text-decoration: none;
      cursor: pointer;
    }

    .modal-header {
      padding-bottom: 10px;
      padding-left: 20px;
      padding-right: 20px;
      padding-top: 20px;
    }

    #modal-title {
      margin: 0 0 0 0;

      padding-bottom: 0px;
      padding-left: 0px;
      padding-right: 0px;
      padding-top: 5px;

      text-align: var(--title-alignment, left);
      font-weight: normal;
      color: #000000;
    }

    .modal-body {
      padding-bottom: 60px;
      padding-left: 20px;
      padding-right: 20px;
      padding-top: 5px;

      color: #606662;
    }

    .modal-footer {
      padding-bottom: 20px;
      padding-left: 20px;
      padding-right: 20px;
      padding-top: 10px;

      position: absolute;
      bottom: 0;
      right: 0;

      font-size: 18px;
      font-weight: normal;
    }

    #buttonAction {
      display: flex;
      justify-content: flex-end;
      position: relative;
    }

    #buttonAction pair-button {
      display: flex;
      position: relative;
      margin-left: 5%;
    }
    </style>
    <!-- Modal content -->
    <!-- The Modal -->
    <div id="modalId" class="modal">
      <!-- Modal content -->
      <div class="modal-content">
        <div class="modal-header">
          <span class="close">&times;</span>
          <h2 id="modal-title"></h2>
        </div>
        <div id="contentId" class="modal-body">
        </div>
        <div class="modal-footer">
          <div id="buttonAction">
            <pair-button id="cancelId">Cancel</pair-button>
            <pair-button id="confirmId">Confirm</pair-button>
          </div>
        </div>
      </div>
    </div>
    </div>`;
    return template;
  }

  /**
    * Create a new PairDialog object with default attributes
    @constructor
    */
  constructor () {
    super();
    // Set default values for attributes
    /**
     *  Whether this dialog is disabled
    @member {boolean}
    @default */
    this.disabled = false;

    /**
     *  Title used for dialog
    @member {String}
    @default */

    /**
     *  Determine if title is centered
    @member {boolean}
    @default */
    this.centered = false;
    this.centered = false;

    /**
     *  Content used for dialog body
    @member {String}
    @default */
    this.content = '';

    /**
     *  Determine whether or not the dialog box is visible
    @member {boolean}
    @default */
    this.visible = false;

    /**
     *  String reference to dialog activater
    @member {String}
    @default */
    this.pusher = '';

    /**
     *  Width of the dialog box
    @member {String}
    @default */
    this.width = '50%';

    /**
     *  Height of the dialog box
    @member {String}
    @default */
    this.height = '25%';

    /**
     *  Value for margin-top of dialog CSS
    @member {String}
    @default */
    this.top = '15%';

    /**
     *  Determine if dialog box is fullscreen
    @member {String}
    @default */
    this.fullScreen = false;

    // Create shadow root and append template for slider
    this.root = this.attachShadow({
      mode: 'open'
    });

    // Add template create at beginning
    this.root.appendChild(this.createTemplate().content.cloneNode(true));

    /**
     * To access the modal title our component contains
    @member {HTMLElement} */
    this.modalTitle = this.shadowRoot.querySelector('#modal-title');

    /**
     * To access the modal content our component contains
    @member {HTMLElement} */
    this.modalContent = this.shadowRoot.querySelector('#contentId');
  }

  /**
   * Initialize the title of the modal if specified
   */
  initTitle () {
    if (this.hasAttribute('pair-title')) {
      this.title = this.getAttribute('pair-title');
      this.modalTitle.innerText = this.title;
    }
  }

  /**
   * Initialize centering of the title if specified
   */
  initCenter () {
    if (this.hasAttribute('center')) {
      this.centered = true;
      this.modalTitle.style.setProperty('--title-alignment', 'center');
    }
  }

  /**
   * Initialize the content of the modal to content inside pair-dialog tags
   */
  initContent () {
    let content = this.innerHTML;
    this.content = content;
    this.modalContent.innerHTML = content;
  }

  /**
   * Initialize the pusher which will run the modal
   */
  initPusher () {
    if (this.hasAttribute('pusher')) {
      var pusher = this.getAttribute('pusher');
      this.pusher = pusher;
    }
  }

  /**
   * Initialize the width of the modal box
   */
  initWidth () {
    if (this.hasAttribute('width')) {
      var width = this.getAttribute('width');
      this.width = width;
    }
    let modalBody = this.shadowRoot.getElementById('modalId');
    modalBody.style.setProperty('--dialog-width', this.width);
  }

  /**
   * Initialize the height of the modal box
   */
  initHeight () {
    if (this.hasAttribute('height')) {
      var height = this.getAttribute('height');
      this.height = height;
    }
    let modalBody = this.shadowRoot.getElementById('modalId');
    modalBody.style.setProperty('--dialog-height', this.height);
  }

  /**
   * Initialize the padding-top value of the modal box
   */
  initTop () {
    if (this.hasAttribute('top')) {
      var top = this.getAttribute('top');
      this.top = top;
    }
    let modalBody = this.shadowRoot.getElementById('modalId');
    modalBody.style.setProperty('--padding-top', this.top);
  }

  /**
   * Initialize the dialog box as fullscreen if specified
   */
  initFullscreen () {
    if (this.hasAttribute('fullscreen')) {
      let modalBody = this.shadowRoot.getElementById('modalId');
      this.width = '100%';
      this.height = '100%';
      this.top = '0%';
      modalBody.style.setProperty('--dialog-width', this.width);
      modalBody.style.setProperty('--dialog-height', this.height);
      modalBody.style.setProperty('--padding-top', this.top);
    }
  }

  /**
   * Initialize plain/round/circle property based on input attribute
   */
  initShape () {
    let modalBody = this.shadowRoot.querySelector('.modal-content');

    if (this.hasAttribute('round')) {
      let attr = this.getAttribute('round');
      if (attr.length === 0) {
        modalBody.style.borderRadius = '5px';
      } else {
        modalBody.style.borderRadius = attr;
      }
    }
  }

  /**
   * Initializes attributes of web component by calling initilization methods.
   */
  initUserAttribute () {
    this.initContent();
    this.initPusher();
    this.initTitle();
    this.initCenter();
    this.initWidth();
    this.initHeight();
    this.initTop();
    this.initFullscreen();
    this.initShape();
  }

  /**
   * Method that gets called when component is attached to the DOM. Calls initUserAttribute() to initialize attributes. Sets event listeners to update display value of slider and fill slider background according to the slider's current value.
   */
  connectedCallback () {
    this.initUserAttribute();
    let shadowRoot = this.shadowRoot;
    let modalBody = shadowRoot.getElementById('modalId');
    let exitButton = shadowRoot.querySelector('.close');
    let pusherBody = window.document.getElementById(this.pusher);
    // References to confirm and cancel. It is currently baked in for proof of concept. Should be added by user.
    let confirmButton = shadowRoot.querySelector('#confirmId');
    let cancelButton = shadowRoot.querySelector('#cancelId');

    // Add event listener for opening modal based on pusher attribute
    if (pusherBody != null) {
      pusherBody.addEventListener('click', function () {
        modalBody.style.display = 'block';
      });
    }

    // Event listener for closing modal
    exitButton.addEventListener('click', function () {
      modalBody.style.display = 'none';
    });
    confirmButton.addEventListener('click', function () {
      modalBody.style.display = 'none';
    });
    cancelButton.addEventListener('click', function () {
      modalBody.style.display = 'none';
    });

    shadowRoot.addEventListener('click', function (e) {
      if (e.target === modalBody) {
        modalBody.style.display = 'none';
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
   * Sets visibility of modal to visibility argument that is passed.
   * @param {boolean} visible Determines visibility of modal
   */
  setVisibility (visibility) {
    this.visible = visibility;
  }

  /**
   * Invoked when one of the pair-slider's attributes is added, removed, or changed.
   * (when these attributes are changed in the dom)
   */
  attributeChangedCallback (attr, oldVal, newVal) {
    this.initDisabled();
  }
}

window.customElements.define('pair-dialog', PairDialog);
