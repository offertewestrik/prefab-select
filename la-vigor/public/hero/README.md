# Hero imagery — drop-in slots

The hero is fully art-directed in code and looks premium with **no images at
all** (layered gradients, golden light, steam, floating beans, CSS product).
To elevate it with real photography, drop either/both of these files here —
the hero picks them up automatically, **no code change needed**:

| File | Used as | Recommended |
|------|---------|-------------|
| `hero-bg.jpg` | Full-bleed cinematic background behind the headline | ~2400×1350, warm/golden, keep the **left third darker/empty** for the text. JPG, < 400 KB. |
| `product.png` | The floating hero product (iced caramel mocha + chocolate donut) | **Transparent PNG** cut-out, ~1000×1200, soft contact shadow baked in. |

If a file is absent, that layer gracefully falls back (gradient background /
CSS product), so the hero is never broken.

## Generating the assets

- **Canva** — a starting design was generated in your account:
  _"Iced Caramel Mocha with Chocolate Donut"_ (+ 3 alternates). Open it, refine,
  then **Share → Download → PNG/JPG** and save here. (The MCP export was blocked
  by the connected account's API scope, so export manually from the Canva UI.)
- **Runway** — generate a text-free product cut-out or a warm cafe background,
  export, and drop in with the filenames above.

Keep the photographic direction consistent with the design system's image
guide: golden hour, warm, shallow depth-of-field, no cold/stock lighting.
