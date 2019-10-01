/* eslint-disable no-undef */
describe('Testing pair button component', function () {
  describe('Testing default component', function () {
    it('testing no attributes except id', function () {
      document.body.innerHTML = '<pair-button id=\'pbutton\'></pair-button>';
      var element = document.getElementById('pbutton');
      expect(element).not.toBe(null);
      expect(element.size).toBe('123');
      expect(element.type).toBe('default');
      expect(element.autofocus).toBe(false);
      expect(element.nativeType).toBe('button');
      expect(element.round).toBe(false);
      expect(element.circle).toBe(false);
      expect(element.plain).toBe(true);
    });
  });
  describe('Testing shape attribute', function () {
    it('testing round attributes', function () {
      document.body.innerHTML = '<pair-button round id=\'pbutton\'></pair-button>';
      var element = document.getElementById('pbutton');
      expect(element.buttonBody.classList.contains('round')).toBe(true);
      expect(element.round).toBe(true);
      expect(element.circle).toBe(false);
      expect(element.plain).toBe(false);
    });
    it('testing circle attributes', function () {
      document.body.innerHTML = '<pair-button circle id=\'pbutton\'></pair-button>';
      var element = document.getElementById('pbutton');
      expect(element.buttonBody.classList.contains('circle')).toBe(true);
      expect(element.circle).toBe(true);
      expect(element.round).toBe(false);
      expect(element.plain).toBe(false);
    });
    it('testing plain attributes', function () {
      document.body.innerHTML = '<pair-button plain id=\'pbutton\'></pair-button>';
      var element = document.getElementById('pbutton');
      expect(element.buttonBody.classList.contains('plain')).toBe(true);
      expect(element.plain).toBe(true);
      expect(element.round).toBe(false);
      expect(element.circle).toBe(false);
    });
  });
  describe('Testing disabled attribute', function () {
    it('testing disabled on', function () {
      document.body.innerHTML = '<pair-button disabled id=\'pbutton\'></pair-button>';
      var element = document.getElementById('pbutton');
      expect(element.disabled).toBe(true);
      expect(element.buttonBody.disabled).toBe(true);
    });
    it('testing disabled off', function () {
      document.body.innerHTML = '<pair-button id=\'pbutton\'></pair-button>';
      var element = document.getElementById('pbutton');
      expect(element.disabled).toBe(false);
      expect(element.buttonBody.hasAttribute('disabled')).toBe(false);
    });
  });
  describe('Testing autofocus attribute', function () {
    it('testing autofocus on', function () {
      document.body.innerHTML = '<pair-button autofocus id=\'pbutton\'></pair-button>';
      var element = document.getElementById('pbutton');
      expect(element.autofocus).toBe(true);
      expect(element.buttonBody.autofocus).toBe(true);
    });
    it('testing autofocus off', function () {
      document.body.innerHTML = '<pair-button id=\'pbutton\'></pair-button>';
      var element = document.getElementById('pbutton');
      expect(element.autofocus).toBe(false);
      expect(element.buttonBody.hasAttribute('autofocus')).toBe(false);
    });
  });
  describe('Testing nativetype attribute', function () {
    it('testing nativetype button', function () {
      document.body.innerHTML = '<pair-button native-type=\'button\' id=\'pbutton\'></pair-button>';
      var element = document.getElementById('pbutton');
      expect(element.nativeType).toBe('button');
    });
    it('testing nativetype submit', function () {
      document.body.innerHTML = '<pair-button native-type=\'submit\' id=\'pbutton\'></pair-button>';
      var element = document.getElementById('pbutton');
      expect(element.nativeType).toBe('submit');
    });
    it('testing nativetype reset', function () {
      document.body.innerHTML = '<pair-button native-type=\'reset\' id=\'pbutton\'></pair-button>';
      var element = document.getElementById('pbutton');
      expect(element.nativeType).toBe('reset');
    });
    it('testing nativetype random', function () {
      document.body.innerHTML = '<pair-button native-type=\'random\' id=\'pbutton\'></pair-button>';
      var element = document.getElementById('pbutton');
      expect(element.nativeType).toBe('button');
    });
  });
  describe('Testing size attribute', function () {
    it('testing size medium', function () {
      document.body.innerHTML = '<pair-button size=\'medium\' id=\'pbutton\'></pair-button>';
      var element = document.getElementById('pbutton');
      expect(element.size).toBe('medium');
    });
    it('testing size small', function () {
      document.body.innerHTML = '<pair-button size=\'small\' id=\'pbutton\'></pair-button>';
      var element = document.getElementById('pbutton');
      expect(element.size).toBe('small');
    });
    it('testing size mini', function () {
      document.body.innerHTML = '<pair-button size=\'mini\' id=\'pbutton\'></pair-button>';
      var element = document.getElementById('pbutton');
      expect(element.size).toBe('mini');
    });
    it('testing size random', function () {
      document.body.innerHTML = '<pair-button size=\'random\' id=\'pbutton\'></pair-button>';
      var element = document.getElementById('pbutton');
      expect(element.size).toBe('medium');
    });
  });
  describe('Testing type attribute', function () {
    it('testing type primary', function () {
      document.body.innerHTML = '<pair-button type=\'primary\' id=\'pbutton\'></pair-button>';
      var element = document.getElementById('pbutton');
      expect(element.type).toBe('primary');
    });
    it('testing type secondary', function () {
      document.body.innerHTML = '<pair-button type=\'secondary\' id=\'pbutton\'></pair-button>';
      var element = document.getElementById('pbutton');
      expect(element.type).toBe('secondary');
    });
    it('testing type success', function () {
      document.body.innerHTML = '<pair-button type=\'success\' id=\'pbutton\'></pair-button>';
      var element = document.getElementById('pbutton');
      expect(element.type).toBe('success');
    });
    it('testing type danger', function () {
      document.body.innerHTML = '<pair-button type=\'danger\' id=\'pbutton\'></pair-button>';
      var element = document.getElementById('pbutton');
      expect(element.type).toBe('danger');
    });
    it('testing type warning', function () {
      document.body.innerHTML = '<pair-button type=\'warning\' id=\'pbutton\'></pair-button>';
      var element = document.getElementById('pbutton');
      expect(element.type).toBe('warning');
    });
    it('testing type info', function () {
      document.body.innerHTML = '<pair-button type=\'info\' id=\'pbutton\'></pair-button>';
      var element = document.getElementById('pbutton');
      expect(element.type).toBe('info');
    });
    it('testing type dark', function () {
      document.body.innerHTML = '<pair-button type=\'dark\' id=\'pbutton\'></pair-button>';
      var element = document.getElementById('pbutton');
      expect(element.type).toBe('dark');
    });
    it('testing type random', function () {
      document.body.innerHTML = '<pair-button type=\'random\' id=\'pbutton\'></pair-button>';
      var element = document.getElementById('pbutton');
      expect(element.type).toBe('primary');
    });
  });
  describe('Testing icon attribute', function () {
    it('testing icon share attribute', function () {
      document.body.innerHTML = '<pair-button icon=\'share\' id=\'pbutton\'></pair-button>';
      var element = document.getElementById('pbutton');
      expect(element.hasAttribute('icon')).toBe(true);
    });
    it('testing icon edit attribute', function () {
      document.body.innerHTML = '<pair-button icon=\'edit\' id=\'pbutton\'></pair-button>';
      var element = document.getElementById('pbutton');
      expect(element.hasAttribute('icon')).toBe(true);
    });
    it('testing icon delete attribute', function () {
      document.body.innerHTML = '<pair-button icon=\'delete\' id=\'pbutton\'></pair-button>';
      var element = document.getElementById('pbutton');
      expect(element.hasAttribute('icon')).toBe(true);
    });
  });
  describe('Testing loading attribute', function () {
    it('testing loading true attribute', function () {
      document.body.innerHTML = '<pair-button loading=\'true\' id=\'pbutton\'></pair-button>';
      var element = document.getElementById('pbutton');
      expect(element.getAttribute('loading')).toBe('true');
    });
    it('testing loading false attribute', function () {
      document.body.innerHTML = '<pair-button loading=\'false\' id=\'pbutton\'></pair-button>';
      var element = document.getElementById('pbutton');
      expect(element.getAttribute('loading')).toBe('false');
    });
  });
});
