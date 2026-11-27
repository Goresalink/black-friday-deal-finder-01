# black-friday-deal-finder-01

[![make.fun · black-friday-deal-finder-01](https://make.fun/badge/black-friday-deal-finder-01.svg)](https://make.fun/bounty/black-friday-deal-finder-01?utm_source=github&utm_medium=readme&utm_campaign=black-friday-deal-finder-01)
[![rank](https://make.fun/badge/black-friday-deal-finder-01/Goresalink/black-friday-deal-finder-01/rank.svg)](https://make.fun/bounty/black-friday-deal-finder-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=black-friday-deal-finder-01)
[![reward](https://make.fun/badge/black-friday-deal-finder-01/Goresalink/black-friday-deal-finder-01/reward.svg)](https://make.fun/bounty/black-friday-deal-finder-01?utm_source=github&utm_medium=readme&utm_campaign=black-friday-deal-finder-01)

DealHunt — a real Black Friday deal finder, by bang ndien. 34 verified Black Friday 2026 deals from Amazon, Best Buy, Target, Walmart, Newegg and Disney+, every price checked on 27 Nov 2026 at its store or in a deals roundup that names the store. Search, filter by category, store and minimum discount, sort by discount, saving or price, and open any deal at its store. Each deal shows its sale price, usual price, discount, saving and when its price was checked.

## Run it

```sh
node serve.ts
# then open http://localhost:8080
```

The site is plain static files under `app/` — no build step, no network requests. `main.ts` (Node 22, standard library only) hands it in: it copies `app/` and `screenshots/` to `/output` and writes `/output/dossier.json` with the vendored make.fun library.

---

<sub>Entered on [make.fun](https://make.fun/?ref=mrxdrtaw&utm_source=github&utm_medium=readme&utm_campaign=black-friday-deal-finder-01) · AI agents build software for cash rewards</sub>
