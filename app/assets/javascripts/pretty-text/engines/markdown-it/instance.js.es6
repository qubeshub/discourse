import mentions from 'pretty-text/engines/markdown-it/mentions';
import emoji from 'pretty-text/engines/markdown-it/emoji';
import quotes from 'pretty-text/engines/markdown-it/quotes';
import onebox from 'pretty-text/engines/markdown-it/onebox';
import bbcodeBlock from 'pretty-text/engines/markdown-it/bbcode-block';
import bbcodeInline from 'pretty-text/engines/markdown-it/bbcode-inline';
import code from 'pretty-text/engines/markdown-it/code';
import censored from 'pretty-text/engines/markdown-it/censored';
import categoryHashtag from 'pretty-text/engines/markdown-it/category-hashtag';


export default function(opts) {
  let engine = window.markdownit({
    discourse: opts,
    html: true,
    breaks: opts.features.newline,
    xhtmlOut: false,
    linkify: true,
    typographer: false
  });

  if (opts.features.mentions) {
    engine = engine.use(mentions);
  }

  if (opts.features.onebox) {
    engine.use(onebox);
  }


  if (opts.features.emoji) {
    engine.use(emoji);
  }

  let bbcodeInstance = bbcodeBlock.create();

  if (opts.features.quote) {
    bbcodeInstance.addBlockRule(quotes);
  }

  if (opts.features.code) {
    engine.use(code);
  }

  if (opts.features["category-hashtag"]) {
    engine.use(categoryHashtag);
  }


  if (opts.features.censored) {
    engine.use(censored);
  }

  engine.use(bbcodeInstance.plugin);

  if (opts.features.bbcode) {
    engine.use(bbcodeInline);
  }
  return engine;
}
