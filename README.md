# UniVerse Education website

The website for UniVerse Education, a student-led initiative bringing computer labs with Wi-Fi to rural schools across South Asia. It is plain HTML, CSS and JavaScript with no build step, hosted free on GitHub Pages.

**Live site:** https://universeeducation.net/

## Pages

| File | Page |
|---|---|
| `index.html` | Home |
| `impact.html` | Our Impact (map, press, photos) |
| `story.html` | Our Story (founding story, milestones timeline) |
| `team.html` | Our Team (leadership, officer applications) |
| `how-it-works.html` | How It Works + FAQ |
| `get-involved.html` | Get Involved (four paths + inquiry form) |
| `donate.html` | Donate (GoFundMe and PayPal) |
| `thanks.html`, `404.html` | Form fallback and not-found pages |

## Where things live

- `css/styles.css`: the one stylesheet. Colours and fonts are set at the top.
- `js/layout.js`: the shared header and footer (menu links, footer email, social icons).
- `js/config.js`: impact numbers, email, Instagram/LinkedIn links, form delivery, officer application link.
- `js/main.js`: counters, animations, mobile menu, form sending.
- `fonts/`: DM Serif Display (titles) and DM Sans (text), self-hosted (SIL Open Font License).
- `images/`: all photos and logos. `og-image.jpg` is the picture shown when the link is shared.

## How things work

- **Inquiry form** (Get Involved): messages are emailed to UniVerseEducation.org@gmail.com through FormSubmit. The first message sends an activation email to that inbox; click **Activate Form** once.
- **Map** (Our Impact): an embedded Google My Map. Edit pins at google.com/mymaps; the map must be shared as "Anyone with the link can view".
- **Donations**: the GoFundMe and PayPal buttons are near the top of `donate.html`.
- **Officer applications**: the Apply now buttons link to the Google Form set in `js/config.js`.

## Preview locally

From this folder run `python3 -m http.server 8000`, then open http://localhost:8000.

## Publishing (GitHub Pages)

Settings → Pages → Source: **Deploy from a branch** → Branch: `main`, folder `/ (root)` → Save. Changes merged into `main` go live within a minute or two.

## Custom domain

The site uses **universeeducation.net** (registered at Namecheap). The `CNAME` file in this folder tells GitHub Pages which domain to serve; don't delete it.

Namecheap → Domain List → Manage → Advanced DNS has:
- four `A` records for `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
- one `CNAME` record for `www` → `alisha-sharma28.github.io`
