# Download RGE Email Screenshots

## Quick Instructions

1. Open Chrome and go to: https://reallygoodemails.com (wait for Cloudflare to pass)
2. Open DevTools: Cmd+Option+J
3. Paste the script below and press Enter
4. Chrome may ask "allow multiple downloads" - click Allow
5. All 26 images will save to your Downloads folder
6. Then run: `mv ~/Downloads/0*.png "/Users/georgehartley/nitrosend/Best Email Designs/assets/screenshots/"`

## Script (paste in Chrome Console)

```javascript
(async function() {
  var urls = [
    ['006-headspace.png', 'https://files.reallygoodemails.com/emails/welcome-headspace.png'],
    ['012-duolingo.png', 'https://files.reallygoodemails.com/emails/daily-reminder-email-design-from-duolingo.png'],
    ['014-snif.png', 'https://files.reallygoodemails.com/emails/dont-freak-out.png'],
    ['018-armra.png', 'https://files.reallygoodemails.com/emails/armra-colostrum-vs-allergy-season.png'],
    ['022-tracksmith.png', 'https://files.reallygoodemails.com/emails/running-is-a-gift.png'],
    ['024-tuft-and-needle.png', 'https://files.reallygoodemails.com/emails/mattress-buying-explained.png'],
    ['026-liquor-loot.png', 'https://files.reallygoodemails.com/emails/your-cart-is-sobering-up.png'],
    ['027-ugmonk.png', 'https://files.reallygoodemails.com/emails/offering-you-my-personal-email.png'],
    ['028-dollar-shave-club.png', 'https://files.reallygoodemails.com/emails/where-did-you-go.png'],
    ['030-stripe.png', 'https://files.reallygoodemails.com/emails/transactional-email-design-from-stripe.png'],
    ['031-airbnb.png', 'https://files.reallygoodemails.com/emails/reservation-confirmed-for-san-francisco.png'],
    ['032-haoma.png', 'https://files.reallygoodemails.com/emails/thank-you-for-your-order.png'],
    ['033-webflow.png', 'https://files.reallygoodemails.com/emails/welcome-webflow.png'],
    ['036-nike.png', 'https://files.reallygoodemails.com/emails/forget-fomosee-whats-waiting-for-you.png'],
    ['037-brooklinen.png', 'https://files.reallygoodemails.com/emails/not-a-marketing-email.png'],
    ['043-glossier.png', 'https://files.reallygoodemails.com/emails/your-first-email.png'],
    ['044-blizzard.png', 'https://files.reallygoodemails.com/emails/prepare-for-the-future-of-warcraft-smlsdvs.png'],
    ['045-warby-parker.png', 'https://files.reallygoodemails.com/emails/welcome-warby-parker.png'],
    ['046-dior.png', 'https://files.reallygoodemails.com/emails/dior-essentials-modern-and-iconic.png'],
    ['049-beardbrand.png', 'https://files.reallygoodemails.com/emails/did-you-say-beard-welcome-to-beardbrand.png'],
    ['051-pangaia.png', 'https://files.reallygoodemails.com/emails/-pp-pangaia-is-here-free-to-try-serif.png'],
    ['053-aesop.png', 'https://files.reallygoodemails.com/emails/an-aesop-welcome.png'],
    ['054-frank-body.png', 'https://files.reallygoodemails.com/emails/send-a-love-letter-on-me.png'],
    ['055-liquid-death.png', 'https://files.reallygoodemails.com/emails/maybe-you-died.png'],
    ['056-fly-by-jing.png', 'https://files.reallygoodemails.com/emails/score-free-sauce.png'],
    ['057-omsom.png', 'https://files.reallygoodemails.com/emails/with-omsom-there-are-no-more-false-starters-.png']
  ];
  var count = 0;
  for (var item of urls) {
    try {
      var resp = await fetch(item[1]);
      var blob = await resp.blob();
      if (blob.size < 3000) { console.log('SKIP ' + item[0] + ' (too small)'); continue; }
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = item[0];
      a.click();
      URL.revokeObjectURL(a.href);
      count++;
      console.log('OK: ' + item[0] + ' (' + Math.round(blob.size/1024) + 'KB)');
      await new Promise(r => setTimeout(r, 800));
    } catch(e) { console.log('FAIL: ' + item[0] + ' - ' + e.message); }
  }
  console.log('Done! Downloaded ' + count + '/' + urls.length);
})();
```
