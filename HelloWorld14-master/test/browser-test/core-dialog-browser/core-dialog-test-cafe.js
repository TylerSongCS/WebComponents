/* eslint-disable no-undef */
import { Selector } from 'testcafe';

fixture`Pair Dialog Browser Test`
  .page`./core-dialog.html`;

const getElementById = Selector(id => document.querySelector(id));

test('pair title', async t => {
  const component = await getElementById('pair-dialog');
  await t
    .expect(component.hasAttribute('pair-title')).eql(true);
});

test('Click dialog', async t => {
  const pusherBody = await Selector(() => document.querySelector('pair-button').shadowRoot.querySelector('button'));
  await t
    .click(pusherBody);
});
