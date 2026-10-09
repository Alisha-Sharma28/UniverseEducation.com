# UniVerse Education website

A static, multi-page website for UniVerse Education. It uses plain HTML, CSS and JavaScript, with no frameworks and no build step, so it can be hosted free on **Netlify** or **GitHub Pages**.

## File structure

```
index.html          Home
impact.html         Our Impact (map, lab cards, where money goes, giving levels)
story.html          Our Story (founding story, timeline, team, Asha partnership, press)
how-it-works.html   Process + FAQ
get-involved.html   Four paths, starter kit, volunteer form
events.html         Dinner Night + past events
donate.html         Donation widget + trust badges
contact.html        Contact form
thanks.html         Form success page
404.html            Not-found page
css/styles.css      The one shared stylesheet (colors/fonts at the top in :root)
js/config.js        ⭐ All numbers, links, EIN, event details and integrations live here
js/layout.js        The one shared header + footer (edit the menu here)
js/main.js          Counters, animations, forms, donate widget, map, analytics
images/             Photos + logos (see images/README.md for exact filenames)
robots.txt, sitemap.xml, favicon.svg
```

## Before you publish: fill in the placeholders

Anything unverified shows on the page as **highlighted yellow text in [brackets]**. To find every placeholder:

- Search the `.html` files for `class="tbd"` and `CONFIRM`.
- Open `js/config.js` and fill in every `""` / `null`.
- Add your photos to `/images` using the filenames in `images/README.md`. They appear automatically.
- Replace `https://universeeducation.com` in the `<head>` of each page and in `robots.txt` / `sitemap.xml` with your real domain.

Before you publish, double-check these against each other, because your notes and the brief disagree:

| Item | Notes say | Brief says |
|---|---|---|
| Amount raised | "over $10K" | "$16,000+" |
| Locations | 5 (Wazirpur UP, Kathmandu, Pune, +2) | 4 labs: Gujarat, Rajasthan, Kathmandu |
| Nepal partner | Koseli Foundation (slum communities) | "an orphanage in Nepal" |

Also confirm the tax-deductibility FAQ, the EIN, and the nonprofit status line. Only say donations are tax-deductible once IRS 501(c)(3) status (or a fiscal sponsor) is confirmed.

## Preview it on your computer

**Quickest:** double-click `index.html` to open it in your browser. Everything works except the map tiles on some browsers.

**Recommended (works exactly like the live site):**

1. Open a terminal in this folder.
2. Run `python3 -m http.server 8000` (Windows: `py -m http.server 8000`).
3. Visit http://localhost:8000.
4. Press `Ctrl+C` in the terminal to stop.

If you use VS Code, the **Live Server** extension does the same thing with one click.

## Publish it live

### Option A: Netlify (recommended, because forms work with zero setup)

1. Go to https://app.netlify.com and sign up with your GitHub account.
2. Click **Add new site → Import an existing project → GitHub**, then pick this repository.
3. Leave the build command **empty** and set the publish directory to `/` (the root). Click **Deploy**.
4. In about 30 seconds you'll get a URL like `https://universe-education.netlify.app`. You can rename it in **Site configuration → Change site name**.
5. Forms: go to **Forms** in the Netlify dashboard and enable form detection, then redeploy. Submissions from the Contact and Get Involved forms will appear there. Turn on email notifications under **Forms → Form notifications**.
6. Every time you push to GitHub, Netlify redeploys automatically.

*No GitHub?* You can also drag and drop this whole folder onto https://app.netlify.com/drop.

### Option B: GitHub Pages

1. Push this repo to GitHub (on the `main` branch).
2. In the repo, go to **Settings → Pages**.
3. Under **Source**, choose **Deploy from a branch**, then select `main` and `/ (root)`. Click **Save**.
4. After about a minute, the site is live at `https://<your-username>.github.io/<repo-name>/`.
5. Forms: GitHub Pages can't receive form posts. Create a free form at https://formspree.io and paste its endpoint into `formEndpoint` in `js/config.js`.

### Custom domain (either host)

Buy a domain (for example from Namecheap, Cloudflare or Google), then follow your host's guide: Netlify **Domain management → Add a domain**, or GitHub **Settings → Pages → Custom domain**. HTTPS is free and automatic on both.

## Connect the integrations (all in `js/config.js`)

| Setting | How to get it |
|---|---|
| `mailchimpAction` | Mailchimp → **Audience → Signup forms → Embedded forms**. Copy the URL inside `action="..."`. |
| `formEndpoint` | Only needed on GitHub Pages (see above). |
| `gaId` | Google Analytics → **Admin → Data streams** → your **Measurement ID** (`G-…`). Once this is set, a cookie consent banner appears automatically and analytics load only after the visitor accepts. |
| `event.*` | Event date (ISO format), a friendly date label, the venue, and the ticket link. This turns on the **Add to calendar** and **Google Calendar** buttons. |
| `stats.*` | The animated numbers on the home page. |

## Editing tips

- **Donation links:** the GoFundMe and PayPal buttons are near the top of `donate.html`. Search for `gofund.me` or `paypal.me` to change them.

- **Impact map:** it's your Google My Map. Edit pins at https://www.google.com/mymaps and the website updates automatically.
- **Partner logos:** drop `partner-bvjss.png` or `partner-asha.png` into `/images` and they replace the name tiles on the home page.

- **Colors and fonts:** change the variables at the top of `css/styles.css`.
- **Menu or footer:** edit `js/layout.js` once and every page updates.
- **New page:** copy any page and change its `<title>`, meta description, OG tags, and `data-page`.
