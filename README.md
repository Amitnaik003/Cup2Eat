# Cup2Eat website

A responsive, single-page marketing site for Cup2Eat. The concept positions the product as a memorable edible serving experience while keeping unverified product and sustainability claims out of the copy.

## Preview locally

```powershell
npm run dev
```

Then open `http://127.0.0.1:4173`.

## Before publishing

Replace or confirm the following with Cup2Eat:

- Current ingredients, allergen information, flavours, sizes, and storage guidance
- Verified performance guidance for temperature, fillings, and serving time
- Available countries, delivery areas, minimum quantities, and sample policy
- Wholesale or distributor contact details
- Real product photography and serving videos
- Genuine customer testimonials, partner logos, certifications, and press mentions
- Confirmed customisation and private-label options
- Final domain, analytics, privacy policy, and form-processing destination

The enquiry form currently keeps all information in the visitor's browser. It prepares a message that can be copied and sent to `@cup2eat` on Instagram; it does not submit or store data.

## Files

- `index.html` — page structure and content
- `styles.css` — full visual system and responsive layout
- `script.js` — navigation, motion, serving tabs, FAQ behavior, and enquiry composer
- `assets/` — vector logo, favicon, and social preview
- `server.js` — dependency-free local preview server
