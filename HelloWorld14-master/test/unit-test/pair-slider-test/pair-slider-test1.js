/* eslint-disable no-undef */

describe('Testing default pair slider component', function () {
  describe('Testing Constructor', function () {
    let element = new PairSlider();
    it('Checking if element exists', function () {
      expect(element).not.toBe(null);
    });
    it('Test Default attributes', function () {
      expect(element.disabled).toBe(false);
      expect(element.label).toBe('');
      expect(element.hasAttribute('min')).toBe(false);
      expect(element.hasAttribute('max')).toBe(false);
      expect(element.hasAttribute('label')).toBe(false);
      expect(element.hasAttribute('disabled')).toBe(false);
      expect(element.disabled).toBe(false);
    });
  });
  describe('Creating new elements with custom attributes', function () {
    it('creating element base case', function () {
      document.body.innerHTML = '<pair-slider id=\'pslider\' min=10 max=100 disabled label=\'peterSlider\'> </pair-slider>';
      var element = document.getElementById('pslider');
      expect(element.shadowRoot.querySelector('input').min).toBe('10');
      expect(element.shadowRoot.querySelector('input').max).toBe('100');
      expect(element.shadowRoot.querySelector('LABEL').innerHTML).toBe('peterSlider');
      expect(element.getAttribute('disabled')).toBe('');
    });
    it('testing min = max', function () {
      document.body.innerHTML = '<pair-slider id=\'pslider\' min=100 max=100> </pair-slider>';
      var element = document.getElementById('pslider');
      expect(element.shadowRoot.querySelector('input').min).toBe('100');
      expect(element.shadowRoot.querySelector('input').max).toBe('100');
    });
    it('testing min > max', function () { // maybe problematic
      document.body.innerHTML = '<pair-slider id=\'pslider\' min=101 max=100> </pair-slider>';
      var element = document.getElementById('pslider');
      expect(element.shadowRoot.querySelector('input').min).toBe('101');
      expect(element.shadowRoot.querySelector('input').max).toBe('100');
    });
  });
  describe('Testing tooltip attribute', function () {
    it('testing tool tips', function () {
      document.body.innerHTML = '<pair-slider id=\'pslider\' tooltip> </pair-slider>';
      var element = document.getElementById('pslider');
      expect(element.toolTipVisible).toBe(true);
    });
  });
  describe('Testing boot strap theme attributes', function () {
    it('testing boot strap primary', function () {
      document.body.innerHTML = '<pair-slider id=\'pslider\' primary> </pair-slider>';
      var element = document.getElementById('pslider');
      var sliderbody = element.shadowRoot.querySelector('input');
      expect(sliderbody.style.getPropertyValue('--active-color')).toBe('#007bff');
    });
    it('testing boot strap secondary', function () {
      document.body.innerHTML = '<pair-slider id=\'pslider\' secondary> </pair-slider>';
      var element = document.getElementById('pslider');
      var sliderbody = element.shadowRoot.querySelector('input');
      expect(sliderbody.style.getPropertyValue('--active-color')).toBe('#6c757d');
    });
    it('testing boot strap success', function () {
      document.body.innerHTML = '<pair-slider id=\'pslider\' success> </pair-slider>';
      var element = document.getElementById('pslider');
      var sliderbody = element.shadowRoot.querySelector('input');
      expect(sliderbody.style.getPropertyValue('--active-color')).toBe('#28a745');
    });
    it('testing boot strap danger', function () {
      document.body.innerHTML = '<pair-slider id=\'pslider\' danger> </pair-slider>';
      var element = document.getElementById('pslider');
      var sliderbody = element.shadowRoot.querySelector('input');
      expect(sliderbody.style.getPropertyValue('--active-color')).toBe('#dc3545');
    });
    it('testing boot strap warning', function () {
      document.body.innerHTML = '<pair-slider id=\'pslider\' warning> </pair-slider>';
      var element = document.getElementById('pslider');
      var sliderbody = element.shadowRoot.querySelector('input');
      expect(sliderbody.style.getPropertyValue('--active-color')).toBe('#ffc107');
    });
    it('testing boot strap info', function () {
      document.body.innerHTML = '<pair-slider id=\'pslider\' info> </pair-slider>';
      var element = document.getElementById('pslider');
      var sliderbody = element.shadowRoot.querySelector('input');
      expect(sliderbody.style.getPropertyValue('--active-color')).toBe('#17a2b8');
    });
    it('testing boot strap dark', function () {
      document.body.innerHTML = '<pair-slider id=\'pslider\' dark> </pair-slider>';
      var element = document.getElementById('pslider');
      var sliderbody = element.shadowRoot.querySelector('input');
      expect(sliderbody.style.getPropertyValue('--active-color')).toBe('#343a40');
    });
  });
  describe('Testing value name', function () {
    it('testing value name', function () {
      document.body.innerHTML = '<pair-slider id=\'pslider\' value-name=\'sliderValue\'></pair-slider>';
      var element = document.getElementById('pslider');
      expect(element.getAttribute('value-name')).toBe('sliderValue');
    });
  });
  describe('Testing value', function () {
    it('testing value abnormal', function () {
      document.body.innerHTML = '<pair-slider id=\'pslider\' value=\'sliderValue\'></pair-slider>';
      var element = document.getElementById('pslider');
      expect(element.getAttribute('value')).toBe('sliderValue');
    });
    it('testing value normal', function () {
      document.body.innerHTML = '<pair-slider id=\'pslider\' value=123></pair-slider>';
      var element = document.getElementById('pslider');
      expect(element.getAttribute('value')).toBe('123');
    });
    it('testing value normal2', function () {
      document.body.innerHTML = '<pair-slider id=\'pslider\' value=40 min=50></pair-slider>';
      var element = document.getElementById('pslider');
      expect(element.getAttribute('value')).toBe('40');
    });
    it('change value', function () {
      document.body.innerHTML = '<pair-slider id=\'pslider\'></pair-slider>';
      var element = document.getElementById('pslider');
      element.changeValue(20);
      // expect(element.getAttribute('value')).toBe('40');
    });
  });
});
