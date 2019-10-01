/* eslint-disable no-undef */
/* eslint-disable semi */
import { Selector } from 'testcafe';

fixture`Pair Slider Browser Test`
  .page`./pair-slider.html`;

const getElementById = Selector(id => document.querySelector(id));

test('value name', async t => {
  const component = await getElementById('pair-slider');
  await t
    .expect(component.hasAttribute('value-name')).eql(true)
    .expect(component.getAttribute('value-name')).eql('Red');
});

test('value', async t => {
  const component = await getElementById('pair-slider');
  await t
    .expect(component.hasAttribute('value')).eql(true)
    .expect(component.getAttribute('value')).eql('1');
});

test('min', async t => {
  const component = await getElementById('pair-slider');
  await t
    .expect(component.hasAttribute('min')).eql(true)
    .expect(component.getAttribute('min')).eql('1');
});

test('max', async t => {
  const component = await getElementById('pair-slider');
  await t
    .expect(component.hasAttribute('max')).eql(true)
    .expect(component.getAttribute('max')).eql('10');
});

test('Click slider', async t => {
  const component = await Selector(() => document.querySelector('pair-slider').shadowRoot.querySelector('input'));
  await t
    .click(component);
})

test('Hover slider', async t => {
  const component = await Selector(() => document.querySelector('pair-slider').shadowRoot.querySelector('input'));
  await t
    .hover(component);
});
