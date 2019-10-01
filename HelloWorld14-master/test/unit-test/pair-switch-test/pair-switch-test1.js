/* eslint-disable no-undef */
/* eslint-disable semi */
describe('Testing default pair switch component', function () {
  describe('Testing Constructor', function () {
    let element = new PairSwitch();
    it('Checking if element exists', function () {
      expect(element).not.toBe(null);
    });
    it('Test Default attributes', function () {
      let valueMap = {
        'active': true,
        'inactive': false
      };
      expect(element.valueMap).toEqual(valueMap);
      expect(element.disabled).toBe(false);
      expect(element.name).toBe('');
      expect(element.hasAttribute('active-text')).toBe(false);
      expect(element.hasAttribute('inactive-text')).toBe(false);
      expect(element.hasAttribute('inactive-color')).toBe(false);
      expect(element.hasAttribute('active-color')).toBe(false);
      expect(element.hasAttribute('active-value')).toBe(false);
      expect(element.hasAttribute('inactive-value')).toBe(false);
      expect(element.hasAttribute('shadow')).toBe(false);
    });
  });
  describe('Creating new elements with custom attributes', function () {
    it('creating element', function () {
      document.body.innerHTML = '<pair-switch id=\'pswitch\' checked shadow width=\'10em\' disabled name=\'pair\'active-text=\'yes\' inactive-text=\'no\' inactive-color=\'#C0C0C0\' active-color=\'#ffd1dc\' active-value=\'true\' inactive-value=\'false\'> </pair-switch>';
      var element = document.getElementById('pswitch');
      expect(element).not.toBe(null);
      expect(element.getAttribute('width')).toBe('10em');
      expect(element.getAttribute('active-text')).toBe('yes');
      expect(element.getAttribute('inactive-text')).toBe('no');
      expect(element.getAttribute('disabled')).toBe('');
      expect(element.name).toBe('pair');
      expect(element.disabled).toBe(true);
      expect(element.getAttribute('active-color')).toBe('#ffd1dc');
      expect(element.getAttribute('inactive-color')).toBe('#C0C0C0');
      expect(element.getAttribute('active-value')).toBe('true');
      expect(element.getAttribute('inactive-value')).toBe('false');
      expect(element.getAttribute('shadow')).toBe('');
    });
    it('checking disabled and attached', function () {
      document.body.innerHTML = '<button id=\'button1\' type="button">Click Me!</button> <pair-switch id=\'pswitch\' attach=\'button1\'></pair-switch>';
      var element = document.getElementById('pswitch');
      let switchBody = element.shadowRoot.querySelector('input');
      switchBody.click();
      switchBody.click();
    });
    it('checking bootstrap themes', function () {
      document.body.innerHTML = '<pair-switch id=\'pswitch\' primary> </pair-switch>';
      var element = document.getElementById('pswitch');
      expect(element.hasAttribute('primary')).toBe(true);

      document.body.innerHTML = '<pair-switch id=\'pswitch\' secondary> </pair-switch>';
      element = document.getElementById('pswitch');
      expect(element.hasAttribute('secondary')).toBe(true);

      document.body.innerHTML = '<pair-switch id=\'pswitch\' success> </pair-switch>';
      element = document.getElementById('pswitch');
      expect(element.hasAttribute('success')).toBe(true);

      document.body.innerHTML = '<pair-switch id=\'pswitch\' danger> </pair-switch>';
      element = document.getElementById('pswitch');
      expect(element.hasAttribute('danger')).toBe(true);

      document.body.innerHTML = '<pair-switch id=\'pswitch\' warning> </pair-switch>';
      element = document.getElementById('pswitch');
      expect(element.hasAttribute('warning')).toBe(true);

      document.body.innerHTML = '<pair-switch id=\'pswitch\' info> </pair-switch>';
      element = document.getElementById('pswitch');
      expect(element.hasAttribute('info')).toBe(true);

      document.body.innerHTML = '<pair-switch id=\'pswitch\' dark> </pair-switch>';
      element = document.getElementById('pswitch');
      expect(element.hasAttribute('dark')).toBe(true);
    });
  });
});
