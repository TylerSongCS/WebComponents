/* eslint-disable no-undef */
describe('Testing default color picker component', function () {
  describe('Testing Constructor', function () {
    let element = new ColorPicker();
    it('checking if element exist', function () {
      expect(element).not.toBe(null);
    });
    it('Testing default attributes in constructor', function () {
      expect(element.disabled).toBe(false);
      expect(element.label).toBe('');
    });
  });
  describe('Creating new elements with custom attributes', function () {
    it('checking label', function () {
      document.body.innerHTML = '<color-picker id=\'cpicker\' label=\'colorPicker\'></color-picker>';
      var element = document.getElementById('cpicker');
      expect(element).not.toBe(null);
      expect(element.shadowRoot.querySelector('LABEL')).not.toBe(null);
      expect(element.shadowRoot.querySelector('LABEL').innerText).toBe('colorPicker');
    });
    it('checking disabled', function () {
      document.body.innerHTML = '<color-picker id=\'cpicker\' disabled></color-picker>';
      var element = document.getElementById('cpicker');
      expect(element.disabled).toBe(true);
      expect(element.shadowRoot.querySelector('#redSlider').hasAttribute('disabled')).toBe(true);
      expect(element.shadowRoot.querySelector('#greenSlider').hasAttribute('disabled')).toBe(true);
      expect(element.shadowRoot.querySelector('#blueSlider').hasAttribute('disabled')).toBe(true);
    });
    it('checking height', function () {
      document.body.innerHTML = '<color-picker id=\'cpicker\' height=130%></color-picker>';
      var element = document.getElementById('cpicker');
      expect(element.hasAttribute('height')).toBe(true);
      expect(element.getAttribute('height')).toBe('130%');
    });
    it('clicking test', function () {
      document.body.innerHTML = '<color-picker id=\'cpicker\'></color-picker>';
      var element = document.getElementById('cpicker');
      element.shadowRoot.getElementById('colorButton').click();
      element.shadowRoot.querySelector('.close').click();
      element.shadowRoot.querySelector('#redSlider').shadowRoot.querySelector('input').setAttribute('value', '40');
      element.shadowRoot.querySelector('#greenSlider').shadowRoot.querySelector('input').setAttribute('value', '40');
      element.shadowRoot.querySelector('#blueSlider').shadowRoot.querySelector('input').setAttribute('value', '40');
      element.shadowRoot.getElementById('colorText').setAttribute('value', '#123456');
    });
  });
  describe('Testing type attribute', function () {
    it('testing primary', function () {
      document.body.innerHTML = '<color-picker id=\'cpicker\' type=\'primary\'></color-picker>';
      var element = document.getElementById('cpicker');
      expect(element.getAttribute('type')).toBe('primary');
    });
    it('testing secondary', function () {
      document.body.innerHTML = '<color-picker id=\'cpicker\' type=\'secondary\'></color-picker>';
      var element = document.getElementById('cpicker');
      expect(element.getAttribute('type')).toBe('secondary');
    });
    it('testing success', function () {
      document.body.innerHTML = '<color-picker id=\'cpicker\' type=\'success\'></color-picker>';
      var element = document.getElementById('cpicker');
      expect(element.getAttribute('type')).toBe('success');
    });
    it('testing danger', function () {
      document.body.innerHTML = '<color-picker id=\'cpicker\' type=\'danger\'></color-picker>';
      var element = document.getElementById('cpicker');
      expect(element.getAttribute('type')).toBe('danger');
    });
    it('testing warning', function () {
      document.body.innerHTML = '<color-picker id=\'cpicker\' type=\'warning\'></color-picker>';
      var element = document.getElementById('cpicker');
      expect(element.getAttribute('type')).toBe('warning');
    });
    it('testing info', function () {
      document.body.innerHTML = '<color-picker id=\'cpicker\' type=\'info\'></color-picker>';
      var element = document.getElementById('cpicker');
      expect(element.getAttribute('type')).toBe('info');
    });
    it('testing dark', function () {
      document.body.innerHTML = '<color-picker id=\'cpicker\' type=\'dark\'></color-picker>';
      var element = document.getElementById('cpicker');
      expect(element.getAttribute('type')).toBe('dark');
    });
    it('testing random', function () {
      document.body.innerHTML = '<color-picker id=\'cpicker\' type=\'random\'></color-picker>';
      var element = document.getElementById('cpicker');
      expect(element.shadowRoot.getElementById('colorBox').style.backgroundColor).toBe('rgb(0, 123, 255)');
    });
  });
  describe('Testing width attribute', function () {
    it('Testing width attribute', function () {
      document.body.innerHTML = '<color-picker id=\'cpicker\' width=\'50%\'></color-picker>';
      var element = document.getElementById('cpicker');
      expect(element.getAttribute('width')).toBe('50%');
    });
  });
  describe('Testing uncalled functions', function () {
    it('testing uncalled functions', function () {
      document.body.innerHTML = '<color-picker id=\'cpicker\'></color-picker>';
      var element = document.getElementById('cpicker');
      element.rgbToHex('0');
      element.hexToR('0');
      element.hexToG('0');
      element.hexToB('0');
      element.cutHex('0');
    });
  });
});
