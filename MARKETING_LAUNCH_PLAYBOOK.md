# EliteLoop Marketing Launch Playbook

Last updated: 2026-03-22

## Current Stage

EliteLoop is in the `launch preparation` phase.

This means:
- iOS app is live on the App Store
- Android app is in Google Play closed testing
- website foundation is live
- technical SEO basics are in place
- web analytics is connected
- App Store localization work has started
- paid acquisition has not started yet

## Status Snapshot

### Done

#### Brand / Website
- New EliteLoop landing page is live on `eliteloop.app`
- Legal pages are live:
  - privacy
  - terms
  - gdpr
  - support
- Android landing page is live
- `/krallik` admin route was preserved
- footer year updated to `2026`
- Instagram points to `eliteloop.app` and TikTok points to `eliteloopapp`

#### Website SEO
- Homepage `title` and `meta description` updated
- Legal/support/android pages have metadata
- Canonical tags added
- Open Graph tags added
- Twitter card tags added
- `robots.txt` added
- `sitemap.xml` added
- Homepage JSON-LD added
- Native language labels added to locale picker:
  - `Türkçe`
  - `Русский`
  - `العربية`
  - `中文`
  - `日本語`

#### Search Console
- Google Search Console property created for `eliteloop.app`
- `sitemap.xml` submitted
- Manual indexing requests sent for:
  - homepage
  - privacy
  - terms
  - gdpr
  - support
- `android.html` indexing request hit quota and should be retried later

#### Web Analytics
- GA4 property created
- GA4 measurement ID connected to website:
  - `G-6KWG02QGBR`
- GA4 tracking added to:
  - homepage
  - privacy
  - terms
  - gdpr
  - support
  - android

#### App Store / ASO
- English metadata entered
- Arabic metadata entered
- Russian metadata entered
- Japanese metadata entered
- Simplified Chinese metadata entered
- Screenshot strategy decided:
  - screenshots stay in English across markets for a global/premium feel

#### Market Strategy
- Priority markets selected:
  1. UAE
  2. Saudi Arabia
  3. United States
  4. Japan later
- Monthly launch budget framework decided:
  - `30,000 TL / month`
- 5-month budget framework documented

### In Progress
- App Store metadata quality refinement
- Search Console indexing maturation
- website traffic measurement verification
- pre-paid acquisition launch preparation

### Still Missing

#### Search Console / SEO
- Recheck `sitemap.xml` status after Google fetches it
- Retry indexing request for:
  - `https://eliteloop.app/android.html`
- Monitor:
  - indexed pages
  - impressions
  - branded queries
  - top countries

#### Web Analytics
- Confirm GA4 Realtime receives live traffic
- Confirm page views for:
  - `/`
  - `/support.html`
  - `/android.html`
- Add custom events later if needed:
  - App Store click
  - support email click
  - social link clicks
  - language selection

#### App Store Optimization
- Refine `What’s New` copy to stay concise and iPhone-focused
- Improve release notes quality every release
- Prepare review request strategy
- Monitor App Store Connect metrics:
  - product page views
  - conversion rate
  - proceeds / sales
  - retention

#### Paid Acquisition Preparation
- Apple Search Ads account setup
- Apple Search Ads campaign structure
- Meta Ads setup
- Meta creative pack
- TikTok test creative pack

#### Mobile Measurement
- Define app event tracking plan for:
  - signup
  - paywall
  - subscription
  - event creation
  - event joining
  - chat start
  - map usage

## Immediate Next Actions

1. Check GA4 Realtime and confirm live visits are being tracked
2. Recheck Search Console sitemap status
3. Retry indexing request for `/android.html`
4. Set up Apple Search Ads account
5. Prepare first Meta creative pack
6. Prepare Apple Search Ads keyword groups
7. Define app analytics events for conversion funnel tracking

## Not Started Yet

- Apple Search Ads live campaigns
- Meta live campaigns
- TikTok live campaigns
- Android public growth launch
- Japan-specific localization and creative strategy

## Launch Readiness Summary

### Ready
- website
- legal pages
- technical SEO base
- Search Console setup
- GA4 base setup
- multilingual App Store metadata base
- market priority and budget framework

### Not Ready Yet
- paid campaign execution
- full measurement discipline across app funnel
- Apple Search Ads keyword operations
- Meta/TikTok creative production
- App Store review velocity strategy

## Decision Notes

- Do not prioritize Turkey as the main paid market
- First paid markets should be:
  - UAE
  - Saudi Arabia
  - United States (small test)
- Japan should be tested only after stronger localization confidence
- Do not scale paid acquisition before measurement and store conversion are monitored

## Market Priority

Do not launch paid acquisition everywhere at once.

Recommended order:
1. UAE
2. Saudi Arabia
3. United States
4. Japan later, only after a stronger localization and creative pass

Why:
- UAE and Saudi fit the premium, private, selective social concept best
- US has massive spending power, but costs are high
- Japan is valuable but unforgiving if localization and creative tone are weak

## 5-Month Budget Plan

Total budget:
- `150,000 TL`

Monthly budget:
- `30,000 TL`

### Phase 1: Months 1-2
- UAE: `14,000 TL`
- Saudi Arabia: `10,000 TL`
- US: `6,000 TL`

Channel split:
- Apple Search Ads: `40%`
- Meta: `45%`
- TikTok: `15%`

### Phase 2: Month 3
Reallocate based on:
- cost per install
- signup rate
- paywall conversion
- event creation / join rate
- D7 retention

### Phase 3: Months 4-5
Scale only the markets that show:
- sustainable CAC
- strong conversion to paid intent
- decent retention

## Core Positioning

Do not market EliteLoop like a dating app.

Core framing:
- premium social discovery
- map-based presence
- exclusive events
- badge-gated access
- privacy-first messaging

Short message pillars:
- Discover who is around you
- Explore better events
- Connect selectively
- Stay visible on your terms

## Web SEO Checklist

### Already Done
- `title` and `meta description` on key pages
- canonical tags
- robots meta
- Open Graph / Twitter cards
- `robots.txt`
- `sitemap.xml`
- homepage JSON-LD
- native language labels in locale picker

### Next SEO Tasks
1. Add Google Search Console ownership
2. Submit `https://eliteloop.app/sitemap.xml`
3. Monitor indexing for:
   - `/`
   - `/privacy`
   - `/terms`
   - `/gdpr`
   - `/support`
   - `/android`
4. Add Bing Webmaster Tools later
5. Decide whether to keep single-URL language switching or move to locale URLs

### Search Console Setup
Use the Domain property if possible:
- `eliteloop.app`

If Domain property is not available, use URL prefix:
- `https://eliteloop.app/`

After verification:
1. Submit sitemap
2. Inspect homepage URL manually
3. Request indexing for:
   - homepage
   - support
   - android
4. Check:
   - pages indexed
   - canonical chosen by Google
   - mobile usability
   - Core Web Vitals

## Web Analytics Checklist

### GA4 Setup
Create one GA4 property for the website.

Recommended property name:
- `EliteLoop Web`

Recommended data stream:
- `eliteloop.app`

### Track These Events

Required website events:
- `view_homepage`
- `open_language_modal`
- `select_language`
- `click_app_store`
- `click_google_play_interest`
- `click_support_email`
- `view_android_page`
- `view_privacy`
- `view_terms`
- `view_gdpr`
- `view_support`

Optional events:
- `scroll_50`
- `scroll_90`
- `click_social_instagram`
- `click_social_tiktok`

### What Success Looks Like
- homepage to App Store click-through rate
- homepage to Android page click-through rate
- support/legal pages accessible and low-friction
- traffic split by market

## Mobile Analytics Checklist

The app should eventually measure:
- `signup_started`
- `signup_completed`
- `google_signin_success`
- `apple_signin_success`
- `paywall_viewed`
- `trial_started`
- `subscription_started`
- `subscription_restored`
- `event_created`
- `event_joined`
- `dm_started`
- `dm_reply_sent`
- `group_chat_opened`
- `map_session_started`
- `nearby_sheet_opened`

Primary business KPIs:
- signup conversion
- paywall view rate
- trial / subscription start rate
- event creation rate
- event join rate
- D1 / D7 retention

## App Store Connect ASO Checklist

### UAE
Subtitle options:
- `Private social discovery`
- `Exclusive events near you`
- `Premium people, real plans`

### Saudi Arabia
Arabic subtitle options:
- `اكتشاف اجتماعي خاص`
- `فعاليات مميزة بالقرب منك`
- `تعارف راقٍ وخاص`

### United States
Subtitle options:
- `Exclusive events & people`
- `Private social discovery`
- `Premium events near you`

### Screenshot Headline Framework
1. See who is around you
2. Explore events on the map
3. Meet selectively
4. Unlock Silver & Gold
5. Message with control
6. Create exclusive plans

### ASO To-Do
1. Update subtitle by market
2. Rewrite promotional text by market
3. Prepare localized screenshots
4. Improve release notes quality
5. Ask happy users for reviews after a positive action, not randomly

## Paid Acquisition Checklist

### Apple Search Ads
Create 4 campaign groups:
- branded
- generic
- competitor
- discovery

Seed themes:
- private social
- exclusive events
- event app
- meet people nearby
- premium social

### Meta
First creative angles:
1. `Not everyone should have access to you.`
2. `Discover premium people and events near you.`
3. `Less swiping. Better circles.`
4. `Private social discovery for selective people.`

### TikTok
Use as a test channel, not the main scaling engine.

Creative style:
- fast app demo
- map movement
- premium event framing
- social proof

## Website Copy Rules

Keep these themes consistent across ads, store, and site:
- private social discovery
- exclusive events
- map-led exploration
- badge-based access
- visibility on your terms

Avoid:
- sounding like a random dating app
- overpromising exclusivity without showing product mechanics
- generic “meet new people” copy without the map / badge / event angle

## Weekly Operating Routine

### Every Week
1. Check App Store Connect conversion
2. Check paid channel spend
3. Check CPI and signup rate
4. Check paywall view rate
5. Check subscription starts
6. Check top-performing creatives
7. Check website traffic and App Store click-through

### Every Two Weeks
1. Refresh weakest creative set
2. Rewrite underperforming store screenshot copy
3. Re-evaluate country allocation
4. Review user complaints from support and store reviews

## Pre-Scale Gate

Before increasing spend aggressively, make sure:
- Android public launch is stable
- GA4 is live
- Search Console is live
- App install to signup flow is stable
- paywall is not breaking
- Google Sign-In works reliably
- map load and messaging issues are stable

## Immediate Next Actions

1. Set up Google Search Console for `eliteloop.app`
2. Create GA4 web property
3. Add GA4 measurement ID to the website
4. Prepare localized App Store screenshots for UAE / Saudi / US
5. Write Apple Search Ads keyword groups
6. Build first Meta creative pack
7. Do not scale Android paid acquisition before public Play launch
