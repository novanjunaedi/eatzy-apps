const assert = require('assert');

Feature('Reviewing Restaurants');

Scenario('Review test', async (I) => {
  I.amOnPage('/');

  I.click(locate('.restaurant__name a').first());

  I.seeElement('.review__input');

  const name = 'Ujangxx';
  const review = 'restoran recommended';

  I.fillField('#enterName', name);
  I.fillField('#enterReview', review);

  I.click('#btnSubmit');
  I.wait(2);

  const latestReview = locate('.review__text').last();
  const textLatestReview = await I.grabTextFrom(latestReview);

  assert.strictEqual(`"${review}"`, textLatestReview);
});
