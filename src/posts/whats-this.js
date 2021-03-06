import React from 'react';

export default {
  title: "What's this?",
  excerpt:
    "After much thought, I decided it's time I had a more complete web presence. I needed to have a place to experiment different stuff and write notes for my future self.",
  slug: 'whats-this',
  date: '2017-10-29',
  content: (
    <div>
      <p>
        <em>
          [Edit {new Date('2018-11-06').toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}]:{' '}
          The site is build using plain <a href="https://reactjs.org/">React</a> instead, Gatsby provided too many
          constraints in dynamically rendering content and I needed more control over the pages and what actually goes
          in the canvas element. I lose great blogging functionality like posts structure and layout generation that
          Gatsby provides, but gain access to the bits and pieces of content handling.
        </em>
      </p>
      <p>
        After much thought, I decided it&apos;s time I had a more complete web presence. I needed to have a place to
        experiment different stuff and write notes for my future self.
      </p>
      <p>
        <span style={{ textDecoration: 'line-through' }}>
          The site is built using{' '}
          <a style={{ textDecoration: 'line-through' }} href="https://www.gatsbyjs.org/">
            Gatsby.js
          </a>
        </span>{' '}
        which recently arrived at 1.0 and makes it a really nice choice for blogs and small content first websites. It
        can take a bit of time to get used to the architecture, but the documentation has a lot of examples and if
        something&apos;s missing, you can always check the{' '}
        <a href="https://github.com/gatsbyjs/gatsby/tree/master/examples">repository</a> for more information.
      </p>
      <p>
        It&apos;s hosted on <a href="https://www.netlify.com/">Netlify</a>, which has a really comprehensive free tier,
        global CDN, HTTPS for custom domains, continuous deployment that goes along very well with{' '}
        <a href="https://gitlab.com/">Gitlab</a>, prerendering to help Google indexing of single page apps and a lot
        more. I use Gitlab for source control instead of Github because it offers support for private repositories for
        free, which might come in handy for my top secret, AI surveillance stuff I usually do.
      </p>
      <p>
        Anyway, I&apos;m pretty happy with how easy it was to setup once you get used to the way Gatsby.js builds the
        pages and uses plugins (<em>gatsby-config.js</em>, <em>gatsby-node.js</em>). Other than that, you can use pretty
        much all of React&apos;s goodness to basically implement a SPA. All the routing is taken care off by Gatsby.
      </p>
      <p>
        As a nice bonus, I&apos;ve used <a href="https://twitter.com/zachleat">Zach&apos;s</a>{' '}
        <a href="https://www.zachleat.com/web/comprehensive-webfonts/">font loading strategy</a> on the Merriweather
        font family you&apos;re currently seeing. One thing Zach mentioned was creating a subset font for loading right
        away with a smaller character base. For that, Michael&apos;s{' '}
        <a href="https://michaeljherold.com/2016/05/04/creating-a-subset-font.html">article</a> was really helpful. Just
        be sure to use <code>pip install --user</code> when installing <code>fonttools</code>.
      </p>
    </div>
  ),
};
