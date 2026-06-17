# Media assets — status

All AI-generated media was created with Higgsfield and is now **self-hosted
here** and served by Next.js (works for every visitor).

## Present

| File | Used in |
| --- | --- |
| `videos/hero.mp4` + `videos/hero-poster.png` | Hero background |
| `videos/process.mp4` | "شاهد العملية" band |
| `products/gallon.png` | 19L gallon card |
| `products/delivery.png` | Subscription / delivery card |
| `products/office.png` | Business card |
| `facility-1.jpg`, `facility-2.jpg` | About — real facility photos |

## Still to add (optional)

| File | Used in | Source on Higgsfield |
| --- | --- | --- |
| `products/bottles.png` | Bottled-water card (shows a gradient fallback until added) | hf_20260617_154826_92d3e8ff-676f-401d-b50b-44265edb049d.png |

## Override with a remote URL instead

Set any of these env vars to a public URL to bypass the local files:

```
NEXT_PUBLIC_HERO_VIDEO_URL=
NEXT_PUBLIC_HERO_POSTER_URL=
NEXT_PUBLIC_PROCESS_VIDEO_URL=
```

