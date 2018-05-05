import React from 'react';

export default {
  title: "What's this?",
  excerpt:
    "After much thought, I decided it's time I had a more complete web presence. I needed to have a place to experiment different stuff and write notes for my future self.",
  date: '2017-10-29',
  slug: 'whats-this',
  draft: false,
  content: (
    <div>
      <p>
        After much thought, I decided it's time I had a more complete web presence. I needed to have a place to
        experiment different stuff and write notes for my future self.
      </p>
      <p>
        The site is built using <a href="https://www.gatsbyjs.org/">Gatsby.js</a> which recently arrived at 1.0 and
        makes it a really nice choice for blogs and small content first websites. It can take a bit of time to get used
        to the architecture, but the documentation has a lot of examples and if something's missing, you can always
        check the <a href="https://github.com/gatsbyjs/gatsby/tree/master/examples">repository</a> for more information.
      </p>
      <p>
        It's hosted on <a href="https://www.netlify.com/">Netlify</a>, which has a really comprehensive free tier,
        global CDN, HTTPS for custom domains, continuous deployment that goes along very well with{' '}
        <a href="https://gitlab.com/">Gitlab</a>, prerendering to help Google indexing of single page apps and a lot
        more. I use Gitlab for source control instead of Github because it offers support for private repositories for
        free, which might come in handy for my top secret, AI surveillance stuff I usually do.
      </p>
      <p>
        Anyway, I'm pretty happy with how easy it was to setup once you get used to the way Gatsby.js builds the pages
        and uses plugins (<em>gatsby-config.js</em>, <em>gatsby-node.js</em>). Other than that, you can use pretty much
        all of React's goodness to basically implement a SPA. All the routing is taken care off by Gatsby.
      </p>
      <p>
        As a nice bonus, I've used <a href="https://twitter.com/zachleat">Zach's</a>{' '}
        <a href="https://www.zachleat.com/web/comprehensive-webfonts/">font loading strategy</a> on the Merriweather
        font family you're currently seeing. One thing Zach mentioned was creating a subset font for loading right away
        with a smaller character base. For that, Michael's{' '}
        <a href="https://michaeljherold.com/2016/05/04/creating-a-subset-font.html">article</a> was really helpful. Just
        be sure to use <code>pip install --user</code> when installing <code>fonttools</code>.
      </p>
    </div>
  ),
};
