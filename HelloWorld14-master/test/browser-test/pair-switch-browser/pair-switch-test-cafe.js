/* eslint-disable no-undef */
/* eslint-disable semi */
import { Selector } from 'testcafe';

fixture`Pair Switch Browser Test`
  .page`./pair-switch.html`;

const getElementById = Selector(id => document.querySelector(id));

test('Inactive-color', async t => {
  const component = await getElementById('pair-switch');
  await t
    .expect(component.hasAttribute('inactive-color')).eql(true)
    .expect(component.getAttribute('inactive-color')).eql('#C0C0C0');
});

test('active-color', async t => {
  const component = await getElementById('pair-switch');
  await t
    .expect(component.hasAttribute('active-color')).eql(true)
    .expect(component.getAttribute('active-color')).eql('#ffd1dc');
});

test('active-text', async t => {
  const component = await getElementById('pair-switch');
  await t
    .expect(component.hasAttribute('active-text')).eql(true)
    .expect(component.getAttribute('active-text')).eql('Peter\'s Switch');
});

test('id', async t => {
  const component = await getElementById('pair-switch');
  await t
    .expect(component.hasAttribute('id')).eql(true)
    .expect(component.getAttribute('id')).eql('switch');
});

test('Click toggle', async t => {
  const component = await Selector(() => document.querySelector('pair-switch').shadowRoot.querySelector('label'));
  await t
    .click(component);
});

test('Hover toggle', async t => {
  const component = await Selector(() => document.querySelector('pair-switch').shadowRoot.querySelector('label'));
  await t
    .hover(component);
});
