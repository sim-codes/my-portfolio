# my-portfolio

Personal portfolio of Michael Oluwasegun Ibrahim, a static HTML and CSS site deployed on Netlify.

## Changing the domain

The site URL `https://simportfolio.netlify.app` is written into these files. Replace it in all of them when the site moves to a new domain, then redeploy:

- `index.html`, `about.html`, `work.html`, `contact.html`: canonical link, Open Graph and Twitter tags, and the JSON-LD block in the head
- `robots.txt`: sitemap line
- `sitemap.xml`: every `<loc>`

A project-wide find and replace on `https://simportfolio.netlify.app` catches every occurrence.
