#!/usr/bin/env python3
"""
eliteloop-web mağaza linki + Smart App Banner düzeltmesi.

- Türk vitrinine sabitlenmiş App Store linklerini storefront-nötr hale getirir
  (Apple ziyaretçiyi kendi ülkesinin vitrinine yönlendirir).
- Her linke sayfa türüne göre kampanya etiketi ekler.
- Play linklerine Install Referrer parametresi ekler (Android'de tek başına çalışır).
- Smart App Banner'a şehir bazlı app-argument ekler; eksik sayfalara banner koyar.

Kullanım: python3 fix_store_links.py [--apply]   (varsayılan: dry-run)
"""
import re, sys, os, pathlib

ROOT = pathlib.Path("/Users/hakanaydin/Desktop/eliteloop/eliteloop-web")
APP_ID = "6756173969"
PKG = "com.eliteloop.app"
APPLE_PT = "128074878"  # App Store Connect > App Analytics > Campaigns

CITIES = {
    "abu-dhabi","amsterdam","barcelona","berlin","chicago","copenhagen","dubai",
    "geneva","hong-kong","istanbul","lisbon","london","los-angeles","madrid",
    "mexico-city","miami","milan","monaco","mumbai","munich","new-york","paris",
    "riyadh","rome","san-francisco","sao-paulo","seoul","singapore","sydney",
    "tokyo","toronto","vienna","zurich",
}

OLD_APPLE = "https://apps.apple.com/tr/app/eliteloop-meet-connect/id" + APP_ID
PREV_APPLE_RE = re.compile(r"https://apps\.apple\.com/app/(?:apple-store/)?id" + APP_ID + r"\?[^\"\']*")
OLD_PLAY = "https://play.google.com/store/apps/details?id=" + PKG


def classify(path: pathlib.Path):
    """(kampanya etiketi, deep link) döndürür."""
    stem = path.stem
    if stem.startswith("_template"):
        # Şablonda gerçek şehir yok — doldurulmadığı anda göze batsın diye placeholder
        return "city-CITYSLUG", "eliteloop://city/CITYSLUG"
    if stem.startswith("global-pulse"):
        return "pulse", "eliteloop://"
    m = re.match(r"^([a-z-]+?)-(?:events|april|mid-april|scene)-", stem)
    if m and m.group(1) in CITIES:
        return f"guide-{m.group(1)}", f"eliteloop://city/{m.group(1)}"
    if stem in CITIES:
        return f"city-{stem}", f"eliteloop://city/{stem}"
    return "web", "eliteloop://"


COARSE = {"city": "web-city", "guide": "web-guide", "pulse": "web-pulse"}


def coarse_ct(ct):
    return COARSE.get(ct.split("-")[0], "web-other")


def apple_url(ct, amp):
    params = [f"ct={coarse_ct(ct)}", "mt=8"]
    if APPLE_PT:
        params.insert(0, f"pt={APPLE_PT}")
    return f"https://apps.apple.com/app/apple-store/id{APP_ID}?" + amp.join(params)


def play_url(ct, amp):
    ref = f"utm_source%3Deliteloop.app%26utm_medium%3Dweb%26utm_campaign%3D{ct}"
    return f"{OLD_PLAY}{amp}referrer={ref}"


BANNER_RE = re.compile(r'<meta\s+name="apple-itunes-app"[^>]*>')
VIEWPORT_RE = re.compile(r'(<meta\s+name="viewport"[^>]*>)')


def process(path: pathlib.Path, apply: bool):
    ct, deeplink = classify(path)
    if ct is None:
        return None
    src = path.read_text(encoding="utf-8")
    out = src
    stats = {"apple": 0, "play": 0, "banner": 0}

    # Mağaza linkleri — tırnak türüne göre & kaçışı (href: &amp;, JS: &)
    for quote in ('"', "'"):
        amp = "&amp;" if quote == '"' else "&"
        a_old, a_new = quote + OLD_APPLE + quote, quote + apple_url(ct, amp) + quote
        stats["apple"] += out.count(a_old)
        out = out.replace(a_old, a_new)
        p_old, p_new = quote + OLD_PLAY + quote, quote + play_url(ct, amp) + quote
        stats["play"] += out.count(p_old)
        out = out.replace(p_old, p_new)

    # Önceki turda yazılmış Apple linklerini güncelle (idempotent)
    for quote in ('"', "'"):
        amp = "&amp;" if quote == '"' else "&"
        def _sub(m, amp=amp):
            return apple_url(ct, amp)
        new = PREV_APPLE_RE.sub(lambda m: _sub(m), out)
        if new != out:
            stats["apple"] += len(PREV_APPLE_RE.findall(out))
            out = new

    # Smart App Banner
    banner = f'<meta name="apple-itunes-app" content="app-id={APP_ID}, app-argument={deeplink}">'
    if BANNER_RE.search(out):
        new_out = BANNER_RE.sub(banner, out)
        if new_out != out:
            stats["banner"] = 1
            out = new_out
    elif "<head>" in out:
        m = VIEWPORT_RE.search(out)
        if m:
            out = out[: m.end()] + "\n  " + banner + out[m.end():]
            stats["banner"] = 1

    if out != src:
        if apply:
            path.write_text(out, encoding="utf-8")
        return stats
    return None


def main():
    apply = "--apply" in sys.argv
    files = sorted(ROOT.glob("*.html")) + sorted(ROOT.glob("*/*.html"))
    files = [f for f in files if ".netlify" not in str(f) and "node_modules" not in str(f)]
    tot = {"files": 0, "apple": 0, "play": 0, "banner": 0}
    for f in files:
        r = process(f, apply)
        if r:
            tot["files"] += 1
            for k in ("apple", "play", "banner"):
                tot[k] += r[k]
    mode = "UYGULANDI" if apply else "DRY-RUN"
    print(f"[{mode}] {tot['files']} dosya | App Store: {tot['apple']} | Play: {tot['play']} | banner: {tot['banner']}")
    if not APPLE_PT:
        print("NOT: Apple pt (provider token) boş — ct etiketi linklerde duruyor ama")
        print("     App Analytics attribution'ı pt eklenene kadar pasif. Play referrer aktif.")


if __name__ == "__main__":
    main()
