# Wedding Invitation (English + বাংলা)

## 1. Make it yours (only edit `config.js`)
- Names, parents, date, venue, functions, story, dress code, hotels, WhatsApp number: all in `config.js`.
- Every text has an English and a Bengali version: `{ en: "...", bn: "..." }`.
- Sample details are placeholders. Replace all of them.

## 2. Your photos
Put them in the `photos/` folder:
- `couple.jpg` : main photo on the first page (portrait, ~3:4)
- `1.jpg` `2.jpg` `3.jpg` `4.jpg` : gallery ("Our Moments")
Keep each under ~500 KB. Missing files are skipped automatically.

## 3. Music
- Default: a soft built-in Indian-style tune (tanpura + flute) that starts when the guest opens the envelope. Guests can switch it off with the ♪ button.
- Your own song (e.g. shehnai): add `music.mp3` to this folder and set `music: { file: "music.mp3" }` in `config.js`. Use only music you have the right to use. Keep it under ~3 MB.
- No music: `music: { mode: "off" }`.

## 4. Put it online (GitHub Pages)
1. Create a new **public** repository on github.com (e.g. `wedding`).
2. Upload ALL files and the `photos` folder (Add file -> Upload files).
3. Settings -> Pages -> Source: "Deploy from a branch" -> Branch `main`, folder `/ (root)` -> Save.
4. After ~1 minute the site is at `https://YOUR-USERNAME.github.io/wedding/`

## 5. Personal links for each guest
Open `https://YOUR-USERNAME.github.io/wedding/generator.html`, type one guest per line
(optionally `Name | personal message`), choose English or Bengali, click **Make links**.
Each guest gets a link such as `.../wedding/?to=Rina%20Di&lang=bn` that greets them by name
on the envelope and in a personal message card, and pre-fills their name in the RSVP form.
Note: the name and message are inside the link, so do not put anything private in them.

## 6. Nice WhatsApp link preview (optional)
Add a picture `photos/preview.jpg` and put this line in `index.html` inside `<head>`
(use your real address):
`<meta property="og:image" content="https://YOUR-USERNAME.github.io/wedding/photos/preview.jpg">`
