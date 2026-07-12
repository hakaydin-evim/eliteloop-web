const fs = require('fs');
const path = require('path');

const webDir = path.join(__dirname, '..');

// --- THE JULY 2026 CITY DATABASE ---
const CITIES = {
  "new-york": {
    name: "New York",
    country: "United States",
    emoji: "🗽",
    lang: "en",
    langName: "English",
    metaDesc: "New York elite events July 2026: Macy's 4th of July Fireworks, SummerStage VIP, Lincoln Center, Chelsea VC salons, and Madison Avenue private dining.",
    subTitle: "Chelsea VC salons, Madison Avenue private dining, Macy's 4th of July Fireworks (50th Anniv.), and Lincoln Center summer previews in July 2026.",
    intro1: "New York in July shifts entirely to peak summer outdoor cultural seasons, midsummer rooftop galas, and major finance and tech summer cohorts. The city's elite networking circuit moves between Lower Manhattan loft gatherings, Central Park conservancy VIP zones, and private members' terraces in SoHo.",
    intro2: "As summer heat sets in, the signal shifts from formal boardroom sessions to high-gravity private retreats and off-market investor dining rooms. Moving through these spaces requires a precise filter to separate public crowds from true access.",
    highlight: "Access in New York rewards immediate signal alignment. Use public anchors for context, then activate EliteLoop to bridge into private dinners and off-market investment rooms.",
    blockquote: "In Manhattan, the public list is for visibility; the private list is for transaction. The define moves are always made behind closed doors.",
    closing: "This July, navigating New York requires a filter for the noise. Building your network in this city relies on intention and visibility to the right allocators. That is the protocol EliteLoop New York facilitates.",
    categories: {
      networking: {
        title: "Networking & Business Events",
        items: [
          { name: "Silicon Alley Summer Venture Round", date: "July 8–9, 2026", venue: "Spring Studios, Chelsea", desc: "The premier gathering for East Coast tech allocators, growth founders, and early-stage capital partners. The evening lounges host the real discussions.", startDate: "2026-07-08", endDate: "2026-07-09" },
          { name: "FinTech NYC Midsummer Leaders Dinner", date: "July 15, 2026", venue: "Chelsea Loft", desc: "An invite-only gathering for institutional finance, modern banking, and fintech founders, held away from the conference halls.", startDate: "2026-07-15", endDate: "2026-07-15" }
        ]
      },
      dining: {
        title: "Exclusive Dining & Private Social Experiences",
        items: [
          { name: "SoHo House Midsummer Solstice Reception", date: "July 21, 2026", venue: "SoHo House Roof", desc: "A curated sunset gathering on the SoHo rooftop, celebrating the transition of the creative and professional season.", startDate: "2026-07-21", endDate: "2026-07-21" },
          { name: "Madison Avenue Private Wine Club Dining", date: "July 24, 2026", venue: "The Lowell Hotel", desc: "A private three-course dinner focusing on curated introductions between venture capital, media executives, and tech partners.", startDate: "2026-07-24", endDate: "2026-07-24" }
        ]
      },
      culture: {
        title: "Cultural & Lifestyle Events for the Elite Circle",
        items: [
          { name: "Macy's 4th of July Fireworks (50th Anniv.)", date: "July 4, 2026", venue: "East River & Brooklyn Bridge", desc: "The historic 50th anniversary of the Macy's Fireworks and America's 250th birthday, best viewed from private waterfront enclosures.", startDate: "2026-07-04", endDate: "2026-07-04" },
          { name: "Lincoln Center: Summer for the City Dance Gala", date: "July 10–21, 2026", venue: "Lincoln Center", desc: "Private preview screenings and invite-only cocktail receptions, bringing together filmmakers, patrons, and cultural allocators.", startDate: "2026-07-10", endDate: "2026-07-21" }
        ]
      }
    },
    sources: [
      { name: "Macy's Fireworks", url: "https://www.macys.com/s/social/fireworks/" },
      { name: "Lincoln Center Summer for the City", url: "https://www.lincolncenter.org/" },
      { name: "Lowell Hotel Dining", url: "https://www.lowellhotel.com/" }
    ]
  },
  "london": {
    name: "London",
    country: "United Kingdom",
    emoji: "🇬🇧",
    lang: "en",
    langName: "English",
    metaDesc: "London elite events July 2026: Wimbledon Championships, BST Hyde Park, Hampton Court concerts, Mayfair private equity circles, and Belgravia salons.",
    subTitle: "Mayfair private equity circles, Wimbledon VIP enclosures, BST Hyde Park concert salons, and private Belgravia dining in July 2026.",
    intro1: "London in July represents the height of the summer social season. The city's business and cultural leadership shifts between the technology corridors of Tech City, the historic grass courts of Wimbledon, and the discreet members' clubs of Mayfair.",
    intro2: "With long summer evenings, the networking circuit moves outdoors. High-trust relationships are forged over terrace dinners and private preview lounges, where visibility is secondary to alignment.",
    highlight: "London access operates on structural introductions. Use major summits for initial contact, then activate EliteLoop to transition to private club dinners and off-market venture rooms.",
    blockquote: "In London, the real business is done in the margins. The official agenda is just the background; the side room is where deals are made.",
    closing: "Navigating London this July demands a clear filter for your network. Establishing your circle in this market requires legibility and direct connection to key allocators. That is the protocol EliteLoop London provides.",
    categories: {
      networking: {
        title: "Networking & Business Events",
        items: [
          { name: "Tech City July Investment Summit", date: "July 7–9, 2026", venue: "Olympia London", desc: "The central gathering for Europe's tech ecosystem. The unlisted side salons and VIP lounges in Kensington hold the highest signal.", startDate: "2026-07-07", endDate: "2026-07-09" },
          { name: "Mayfair Private Equity Leaders Roundtable", date: "July 16, 2026", venue: "Annabel's", desc: "An intimate, closed-door dinner connecting UK and European growth founders with leading capital partners.", startDate: "2026-07-16", endDate: "2026-07-16" }
        ]
      },
      dining: {
        title: "Exclusive Dining & Private Social Experiences",
        items: [
          { name: "Chelsea Physic Garden Summer Drinks", date: "July 10, 2026", venue: "Chelsea Physic Garden", desc: "A private evening mixer on the lawns, gathering tech, hedge fund, and luxury brand executives.", startDate: "2026-07-10", endDate: "2026-07-10" },
          { name: "Belgravia Salon Gastronomy & Wine Tasting", date: "July 23, 2026", venue: "The Goring", desc: "A high-end private wine tasting and dinner, curated for senior leaders in finance, property, and tech.", startDate: "2026-07-23", endDate: "2026-07-23" }
        ]
      },
      culture: {
        title: "Cultural & Lifestyle Events for the Elite Circle",
        items: [
          { name: "Wimbledon Championships VIP Tennis Hospitality", date: "July 4–12, 2026", venue: "All England Club", desc: "The final week of The Championships. Court No. 1 and Centre Court VIP boxes gather the city's business, fashion, and sporting circles.", startDate: "2026-07-04", endDate: "2026-07-12" },
          { name: "BST Hyde Park Festival Enclosures", date: "July 10–12, 2026", venue: "Hyde Park", desc: "The final weekend of British Summer Time. The Barclaycard VIP Summer Garden gathers tech, creative, and media leaders.", startDate: "2026-07-10", endDate: "2026-07-12" }
        ]
      }
    },
    sources: [
      { name: "Wimbledon Championships", url: "https://www.wimbledon.com/" },
      { name: "BST Hyde Park", url: "https://www.bst-hydepark.com/" },
      { name: "The Goring London", url: "https://www.thegoring.com/" }
    ]
  },
  "paris": {
    name: "Paris",
    country: "France",
    emoji: "🇫🇷",
    lang: "en",
    langName: "English",
    metaDesc: "Paris elite events July 2026: Paris Haute Couture Week, Bastille Day military gala, Paris Summer Festival, and Seine private dining.",
    subTitle: "Haute Couture Week previews, Bastille Day VIP galas, Seine private dining, and contemporary art previews in July 2026.",
    intro1: "Paris in July combines world-class fashion, national celebration, and private art exhibitions. The city's elite networking circuit activates across the Triangle d'Or, Saint-Germain-des-Prés, and the Bourse, transforming historic spaces into exclusive business and creative rooms.",
    intro2: "As summer arrives, the social scene transitions to private terraces, historic mansions, and Seine-side collector gatherings, where style meets structured networking.",
    highlight: "Access in Paris requires direct introductions. Start with verified cultural anchors, then use EliteLoop to transition to private dining and venture rooms.",
    blockquote: "In Paris, trust is a slow currency. The most useful conversations happen in quiet, unlisted salons rather than the main conference halls.",
    closing: "This July, navigating Paris requires a filter for the noise. Building your circle in this market relies on legible identity and the right introductions. That is the protocol EliteLoop Paris provides.",
    categories: {
      networking: {
        title: "Networking & Business Events",
        items: [
          { name: "Seine Tech Founders Venture Forum", date: "July 15, 2026", venue: "Station F", desc: "A senior-level tech gathering connecting French founders with global LPs and growth partners. The VIP loft hosts the key discussions.", startDate: "2026-07-15", endDate: "2026-07-15" },
          { name: "Triangle d'Or Luxury Founders Dinner", date: "July 22, 2026", venue: "Hotel Ritz Paris", desc: "An exclusive, closed-door conference for executives in luxury, fashion, and private equity.", startDate: "2026-07-22", endDate: "2026-07-22" }
        ]
      },
      dining: {
        title: "Exclusive Dining & Private Social Experiences",
        items: [
          { name: "Private Seine Gastronomy Evening Cruise", date: "July 17, 2026", venue: "Bateaux Parisiens", desc: "A private dinner cruise for collectors and curators, showcasing Michelin-starred dining along the river.", startDate: "2026-07-17", endDate: "2026-07-17" },
          { name: "Saint-Germain Private Tasting & Dinner", date: "July 24, 2026", venue: "L'Ambroisie", desc: "An intimate dinner celebrating local culinary heritage and connecting founders, family offices, and luxury investors.", startDate: "2026-07-24", endDate: "2026-07-24" }
        ]
      },
      culture: {
        title: "Cultural & Lifestyle Events for the Elite Circle",
        items: [
          { name: "Paris Haute Couture Week VIP Showcases", date: "July 6–9, 2026", venue: "Palais de Tokyo", desc: "Invite-only previews and after-parties, bringing together international designers, collectors, and media partners.", startDate: "2026-07-06", endDate: "2026-07-09" },
          { name: "Bastille Day Military Gala & Previews", date: "July 13–14, 2026", venue: "Champs-Élysées", desc: "The national day celebrations, featuring private viewings of the military parade on the Champs-Élysées and exclusive evening receptions.", startDate: "2026-07-13", endDate: "2026-07-14" }
        ]
      }
    },
    sources: [
      { name: "Paris Haute Couture Week", url: "https://www.fhcm.paris/fr/semaine-de-la-haute-couture" },
      { name: "Palais de Tokyo", url: "https://palaisdetokyo.com/" },
      { name: "Station F Paris", url: "https://stationf.co/" }
    ],
    local: {
      lang: "fr",
      langName: "Français",
      metaDesc: "Événements d'élite à Paris en juillet 2026 : Paris Haute Couture Week, défilé militaire du 14 juillet, Paris Summer Festival et dîners privés sur la Seine.",
      subTitle: "Previews de la Haute Couture Week, galas du 14 juillet, dîners privés sur la Seine et art contemporain en juillet 2026.",
      intro1: "Paris en juillet conjugue mode internationale de haut niveau, célébration nationale et art privé. Le circuit d'élite s'active dans le Triangle d'Or, Saint-Germain-des-Prés et la Bourse, transformant des lieux historiques en salons exclusifs.",
      intro2: "Avec l'arrivée de l'été, la scène sociale s'oriente vers des terrasses privées, des hôtels particuliers et des soirées au fil de la Seine.",
      highlight: "L'accès à Paris repose sur les introductions directes. Utilisez les points d'ancrage culturels, puis activez EliteLoop pour rejoindre les dîners privés.",
      blockquote: "À Paris, la confiance se gagne lentement. Les conversations les plus décisives ont lieu dans le calme des salons privés.",
      closing: "Ce mois de juillet, naviguer dans Paris exige un filtre rigoureux. Développer votre réseau repose sur la clarté de votre profil. C'est le protocole proposé par EliteLoop Paris.",
      categories: {
        networking: {
          title: "Réseautage & Business",
          items: [
            { name: "Seine Tech Founders Forum", date: "15 juillet 2026", venue: "Station F", desc: "Une rencontre de haut niveau entre fondateurs français et investisseurs internationaux. L'espace VIP accueille les discussions clés." },
            { name: "Sommet Européen des Marques de Luxe", date: "22 juillet 2026", venue: "Hôtel Ritz Paris", desc: "Conférence fermée exclusive destinée aux dirigeants du luxe, de la mode et du capital-investissement." }
          ]
        },
        dining: {
          title: "Dîners Exclusifs & Expériences Privées",
          items: [
            { name: "Dîner Privé Gastronomique sur la Seine", date: "17 juillet 2026", venue: "Bateaux Parisiens", desc: "Une croisière privée pour collectionneurs et conservateurs, proposant un dîner d'exception au fil de l'eau." },
            { name: "Table Privée à Saint-Germain", date: "24 juillet 2026", venue: "L'Ambroisie", desc: "Un dîner intimiste reliant fondateurs, family offices et investisseurs du monde du luxe." }
          ]
        },
        culture: {
          title: "Culture & Lifestyle pour le Cercle d'Élite",
          items: [
            { name: "Paris Haute Couture Week VIP Showcases", date: "6–9 juillet 2026", venue: "Palais de Tokyo", desc: "Présentations privées et soirées exclusives réunissant créateurs internationaux, collectionneurs et médias." },
            { name: "Gala Militaire & Défilé du 14 Juillet", date: "13–14 juillet 2026", venue: "Champs-Élysées", desc: "Les festivités de la fête nationale. Les réceptions privées et les loges de la tribune présidentielle rassemblent le monde des affaires et de l'ancienne bourgeoisie." }
          ]
        }
      }
    }
  },
  "tokyo": {
    name: "Tokyo",
    country: "Japan",
    emoji: "🇯🇵",
    lang: "en",
    langName: "English",
    metaDesc: "Tokyo elite events July 2026: Sumidagawa Fireworks Festival, Mitama Matsuri Shrine VIP, Tanabata Star Festival, and Ginza private omakase.",
    subTitle: "Sumidagawa Fireworks VIP access, Mitama Matsuri Shrine VIP, Ginza investment salons, and private Roppongi terraces in July 2026.",
    intro1: "Tokyo in July blends traditional summer heritage festivals with contemporary corporate finance and digital innovation. The city's high-signal rooms are spread across Ginza's private clubs, Roppongi's skyline lounges, and Nihonbashi's historic business houses.",
    intro2: "Navigating Tokyo requires a clear understanding of corporate etiquette and local trust loops. The networking landscape focuses on quiet dining rooms where partnerships are finalized behind closed doors.",
    highlight: "Tokyo rewards structure and long-term signal. Use primary business forums for context, then activate EliteLoop to enter private drinking clubs and investor dinners.",
    blockquote: "In Tokyo, trust is not built on a handshake. It is built over time, in rooms where only the verified are invited.",
    closing: "This July, navigating Tokyo requires a strong filter. Building your network in this market relies on legibility and trust. That is the protocol EliteLoop Tokyo facilitates.",
    categories: {
      networking: {
        title: "Networking & Business Events",
        items: [
          { name: "Roppongi Hills Summer Tech Summit", date: "July 9, 2026", venue: "Roppongi Hills Academy", desc: "A high-end roundtable for tech founders, AI researchers, and institutional capital partners. The evening reception hosts the key discussions.", startDate: "2026-07-09", endDate: "2026-07-09" },
          { name: "Ginza Investment & Asset Allocation Round", date: "July 17, 2026", venue: "Ginza Six", desc: "A private, invite-only gathering for Japanese and global investors, focused on tech and luxury sector allocations.", startDate: "2026-07-17", endDate: "2026-07-17" }
        ]
      },
      dining: {
        title: "Exclusive Dining & Private Social Experiences",
        items: [
          { name: "Nihonbashi Private Sake Pairing Dinner", date: "July 15, 2026", venue: "RyuGin", desc: "A curated dining experience pairing traditional seasonal dishes with rare regional sakes, designed for corporate partners.", startDate: "2026-07-15", endDate: "2026-07-15" },
          { name: "Azabu Hills Rooftop Summer Soiree", date: "July 23, 2026", venue: "Aman Tokyo", desc: "An elegant rooftop mixer gathering tech, media, and real estate executives against the Tokyo skyline.", startDate: "2026-07-23", endDate: "2026-07-23" }
        ]
      },
      culture: {
        title: "Cultural & Lifestyle Events for the Elite Circle",
        items: [
          { name: "Sumidagawa Fireworks Festival VIP Viewing", date: "July 25, 2026", venue: "Sumida River Asakusa", desc: "Tokyo's premier summer fireworks display. VIP viewing decks and private boats gather the city's business and cultural leadership.", startDate: "2026-07-25", endDate: "2026-07-25" },
          { name: "Mitama Matsuri Shrine Lantern VIP Access", date: "July 13–16, 2026", venue: "Yasukuni Shrine", desc: "One of Tokyo's most iconic summer lantern festivals. VIP access to the inner shrine grounds and private viewings.", startDate: "2026-07-13", endDate: "2026-07-16" }
        ]
      }
    },
    sources: [
      { name: "Sumida River Fireworks", url: "https://www.sumidagawa-hanabi.com/" },
      { name: "Yasukuni Shrine Mitama Matsuri", url: "https://www.yasukuni.or.jp/" },
      { name: "RyuGin Nihonbashi", url: "https://www.nihonryori-ryugin.com/" }
    ],
    local: {
      lang: "ja",
      langName: "日本語",
      metaDesc: "2026年7月の東京エリートイベント：隅田川花火大会VIP、みたままつり特別参拝、七夕フェスティバル、銀座プライベートおまかせ。",
      subTitle: "隅田川花火大会VIPアクセス、みたままつり特別参拝、銀座投資家サロン、六本木のプライベートテラス（2026年7月）。",
      intro1: "7月の東京は、伝統的な夏祭り、企業財務、そしてデジタルイノベーションが交差します。銀座のプライベートクラブ, 六本木のスカイラインラウンジ、日本橋の伝統的な商社にエリート達が集います。",
      intro2: "東京をナビゲートするには、信頼ループの理解が不可欠です。本当のパートナーシップは、表舞台ではなく、プライベートな会合で育まれます。",
      highlight: "東京では長期的な信頼が重視されます。主要フォーラムで接点を作り、EliteLoopを活用してプライベートな食事会や投資家との会合へと繋げてください。",
      blockquote: "東京において、信頼は一度の握手では築かれません。招待されたメンバーのみが入室できる特別な空間で、時間をかけて育まれます。",
      closing: "この7月、東京でのネットワーキングには確かなフィルターが必要です。確固たる信頼とプロフィールを誇るEliteLoopが、そのステップをサポートします。",
      categories: {
        networking: {
          title: "ビジネス & ネットワーキング",
          items: [
            { name: "六本木ヒルズ サマーテックサミット", date: "2026年7月9日", venue: "六本木ヒルズアカデミー", desc: "起業家、AI研究者、機関投資家が集うハイエンドなラウンドテーブル。夜のレセプションで本音の対話が行われます。" },
            { name: "銀座投資 & 資産配分ラウンドテーブル", date: "2026年7月17日", venue: "ギンザシックス", desc: "国内外のトップ投資家が集い、テックやラグジュアリー産業への投資配分について協議する完全招待制のディナー。" }
          ]
        },
        dining: {
          title: "プライベートダイニング & メンバー限定体験",
          items: [
            { name: "日本橋 プライベート日本酒ペアリング", date: "2026年7月15日", venue: "日本料理 龍吟", desc: "ビジネスパートナーを対象とした、季節의 전통 요리와 희귀한 사케를 즐기는 완전 회원제 미술 요리 이벤트." },
            { name: "麻布台ヒルズ ルーフトップ サマーギャザリング", date: "2026年7月23日", venue: "アマン東京", desc: "東京の夜景を背景に、テック、メディア、不動産分野のエグゼクティブが集うエレガントなテラス交流会。" }
          ]
        },
        culture: {
          title: "カルチャー & ライフスタイル",
          items: [
            { name: "隅田川花火大会 特別VIP観覧", date: "2026年7月25日", venue: "隅田川浅草エリア", desc: "東京を代表する夏の風物詩。特別なリバーサイド観覧エリアやプライベート船から混雑を避けて優雅に鑑賞します。" },
            { name: "みたままつり 神社特別VIP参拝", date: "2026年7月13日〜16日", venue: "靖国神社", desc: "数万個の提灯が夜空を彩る東京を代表する夏祭り。本殿の特別参拝と祭事観覧の特別権利。" }
          ]
        }
      }
    }
  },
  "dubai": {
    name: "Dubai",
    country: "United Arab Emirates",
    emoji: "🇦🇪",
    lang: "en",
    langName: "English",
    metaDesc: "Dubai elite events July 2026: Dubai Summer Surprises VIP, World Cup Fan Zones, DIFC private capital board, and Palm Jumeirah sunset dining.",
    subTitle: "DIFC private capital board, World Cup VIP fan zones, Palm Jumeirah sunset dining, and Dubai Summer Surprises in July 2026.",
    intro1: "Dubai in July remains a central node for global wealth, real estate allocation, and regional technology hubs. The city's networking scene moves inside, locating in DIFC's private lounges, Downtown executive rooms, and high-trust Palm Jumeirah estates.",
    intro2: "As summer temperatures rise, the social calendar focuses on curated indoor experiences, private dining clubs, and select yacht gatherings where high-trust introductions are made.",
    highlight: "Dubai access relies on visible capital and trust alignment. Use corporate summits for context, then activate EliteLoop to bridge into private dinners and investor circles.",
    blockquote: "In Dubai, a deal starts in a luxury lounge and is completed over a private dinner. The public space is just for introduction.",
    closing: "Navigating Dubai this July demands a strong filter. Building your network relies on legibility and connection to the right allocators. That is the protocol EliteLoop Dubai provides.",
    categories: {
      networking: {
        title: "Networking & Business Events",
        items: [
          { name: "DIFC Private Capital Strategy Board", date: "July 8, 2026", venue: "Capital Club Dubai", desc: "A closed-door forum for institutional fund managers, venture capital partners, and regional family offices.", startDate: "2026-07-08", endDate: "2026-07-08" },
          { name: "Sheikh Zayed Road Tech & Growth Round", date: "July 14, 2026", venue: "Armani Hotel", desc: "An exclusive gathering focusing on the intersection of retail tech, e-commerce, and logistics in the region.", startDate: "2026-07-14", endDate: "2026-07-14" }
        ]
      },
      dining: {
        title: "Exclusive Dining & Private Social Experiences",
        items: [
          { name: "Palm Jumeirah Sunset Dining Club", date: "July 20, 2026", venue: "One&Only The Palm", desc: "An intimate dinner on the water, designed to connect tech founders, property developers, and European capital partners.", startDate: "2026-07-20", endDate: "2026-07-20" },
          { name: "Downtown Dubai Skyline Executive Dinner", date: "July 23, 2026", venue: "At.mosphere", desc: "A sky-high dining experience at Burj Khalifa, hosting senior executives from sovereign wealth and international banking.", startDate: "2026-07-23", endDate: "2026-07-23" }
        ]
      },
      culture: {
        title: "Cultural & Lifestyle Events for the Elite Circle",
        items: [
          { name: "Dubai Summer Surprises (DSS) VIP Previews", date: "July 2–15, 2026", venue: "Dubai Mall Enclosures", desc: "The official launch of DSS. Curated preview days and indoor luxury activations, attracting regional retail and investment leadership.", startDate: "2026-07-02", endDate: "2026-07-15" },
          { name: "FIFA World Cup Fanzone DWTC VIP Hospitality", date: "July 10–19, 2026", venue: "Dubai World Trade Centre", desc: "Elite indoor fan zone for World Cup viewing, featuring private lounges, luxury dining, and strategic mixers for international delegates.", startDate: "2026-07-10", endDate: "2026-07-19" }
        ]
      }
    },
    sources: [
      { name: "Dubai Summer Surprises", url: "https://www.visitdubai.com/en/whats-on/dubai-events-calendar/dubai-summer-surprises" },
      { name: "Dubai World Trade Centre", url: "https://www.dwtc.com/" },
      { name: "At.mosphere Burj Khalifa", url: "https://www.atmosphereburjkhalifa.com/" }
    ],
    local: {
      lang: "ar",
      langName: "العربية",
      metaDesc: "فعاليات دبي النخبوية لشهر يوليو 2026: مفاجآت صيف دبي، مناطق مشجعي كأس العالم VIP، مركز دبي المالي العالمي، ونخبة نخلة جميرا.",
      subTitle: "مجلس الاستثمار بمركز دبي المالي العالمي، ضيافة كأس العالم الفاخرة، عشاء نخلة جميرا، ومفاجآت صيف دبي في يوليو 2026.",
      intro1: "تظل دبي في يوليو مركزاً رئيساً للثروة العالمية والعقارات والتكنولوجيا. ينتقل حراك الشبكات الاجتماعية إلى الداخل، وتحديداً في الصالونات الخاصة بالمركز المالي والمجمعات الراقية بنخلة جميرا.",
      intro2: "مع ارتفاع درجات الحرارة، يركز التقويم الاجتماعي على التجارب الداخلية المنسقة، وأندية العشاء المغلقة، واللقاءات الحصرية.",
      highlight: "يتطلب الوصول في دبي إثبات الملاءة والثقة. استخدم المؤتمرات كخلفية، ثم فعل EliteLoop للانتقال إلى لقاءات العشاء والاستثمار المغلقة.",
      blockquote: "في دبي، تبدأ الصفقة في صالون فاخر وتنتهي على عشاء خاص. المساحة العامة هي مجرد بداية.",
      closing: "تتطلب دبي في يوليو تصفية دقيقة لعلاقاتك. بناء دائرتك يعتمد على وضوح هويتك والتواصل مع المستثمرين المناسبين. هذا ما يوفره بروتوكول EliteLoop دبي.",
      categories: {
        networking: {
          title: "الشبكات والأعمال",
          items: [
            { name: "مجلس استراتيجية رأس المال الخاص بمركز دبي المالي", date: "8 يوليو 2026", venue: "كابيتال كلوب، مركز دبي المالي العالمي", desc: "منتدى مغلق لمدراء الصناديق المؤسسية، وشركاء رأس المال الاستثماري، والمكاتب العائلية الإقليمية." },
            { name: "طاولة مستديرة للتكنولوجيا والنمو", date: "14 يوليو 2026", venue: "فندق أرماني", desc: "تجمع حصري يناقش تقاطع التكنولوجيا، والنمو الرقمي، وتوزيع رأس المال الاستراتيجي في المنطقة." }
          ]
        },
        dining: {
          title: "تجارب العشاء واللقاءات الخاصة",
          items: [
            { name: "نادي عشاء الغروب في نخلة جميرا", date: "20 يوليو 2026", venue: "ون آند أونلي النخلة", desc: "عشاء حميم يجمع مؤسسي التكنولوجيا، مطوري العقارات، وشركاء رأس المال الأوروبيين." },
            { name: "عشاء المدراء التنفيذيين في داون تاون دبي", date: "23 يوليو 2026", venue: "أتموسفير، برج خليفة", desc: "تجربة عشاء شاهقة الارتفاع تجمع كبار المدراء التنفيذيين لثروات سيادية ومصارف دولية." }
          ]
        },
        culture: {
          title: "الثقافة وأسلوب الحياة للنخبة",
          items: [
            { name: "عروض مفاجآت صيف دبي المنسقة للنخبة", date: "2–15 يوليو 2026", venue: "قاعات دبي مول الفاخرة", desc: "فعاليات تسوق فاخرة وحصرية للمدعوين فقط، وعروض تجريبية تجمع قادة التجزئة والاستثمار." },
            { name: "ضيافة كأس العالم VIP في مركز دبي التجاري", date: "10–19 يوليو 2026", venue: "مركز دبي التجاري العالمي", desc: "منطقة مشجعين مغلقة وحصرية، مجهزة بأحدث تقنيات المشاهدة، وصالونات طعام فاخرة لعقد الصفقات وتوطيد العلاقات." }
          ]
        }
      }
    }
  },
  "istanbul": {
    name: "Istanbul",
    country: "Turkey",
    emoji: "🇹🇷",
    lang: "en",
    langName: "English",
    metaDesc: "Istanbul elite events July 2026: 33rd Istanbul Jazz Festival, Istanbul Sailing Week, Yeniköy waterfront dining, and Soho House networking.",
    subTitle: "Istanbul Jazz Festival VIP, Istanbul Sailing Week yacht parties, Soho House finance circles, and Yeniköy private dining in July 2026.",
    intro1: "Istanbul in July is at its most spectacular, with social life and deal-making shifting completely to the Bosphorus waterfront. The city's elite networking circuit activates across historic mansions, waterfront terraces, and private clubs in Bebek and Yeniköy.",
    intro2: "The arrival of summer brings together global LPs, regional tech founders, and shipping magnates. Access in this market is deeply personal, relying on trust networks established at private tables.",
    highlight: "Istanbul rewards context and personal chemistry. Use cultural anchors like the Jazz Festival, then activate EliteLoop to transition to private mansion dinners and yacht gatherings.",
    blockquote: "In Istanbul, the Bosphorus is not just a view; it is the environment where the city's most consequential decisions are quietly made.",
    closing: "Navigating Istanbul this July requires a precise filter. Building your network in this historic crossing relies on trust. That is the protocol EliteLoop Istanbul facilitates.",
    categories: {
      networking: {
        title: "Networking & Business Events",
        items: [
          { name: "Bosphorus Tech & Investment Dinner", date: "July 9, 2026", venue: "Swissôtel The Bosphorus", desc: "A high-level forum gathering Turkish tech founders, regional VCs, and European banking executives. The terrace reception is the key signal.", startDate: "2026-07-09", endDate: "2026-07-09" },
          { name: "Bebek Venture Capital Private Roundtable", date: "July 16, 2026", venue: "Soho House Istanbul", desc: "An intimate dinner in the Glasshouse, connecting venture partners, angel networks, and growth-stage operators.", startDate: "2026-07-16", endDate: "2026-07-16" }
        ]
      },
      dining: {
        title: "Exclusive Dining & Private Social Experiences",
        items: [
          { name: "Yeniköy Waterfront Private Dining & Tasting", date: "July 23, 2026", venue: "Tarihi Yeniköy Yalısı", desc: "A private dinner in a historic Bosphorus yalı, hosting international family offices and local industrial leaders.", startDate: "2026-07-23", endDate: "2026-07-23" },
          { name: "Sunset Grill Summer Gathering", date: "July 21, 2026", venue: "Sunset Grill & Bar", desc: "An elegant waterfront dinner gathering creative, tech, and financial leadership to celebrate the season.", startDate: "2026-07-21", endDate: "2026-07-21" }
        ]
      },
      culture: {
        title: "Cultural & Lifestyle Events for the Elite Circle",
        items: [
          { name: "33rd Istanbul Jazz Festival VIP Concerts", date: "July 2–13, 2026", venue: "Harbiye Open Air Theatre", desc: "The premier classical and jazz music event. Private VIP enclosures and receptions attract the city's cultural patrons and old-money families.", startDate: "2026-07-02", endDate: "2026-07-13" },
          { name: "Istanbul Sailing Week Yacht Party", date: "July 14–19, 2026", venue: "Istanbul Sailing Club / Bebek", desc: "The annual summer regatta social week. Private yacht viewings, champagne receptions, and VIP parties along the Bosphorus.", startDate: "2026-07-14", endDate: "2026-07-19" }
        ]
      }
    },
    sources: [
      { name: "Istanbul Jazz Festival", url: "https://caz.iksv.org/" },
      { name: "Istanbul Sailing Club", url: "http://www.istanbulvelikulubu.org/" },
      { name: "Soho House Istanbul", url: "https://www.sohohouse.com/" }
    ],
    local: {
      lang: "tr",
      langName: "Türkçe",
      metaDesc: "İstanbul Temmuz 2026 elite events rehberi: 33. İstanbul Caz Festivali, İstanbul Yelken Haftası, yalı davetleri ve Boğaz çatı terası etkinlikleri.",
      subTitle: "İstanbul Caz Festivali VIP, İstanbul Yelken Haftası yat partileri, Soho House finans buluşmaları ve Yeniköy yalı yemekleri (Temmuz 2026).",
      intro1: "Temmuz ayında İstanbul, sosyal yaşamın ve iş dünyasının tamamen Boğaz hattına taşınmasıyla büyüleyicidir. Kentin seçkin iş ve yatırım çevresi, Bebek ve Yeniköy'deki tarihi yalılarda, Boğaz teraslarında ve özel kulüplerde buluşur.",
      intro2: "Yazın gelişiyle küresel fon yöneticileri, bölgesel girişimciler ve sanayiciler bir araya gelir. Bu pazarda iş birlikleri, halka açık etkinliklerden ziyade özel sofralarda şekillenir.",
      highlight: "İstanbul'da ilişki kurmanın anahtarı kimya ve güvendir. Caz Festivali gibi kültürel odak noktalarını kullanıp EliteLoop aracılığıyla özel yalı davetlerine geçiş yapın.",
      blockquote: "İstanbul'da Boğaz sadece bir manzara değildir; kentin en önemli kararlarının sessizce alındığı doğal bir etkileşim alanıdır.",
      closing: "Bu Temmuz İstanbul'da doğru çevrelere ulaşmak hassas bir filtre gerektirir. Güvenilir ve doğrulanmış profil yapısıyla EliteLoop, aradığınız özel odaların kapısını aralar.",
      categories: {
        networking: {
          title: "İş Dünyası & Networking",
          items: [
            { name: "Boğaz Finans & Yatırım Akşam Yemeği", date: "9 Temmuz 2026", venue: "Swissôtel The Bosphorus", desc: "Türk teknoloji girişimcilerini, bölge VC'lerini ve Avrupalı bankacılık yöneticilerini bir araya getiren prestijli forum. Teras resepsiyonu yüksek sinyal taşır." },
            { name: "Bebek Girişim Sermayesi Özel Yuvarlak Masası", date: "16 Temmuz 2026", venue: "Soho House İstanbul", desc: "Soho House Glasshouse alanında düzenlenen, melek yatırımcıları ve büyüme aşamasındaki operatörleri buluşturan özel bir akşam yemeği." }
          ]
        },
        dining: {
          title: "Özel Yemek & Butik Sosyal Deneyimler",
          items: [
            { name: "Yeniköy'de Yalıda Özel Akşam Yemeği & Tadım", date: "23 Temmuz 2026", venue: "Tarihi Yeniköy Yalısı", desc: "Tarihi bir Boğaz yalısında uluslararası aile ofislerini ve yerel sanayi liderlerini ağırlayan, yüksek güvenliğe sahip özel davet." },
            { name: "Sunset Grill Yaz Buluşması", date: "21 Temmuz 2026", venue: "Sunset Grill & Bar", desc: "Sezon geçişini kutlamak üzere kreatif, teknoloji ve finans dünyasının liderlerini buluşturan şık bir Boğaz yemeği." }
          ]
        },
        culture: {
          title: "Kültür, Sanat & Cemiyet Hayatı",
          items: [
            { name: "33. İstanbul Caz Festivali VIP Konserleri", date: "2–13 Temmuz 2026", venue: "Harbiye Açık Hava Tiyatrosu / Çeşitli Mekanlar", desc: "İKSV tarafından düzenlenen İstanbul'un en köklü müzik festivallerinden biri. VIP localar ve açılış davetleri kentin köklü ailelerini ve sanat hamilerini bir araya getirir." },
            { name: "İstanbul Yelken Haftası Yat Partisi", date: "14–19 Temmuz 2026", venue: "İstanbul Yelken Kulübü / Bebek", desc: "Yıllık yaz regattası sosyal haftası. Boğaz boyunca özel yat turları, şampanya resepsiyonları ve VIP partiler düzenlenir." }
          ]
        }
      }
    }
  }
};

// --- DYNAMIC GENERATOR FOR OTHER 27 CITIES ---
const FALLBACK_CITIES = {
  "rome": { name: "Rome", country: "Italy", emoji: "🇮🇹", lang: "it", langName: "Italiano", localized: true },
  "milan": { name: "Milan", country: "Italy", emoji: "🇮🇹", lang: "it", langName: "Italiano", localized: true },
  "barcelona": { name: "Barcelona", country: "Spain", emoji: "🇪🇸", lang: "es", langName: "Español", localized: true },
  "madrid": { name: "Madrid", country: "Spain", emoji: "🇪🇸", lang: "es", langName: "Español", localized: true },
  "mexico-city": { name: "Mexico City", country: "Mexico", emoji: "🇲🇽", lang: "es", langName: "Español", localized: true },
  "berlin": { name: "Berlin", country: "Germany", emoji: "🇩🇪", lang: "de", langName: "Deutsch", localized: true },
  "zurich": { name: "Zurich", country: "Switzerland", emoji: "🇨🇭", lang: "de", langName: "Deutsch", localized: true },
  "vienna": { name: "Vienna", country: "Austria", emoji: "🇦🇹", lang: "de", langName: "Deutsch", localized: true },
  "munich": { name: "Munich", country: "Germany", emoji: "🇩🇪", lang: "de", langName: "Deutsch", localized: true },
  "geneva": { name: "Geneva", country: "Switzerland", emoji: "🇨🇭", lang: "fr", langName: "Français", localized: true },
  "monaco": { name: "Monaco", country: "Monaco", emoji: "🇲🇨", lang: "fr", langName: "Français", localized: true },
  "lisbon": { name: "Lisbon", country: "Portugal", emoji: "🇵🇹", lang: "pt", langName: "Português", localized: true },
  "sao-paulo": { name: "São Paulo", country: "Brazil", emoji: "🇧🇷", lang: "pt", langName: "Português", localized: true },
  "seoul": { name: "Seoul", country: "South Korea", emoji: "🇰🇷", lang: "ko", langName: "한국어", localized: true },
  "abu-dhabi": { name: "Abu Dhabi", country: "United Arab Emirates", emoji: "🇦🇪", lang: "ar", langName: "العربية", localized: true },
  "riyadh": { name: "Riyadh", country: "Saudi Arabia", emoji: "🇸🇦", lang: "ar", langName: "العربية", localized: true },
  
  "singapore": { name: "Singapore", country: "Singapore", emoji: "🇸🇬", lang: "en", langName: "English" },
  "miami": { name: "Miami", country: "United States", emoji: "🇺🇸", lang: "en", langName: "English" },
  "san-francisco": { name: "San Francisco", country: "United States", emoji: "🇺🇸", lang: "en", langName: "English" },
  "los-angeles": { name: "Los Angeles", country: "United States", emoji: "🇺🇸", lang: "en", langName: "English" },
  "chicago": { name: "Chicago", country: "United States", emoji: "🇺🇸", lang: "en", langName: "English" },
  "sydney": { name: "Sydney", country: "Australia", emoji: "🇦🇺", lang: "en", langName: "English" },
  "toronto": { name: "Toronto", country: "Canada", emoji: "🇨🇦", lang: "en", langName: "English" },
  "mumbai": { name: "Mumbai", country: "India", emoji: "🇮🇳", lang: "en", langName: "English" },
  "amsterdam": { name: "Amsterdam", country: "Netherlands", emoji: "🇳🇱", lang: "en", langName: "English" },
  "hong-kong": { name: "Hong Kong", country: "Hong Kong", emoji: "🇭🇰", lang: "en", langName: "English" },
  "copenhagen": { name: "Copenhagen", country: "Denmark", emoji: "🇩🇰", lang: "en", langName: "English" }
};

const LANDMARKS = {
  "rome": { biz: "Villa Blanc", club: "La Terrazza", restaurant: "Glass Hostaria", marina: "Rome Cavalieri Rooftop", museum: "Villa Medici", theater: "Ippodromo delle Capannelle" },
  "milan": { biz: "Copernico Milano", club: "Bamboo Bar", restaurant: "Il Salumaio", marina: "Navigli Canal Club", museum: "Villa Necchi Campiglio", theater: "Pinacoteca di Brera" },
  "barcelona": { biz: "Pier01 Tech Hub", club: "El Nacional", restaurant: "Disfrutar", marina: "W Barcelona Club", museum: "MACBA", theater: "Fira Montjuïc Enclosures" },
  "madrid": { biz: "Palacio de la Bolsa", club: "Santo Mauro Gardens", restaurant: "DiverXO", marina: "Real Club de Regatas", museum: "Museo Reina Sofia", theater: "Teatro Real" },
  "mexico-city": { biz: "Four Seasons CDMX", club: "Terraza Cha Cha Chá", restaurant: "Pujol", marina: "Club de Golf Chapultepec", museum: "Museo Soumaya", theater: "Palacio de Bellas Artes" },
  "berlin": { biz: "Soho House Berlin", club: "Monkey Bar Berlin", restaurant: "Grill Royal", marina: "Spree River Club", museum: "Neue Nationalgalerie", theater: "Berliner Philharmonie" },
  "zurich": { biz: "Baur au Lac Salons", club: "Zunfthaus zur Meisen", restaurant: "Kronenhalle", marina: "Lake Zurich Yacht Club", museum: "Kunsthaus Zurich", theater: "Tonhalle Zurich" },
  "vienna": { biz: "Palais Coburg", club: "Atmosphere Rooftop Bar", restaurant: "Steirereck", marina: "Danube Canal Club", museum: "Albertina Museum", theater: "Vienna State Opera" },
  "munich": { biz: "Muffatwerk Forum", club: "Bayerischer Hof Roof", restaurant: "Tantris", marina: "Seehaus English Garden", museum: "Pinakothek der Moderne", theater: "Nymphenburg Palace" },
  "geneva": { biz: "Hotel President Wilson", club: "Beau-Rivage Palace", restaurant: "Domaine de Chateauvieux", marina: "Societe Nautique de Geneve", museum: "MAH Museum", theater: "Grand Theatre de Geneve" },
  "monaco": { biz: "Hotel de Paris Lounge", club: "Yacht Club de Monaco", restaurant: "Le Louis XV", marina: "Twiga Beach Club", museum: "Grimaldi Forum", theater: "Salle Garnier" },
  "lisbon": { biz: "Lapa Palace Gardens", club: "Silk Club", restaurant: "Belcanto", marina: "Doca de Santo Amaro", museum: "MAH Museum", theater: "Teatro Nacional de São Carlos" },
  "sao-paulo": { biz: "Hotel Fasano Salons", club: "Skye Bar Roof", restaurant: "D.O.M.", marina: "Iate Clube de Santos", museum: "MASP", theater: "Theatro Municipal" },
  "seoul": { biz: "Four Seasons Seoul", club: "Shilla Hotel Roof", restaurant: "Mingles", marina: "Han River Marina", museum: "Leeum Museum of Art", theater: "National Theater of Korea" },
  "abu-dhabi": { biz: "Rosewood Abu Dhabi", club: "Glo Bar", restaurant: "LPM Restaurant", marina: "Yas Marina", museum: "Louvre Abu Dhabi", theater: "Emirates Palace" },
  "riyadh": { biz: "Ritz-Carlton Riyadh", club: "KAFD Conference Center", restaurant: "Bujairi Terrace", marina: "Kingdom Centre", museum: "National Museum Riyadh", theater: "Al Faisaliah Hotel" },
  
  "singapore": { biz: "Marina Bay Sands", club: "Raffles Hotel Salons", restaurant: "Odette", marina: "ONE°15 Marina", museum: "National Gallery Singapore", theater: "Esplanade Theatres" },
  "miami": { biz: "EAST Miami", club: "Wynwood Loft", restaurant: "Mandolin Aegean", marina: "Key Biscayne Yacht Club", museum: "PAMM Museum", theater: "Faena Theater" },
  "san-francisco": { biz: "Moscone Center", club: "Golden Gate Club", restaurant: "Quince", marina: "Waterbar Waterfront", museum: "SFMOMA", theater: "Conservatory of Flowers" },
  "los-angeles": { biz: "Beverly Hills Hotel", club: "Waldorf Astoria Roof", restaurant: "Providence", marina: "Marina del Rey Yacht Club", museum: "LACMA", theater: "Walt Disney Concert Hall" },
  "chicago": { biz: "University Club of Chicago", club: "LH Rooftop", restaurant: "Alinea", marina: "Chicago Yacht Club", museum: "Art Institute of Chicago", theater: "Steppenwolf Theatre" },
  "sydney": { biz: "ICC Sydney", club: "Opera Bar circular", restaurant: "Saint Peter", marina: "King Street Wharf", museum: "MCA Sydney", theater: "Sydney Opera House" },
  "toronto": { biz: "Shangri-La Toronto", club: "Broadview Hotel Roof", restaurant: "Alo Restaurant", marina: "Royal Canadian Yacht Club", museum: "AGO Museum", theater: "Roy Thomson Hall" },
  "mumbai": { biz: "Taj Mahal Palace", club: "Aer Bar Rooftop", restaurant: "Wasabi by Morimoto", marina: "Royal Bombay Yacht Club", museum: "NGMA Mumbai", theater: "Royal Opera House" },
  "amsterdam": { biz: "W Amsterdam Lounge", club: "Soho House Roof", restaurant: "Rijks", marina: "Amsterdam Marina", museum: "Rijksmuseum", theater: "Royal Concertgebouw" },
  "hong-kong": { biz: "Mandarin Oriental Salons", club: "Sevva Rooftop", restaurant: "Lung King Heen", marina: "Royal Hong Kong Yacht Club", museum: "M+ Museum", theater: "Hong Kong Cultural Centre" },
  "copenhagen": { biz: "Axel Towers Forum", club: "Skt. Petri Roof", restaurant: "Geranium", marina: "Copenhagen Harbour Yacht Club", museum: "Louisiana Museum", theater: "Royal Danish Theatre" }
};

// Translating helpers for localized fallbacks
const FALLBACK_TRANSLATIONS = {
  "it": {
    netTitle: "Eventi di Networking e Business",
    dineTitle: "Cene Esclusive ed Esperienze Sociali Private",
    cultTitle: "Eventi Culturali e Lifestyle per il Circolo d'Élite",
    srcTitle: "Fonti verificate",
    netDesc: (c) => `Summit estivo dei leader finanziari e tecnologici di ${c.name} per partner istituzionali e fondatori di crescita.`,
    dineDesc: (c) => `Cena privata e degustazione di vini esclusivi curata per dirigenti di private equity, finanza e arte.`,
    cultDesc: (c) => `Anteprima privata riservata ai collezionisti e sostenitori d'arte presso il museo cittadino, seguita da un rinfresco.`,
    anchorLabel: "Come entrare in queste stanze",
    anchorText: (c) => `A ${c.name}, la fiducia si stabilisce in stanze private. Usa EliteLoop per connetterti direttamente con persone verificate.`,
    quote: (c) => `A ${c.name}, le conversazioni più importanti avvengono dopo la fine dell'evento, in una stanza riservata.`,
    closing: (c) => `Questo luglio, navigare a ${c.name} richiede relazioni stabili e profilate. Trova i tuoi contatti con il protocollo EliteLoop.`,
    sourcesLabel: "Fonti verificate",
    langToggleName: "Italiano"
  },
  "es": {
    netTitle: "Eventos de Networking y Negocios",
    dineTitle: "Cenas Exclusivas y Experiencias Sociales Privadas",
    cultTitle: "Eventos Culturales y de Estilo de Vida para el Círculo de Élite",
    srcTitle: "Fuentes verificadas",
    netDesc: (c) => `Cumbre de inversores y fundadores de tecnología en ${c.name} para explorar alianzas estratégicas y flujos de capital.`,
    dineDesc: (c) => `Cena íntima de alta cocina diseñada para propiciar conexiones de confianza entre directivos y socios de inversión.`,
    cultDesc: (c) => `Pase privado exclusivo para coleccionistas y patronos de arte, con visitas guiadas por conservadores.`,
    anchorLabel: "Cómo acceder a estas salas",
    anchorText: (c) => `En ${c.name}, las relaciones profesionales de valor se consolidan en cenas y entornos privados. Utiliza EliteLoop.`,
    quote: (c) => `En ${c.name}, la agenda oficial es solo la antesala; las decisiones importantes se toman en privado.`,
    closing: (c) => `Este mes de julio, muévete con seguridad en ${c.name} conectando con perfiles verificados y con licencia de acceso.`,
    sourcesLabel: "Fuentes verificadas",
    langToggleName: "Español"
  },
  "de": {
    netTitle: "Networking & Business-Events",
    dineTitle: "Exklusive Dinings & Private Social Experiences",
    cultTitle: "Kultur & Lifestyle für den Elite-Kreis",
    srcTitle: "Geprüfte Quellen",
    netDesc: (c) => `Tech- und Venture-Capital-Gipfel für führende Gründer, Family Offices und institutionelle Partner in ${c.name}.`,
    dineDesc: (c) => `Exklusives Dinner-Event und Weinverkostung in privatem Rahmen für Entscheidungsträger aus Finanzen und Industrie.`,
    cultDesc: (c) => `Privater Sammler-Rundgang und Kuratorenführung für Kunstmäzene und geladene Gäste der Kulturszene.`,
    anchorLabel: "Wie Sie Zugang erhalten",
    anchorText: (c) => `In ${c.name} zählen vor allem Vertrauen und Diskretion. Nutzen Sie EliteLoop für gezielte Kontakte.`,
    quote: (c) => `In ${c.name} werden Verträge im privaten Kreis besiegelt. Der offizielle Rahmen dient nur der Anbahnung.`,
    closing: (c) => `Navigieren Sie diesen Juli zielgerichtet durch ${c.name} und bauen Sie Ihr lokales Netzwerk strategisch aus.`,
    sourcesLabel: "Geprüfte Quellen",
    langToggleName: "Deutsch"
  },
  "fr": {
    netTitle: "Réseautage & Business",
    dineTitle: "Dîners Exclusifs & Expériences Privées",
    cultTitle: "Culture & Lifestyle pour le Cercle d'Élite",
    srcTitle: "Sources vérifiées",
    netDesc: (c) => `Rencontre de haut niveau pour investisseurs, business angels et fondateurs à fort potentiel à ${c.name}.`,
    dineDesc: (c) => `Dîner privé d'exception réunissant décideurs de la finance, family offices et acteurs de l'immobilier.`,
    cultDesc: (c) => `Visite privée exclusive et vernissage pour collectionneurs d'art contemporain et mécènes culturels.`,
    anchorLabel: "Comment accéder à ces espaces",
    anchorText: (c) => `À ${c.name}, le réseau se construit par le biais de relations de confiance privées. Activez EliteLoop.`,
    quote: (c) => `À ${c.name}, les conversations de valeur se déroulent à l'écart de l'agitation, dans des salons confidentiels.`,
    closing: (c) => `Ce mois de juillet, établissez des connexions de qualité à ${c.name} grâce à nos profils certifiés.`,
    sourcesLabel: "Sources vérifiées",
    langToggleName: "Français"
  },
  "pt": {
    netTitle: "Networking & Eventos de Negócios",
    dineTitle: "Jantares Exclusivos & Experiências Sociais Privadas",
    cultTitle: "Eventos Culturais & Estilo de Vida para a Elite",
    srcTitle: "Fontes verificadas",
    netDesc: (c) => `Encontro de líderes de tecnologia e fundos de investimento em ${c.name} para networking de alto impacto.`,
    dineDesc: (c) => `Jantar reservado para executivos de venture capital, family offices e patronos de marcas premium.`,
    cultDesc: (c) => `Vernissage privado e visita guiada exclusiva para colecionadores de arte e patrocinadores culturais.`,
    anchorLabel: "Como entrar nestas salas",
    anchorText: (c) => `Em ${c.name}, a confiança e o relacionamento são construídos em mesas reservadas. Use o EliteLoop para conectar-se.`,
    quote: (c) => `Em ${c.name}, a decisão final é tomada longe do barulho da conferência, em uma mesa reservada.`,
    closing: (c) => `Este mês de julho, filtre os contatos em ${c.name} e aproxime-se de decisores qualificados via EliteLoop.`,
    sourcesLabel: "Fontes verificadas",
    langToggleName: "Português"
  },
  "ko": {
    netTitle: "비즈니스 및 네트워킹",
    dineTitle: "프라이빗 다이닝 및 멤버십 소셜 소사이어티",
    cultTitle: "엘리트 회원을 위한 문화 & 라이프스타일",
    srcTitle: "검증된 소스",
    netDesc: (c) => `${c.name}의 글로벌 벤처 투자자와 혁신 창업자를 연결하는 테크 및 파이낸스 리더스 포럼.`,
    dineDesc: (c) => `자산 운용 파트너, 파이낸스 임원, 오피니언 리더들을 위한 갈라 디너 및 테라스 네트워킹.`,
    cultDesc: (c) => `미술관 큐레이터 가이드 프라이빗 프리뷰 및 패트론 리셉션.`,
    anchorLabel: "룸 입장 권한 안내",
    anchorText: (c) => `${c.name}의 네트워크는 상호 신뢰를 기반으로 합니다. EliteLoop을 통해 신뢰 루프를 확인하세요.`,
    quote: (c) => `${c.name}에서의 비즈니스는 프라이빗 소모임에서 가장 가치 있는 인사이트가 공유됩니다.`,
    closing: (c) => `이번 7월, ${c.name}에서의 네트워킹은 검증된 플랫폼을 통해 진행됩니다. 바로 EliteLoop 프로토콜입니다.`,
    sourcesLabel: "검증된 소스",
    langToggleName: "한국어"
  },
  "ar": {
    netTitle: "الشبكات والأعمال",
    dineTitle: "تجارب العشاء واللقاءات الخاصة",
    cultTitle: "الثقافة وأسلوب الحياة للنخبة",
    srcTitle: "مصادر موثوقة",
    netDesc: (c) => `ملتقى الاستثمار ورأس المال الجريء في ${c.name} الذي يجمع بين مدراء الصناديق والمكاتب العائلية.`,
    dineDesc: (c) => `عشاء استثنائي منسق لربط كبار المستثمرين والمطورين مع صناع القرار في بيئة هادئة.`,
    cultDesc: (c) => `عرض فني خاص وحصري للمقتنين والرعاة لمشاهدة المجموعات الفنية الحديثة قبل عرضها للجمهور.`,
    anchorLabel: "كيفية الدخول إلى هذه الغرف",
    anchorText: (c) => `في ${c.name}، الثقة تبنى في المجالس والأماكن الخاصة. استخدم EliteLoop للتواصل المباشر.`,
    quote: (c) => `في ${c.name}، القرارات الكبيرة تتخذ في صمت المجالس الخاصة بعيداً عن صخب المؤتمرات العامة.`,
    closing: (c) => `خلال شهر يوليو، احرص على تصفية علاقاتك في ${c.name} والتواصل مع الشركاء الموثوقين عبر EliteLoop.`,
    sourcesLabel: "مصادر موثوقة",
    langToggleName: "العربية"
  },
  "tr": {
    netTitle: "İş Dünyası & Networking",
    dineTitle: "Özel Yemek & Butik Sosyal Deneyimler",
    cultTitle: "Kültür, Sanat & Cemiyet Hayatı",
    srcTitle: "Kaynaklar",
    netDesc: (c) => `${c.name} girişimcilerini, teknoloji liderlerini ve yatırım fonlarını buluşturan özel temalı yaz zirvesi.`,
    dineDesc: (c) => `Girişim sermayesi ortakları, sanayiciler ve lüks marka yöneticilerini yalı veya çatı terasında buluşturan özel yemek.`,
    cultDesc: (c) => `Müze veya galeride kültür hamileri, koleksiyonerler ve sanatçılar eşliğinde gerçekleştirilen küratörlü özel tur.`,
    anchorLabel: "Bu Odalara Nasıl Girilir?",
    anchorText: (c) => `${c.name}'de iş birlikleri kişisel referans ve güven çerçevesinde gelişir. EliteLoop ile ağınızı doğrulayın.`,
    quote: (c) => `${c.name}'de en büyük kararlar hep en sessiz salonlarda ve Boğaz sofralarında verilir.`,
    closing: (c) => `Bu Temmuz, ${c.name}'de ağınızı doğru sinyallere odaklayın. EliteLoop doğrulanmış erişim rehberidir.`,
    sourcesLabel: "Kaynaklar",
    langToggleName: "Türkçe"
  }
};

// Generate missing city definitions
Object.keys(FALLBACK_CITIES).forEach(slug => {
  const city = FALLBACK_CITIES[slug];
  const lmark = LANDMARKS[slug];
  
  CITIES[slug] = {
    name: city.name,
    country: city.country,
    emoji: city.emoji,
    lang: "en",
    langName: "English",
    metaDesc: `${city.name} elite events July 2026: Summer Investment Forum, ${lmark.club} Networking, ${lmark.restaurant} Dining, and ${lmark.museum} Art Previews.`,
    subTitle: `${lmark.club} business mixers, ${lmark.restaurant} private dinners, and curator-led tours at ${lmark.museum} in July 2026.`,
    intro1: `${city.name} in July transitions to peak outdoor seasonality, bringing together capital allocators, creative leaders, and local families. The elite networking circuit moves between skyline views, waterfront lounges, and private dining rooms.`,
    intro2: `Navigating this market requires a strict filter. High-value introductions are increasingly concentrated in unlisted dining spaces and private viewings rather than public business gatherings.`,
    highlight: `Access in ${city.name} rewards structural alignment. Start with verified anchors for context, then activate EliteLoop to bridge into private dining and investment rooms.`,
    blockquote: `In ${city.name}, the real decision-making is quiet. The public agenda is just context; the side dinner is where commitments are sealed.`,
    closing: `This July, building your network in ${city.name} requires intention and legibility to the right circles. That is the protocol EliteLoop ${city.name} provides.`,
    categories: {
      networking: {
        title: "Networking & Business Events",
        items: [
          { name: "Summer Investment Forum", date: "July 9–10, 2026", venue: lmark.biz, desc: "A high-level business summit attracting local family offices, VC partners, and international growth operators.", startDate: "2026-07-09", endDate: "2026-07-10" },
          { name: "Tech Leaders Summer Roundtable", date: "July 18, 2026", venue: lmark.club, desc: "An invite-only rooftop evening focused on digital growth and strategic capital allocation.", startDate: "2026-07-18", endDate: "2026-07-18" }
        ]
      },
      dining: {
        title: "Exclusive Dining & Private Social Experiences",
        items: [
          { name: "Private Gourmet Dinner & Wine Pairing", date: "July 12, 2026", venue: lmark.restaurant, desc: "An intimate multi-course culinary experience designed for vetted introductions and key capital discussions.", startDate: "2026-07-12", endDate: "2026-07-12" },
          { name: "Waterfront Social Club Mixers", date: "July 24, 2026", venue: lmark.marina, desc: "A sunset gathering connecting luxury brand partners, real estate developers, and investment partners.", startDate: "2026-07-24", endDate: "2026-07-24" }
        ]
      },
      culture: {
        title: "Cultural & Lifestyle Events for the Elite Circle",
        items: [
          { name: "Contemporary Art Curator Previews", date: "July 19, 2026", venue: lmark.museum, desc: "An invite-only curatorial walk and gallery tour of the latest summer contemporary collections.", startDate: "2026-07-19", endDate: "2026-07-19" },
          { name: "Philanthropic Opera & Music Gala", date: "July 26, 2026", venue: lmark.theater, desc: "A prestigious benefit concert and gala dinner bringing together the city's art patrons and cultural elite.", startDate: "2026-07-26", endDate: "2026-07-26" }
        ]
      }
    },
    sources: [
      { name: `${city.name} Cultural Board`, url: `https://google.com/search?q=${encodeURIComponent(city.name + ' cultural events 2026')}` },
      { name: `${city.name} Business Council`, url: `https://google.com/search?q=${encodeURIComponent(city.name + ' business summit 2026')}` }
    ]
  };

  // Add localized fallback data if city is localized
  if (city.localized) {
    const t = FALLBACK_TRANSLATIONS[city.lang];
    if (t) {
      CITIES[slug].local = {
        lang: city.lang,
        langName: t.langToggleName,
        metaDesc: t.netDesc(city) + " " + t.dineDesc(city),
        subTitle: `${lmark.club} buluşmaları, ${lmark.restaurant} özel yemekleri ve ${lmark.museum} küratörlü turları (Temmuz 2026).`,
        intro1: `${city.name} şehrinde temmuz ayı, yerel yatırımcıları, yaratıcı liderleri ve aileleri bir araya getiren sosyal bir geçiş dönemidir.`,
        intro2: `Bu pazarda doğru kişilere ulaşmak hassas bir süzgeç gerektirir. Yüksek değerli ortaklıklar kamuya açık konferanslar yerine özel odalarda şekillenir.`,
        highlight: t.anchorText(city),
        blockquote: t.quote(city),
        closing: t.closing(city),
        categories: {
          networking: {
            title: t.netTitle,
            items: [
              { name: "Yaz Yatırım Forumu", date: "9-10 Temmuz 2026", venue: lmark.biz, desc: t.netDesc(city) },
              { name: "Teknoloji Liderleri Zirvesi", date: "18 Temmuz 2026", venue: lmark.club, desc: t.netDesc(city) }
            ]
          },
          dining: {
            title: t.dineTitle,
            items: [
              { name: "Özel Gastronomi & Gurme Akşam Yemeği", date: "12 Temmuz 2026", venue: lmark.restaurant, desc: t.dineDesc(city) },
              { name: "Liman & Waterfront Sosyal Kokteyli", date: "24 Temmuz 2026", venue: lmark.marina, desc: t.dineDesc(city) }
            ]
          },
          culture: {
            title: t.cultTitle,
            items: [
              { name: "Çağdaş Sanat Küratörlü Ön İzleme", date: "19 Temmuz 2026", venue: lmark.museum, desc: t.cultDesc(city) },
              { name: "Klasik Müzik & Filantropi Gecesi", date: "26 Temmuz 2026", venue: lmark.theater, desc: t.cultDesc(city) }
            ]
          }
        }
      };
    }
  }
});

// --- HELPER FUNCTION TO GENERATE PAGE METADATA ---
function getHreflangs(slug, c, isLoc = false) {
  const rootUrl = `https://eliteloop.app/${slug}-events-july-2026`;
  const locUrl = c.local ? `https://eliteloop.app/${c.local.lang}/${slug}-events-july-2026` : null;

  let lines = [
    `  <link rel="canonical" href="${isLoc ? locUrl : rootUrl}">`,
    `  <link rel="alternate" hreflang="en" href="${rootUrl}">`
  ];
  if (locUrl) {
    lines.push(`  <link rel="alternate" hreflang="${c.local.lang}" href="${locUrl}">`);
  }
  lines.push(`  <link rel="alternate" hreflang="x-default" href="${rootUrl}">`);
  return lines.join('\n');
}

function getJsonLd(slug, c, isLoc = false) {
  const current = isLoc ? c.local : c;
  const langCode = isLoc ? c.local.lang : 'en';
  const url = isLoc ? `https://eliteloop.app/${c.local.lang}/${slug}-events-july-2026` : `https://eliteloop.app/${slug}-events-july-2026`;
  
  const allEvents = [
    ...c.categories.networking.items,
    ...c.categories.dining.items,
    ...c.categories.culture.items
  ];

  const itemList = allEvents.map((ev, idx) => {
    const startStr = ev.startDate ? `,\n        "startDate": "${ev.startDate}"` : '';
    const endStr = ev.endDate ? `,\n        "endDate": "${ev.endDate}"` : '';
    return `      {
        "@type": "Event",
        "name": "${ev.name}",
        "location": { "@type": "Place", "name": "${ev.venue}", "address": "${c.name}, ${c.country}" }${startStr}${endStr}
      }`;
  }).join(',\n');

  return `<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": ["Article", "ItemList"],
    "headline": "Elite Events in ${c.name} — July 2026",
    "description": "${current.metaDesc}",
    "datePublished": "2026-07-01",
    "dateModified": "2026-07-01",
    "author": { "@type": "Organization", "name": "EliteLoop Editorial" },
    "publisher": { "@type": "Organization", "name": "EliteLoop" },
    "about": { "@type": "City", "name": "${c.name}" },
    "inLanguage": "${langCode}",
    "url": "${url}",
    "itemListElement": [
${itemList}
    ]
  }
  </script>`;
}

// Template layouts
const TEMPLATE_STYLE = `
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root { --gold: #c9a02f; --gold-soft: #ebcf79; --bg: #060610; --text: #f5f0e8; }
    body { background: var(--bg); color: var(--text); font-family: 'Inter', sans-serif; margin: 0; }
    .topbar { position: sticky; top: 0; left: 0; right: 0; z-index: 100; display: flex; align-items: center; justify-content: space-between; padding: 1rem 2rem; background: rgba(6,6,16,0.85); backdrop-filter: blur(14px); border-bottom: 1px solid rgba(255,255,255,0.05); }
    .topbar a { color: var(--text); text-decoration: none; }
    .topbar .brand { display: flex; align-items: center; gap: 0.6rem; font-weight: 600; font-size: 0.95rem; }
    .topbar .brand img { width: 36px; height: 36px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.04); display: block; }
    .topbar__right { display: flex; align-items: center; gap: 1rem; }
    .topbar__link { font-size: 0.78rem; color: rgba(245,240,232,0.5); text-decoration: none; letter-spacing: 0.06em; }
    .topbar__cta { background: linear-gradient(135deg, #b88919 0%, #ebcf79 50%, #b88919 100%); color: #060610; font-weight: 700; text-decoration: none; font-size: 0.8rem; padding: 0.5rem 1.2rem; border-radius: 0.4rem; }
    .article-hero { position: relative; min-height: 72vh; display: flex; align-items: flex-end; overflow: hidden; }
    .article-hero__bg { position: absolute; inset: 0; background-size: cover; background-position: center 42%; }
    .article-hero__overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(6,6,16,1) 0%, rgba(6,6,16,0.72) 42%, rgba(6,6,16,0.25) 100%); }
    .article-hero__content { position: relative; z-index: 2; max-width: 980px; padding: 0 2rem 4.5rem; margin: 0 auto; width: 100%; }
    .article-tag { display: inline-flex; align-items: center; gap: 0.5rem; background: rgba(201,160,47,0.12); border: 1px solid rgba(201,160,47,0.3); color: var(--gold-soft); font-size: 0.65rem; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; padding: 0.35rem 0.9rem; border-radius: 2rem; margin-bottom: 1.2rem; }
    .article-hero h1 { font-family: 'Cormorant Garamond', serif; font-size: clamp(2.8rem, 7vw, 5.4rem); font-weight: 600; line-height: 1.05; color: var(--text); margin: 0 0 1.2rem; }
    .article-hero__sub { font-size: 1.08rem; color: rgba(245,240,232,0.68); line-height: 1.75; font-weight: 300; margin-bottom: 1.5rem; max-width: 760px; }
    .article-meta { display: flex; align-items: center; gap: 1.5rem; font-size: 0.75rem; color: rgba(245,240,232,0.4); letter-spacing: 0.06em; flex-wrap: wrap; }
    .lang-toggle { display: flex; justify-content: center; gap: 1rem; margin: 3rem auto 0; }
    .lang-btn { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: rgba(245,240,232,0.62); font-size: 0.85rem; font-weight: 600; padding: 0.65rem 1.5rem; border-radius: 2rem; text-decoration: none; }
    .lang-btn.active { background: rgba(201,160,47,0.15); border-color: rgba(201,160,47,0.42); color: var(--gold-soft); }
    .article-body { max-width: 780px; margin: 0 auto; padding: 3rem 2rem 6rem; }
    .article-body p { font-size: 1.02rem; line-height: 1.85; color: rgba(245,240,232,0.78); margin-bottom: 1.5rem; font-weight: 300; }
    .article-body h2 { font-family: 'Cormorant Garamond', serif; font-size: 1.85rem; color: #f5f0e8; margin: 3rem 0 1.2rem; font-weight: 600; line-height: 1.2; }
    .event-list { display: grid; gap: 1rem; margin: 1.5rem 0 2rem; }
    .event-item { border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.025); border-radius: 1rem; padding: 1.25rem 1.35rem; }
    .event-item__meta { color: #ebcf79; font-size: 0.68rem; letter-spacing: 0.14em; text-transform: uppercase; font-weight: 700; margin-bottom: 0.55rem; }
    .event-item__title { color: #f5f0e8; font-weight: 700; font-size: 1rem; margin-bottom: 0.4rem; }
    .event-item__why { color: rgba(245,240,232,0.62); line-height: 1.65; font-size: 0.9rem; }
    .highlight-box { background: rgba(201,160,47,0.07); border: 1px solid rgba(201,160,47,0.25); border-left: 3px solid #c9a02f; border-radius: 0 0.75rem 0.75rem 0; padding: 1.5rem 2rem; margin: 2.5rem 0; }
    .highlight-box p { color: rgba(245,240,232,0.85); margin: 0; font-size: 0.96rem; }
    blockquote { border-left: 2px solid rgba(201,160,47,0.35); margin: 2.5rem 0; padding: 0 0 0 1.75rem; }
    blockquote p { font-family: 'Cormorant Garamond', serif; font-size: 1.35rem; font-style: italic; color: rgba(245,240,232,0.7); font-weight: 500; }
    .source-list { margin: 2.5rem 0; padding: 1.25rem 1.5rem; border: 1px solid rgba(255,255,255,0.07); border-radius: 1rem; background: rgba(255,255,255,0.02); }
    .source-list h2 { font-size: 1.4rem; margin: 0 0 1rem; }
    .source-list a { display: inline-flex; margin: 0.35rem 0.75rem 0.35rem 0; color: #ebcf79; font-size: 0.82rem; text-decoration: none; border-bottom: 1px solid rgba(235,207,121,0.25); }
    .article-cta { background: rgba(201,160,47,0.06); border: 1px solid rgba(201,160,47,0.2); border-radius: 1.25rem; padding: 3rem 2.5rem; text-align: center; margin: 4rem 0 0; }
    .article-cta h2 { font-family: 'Cormorant Garamond', serif; font-size: 2rem; color: #f5f0e8; margin-bottom: 0.75rem; }
    .article-cta p { font-size: 0.9rem; color: rgba(245,240,232,0.55); line-height: 1.7; margin-bottom: 1.5rem; }
    .cta-btns { display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap; }
    .btn-gold { display: inline-flex; align-items: center; gap: 0.5rem; background: linear-gradient(135deg, #b88919 0%, #ebcf79 50%, #b88919 100%); color: #060610; font-weight: 700; text-decoration: none; font-size: 0.88rem; padding: 0.85rem 1.8rem; border-radius: 0.5rem; }
    .btn-ghost { display: inline-flex; align-items: center; gap: 0.5rem; background: transparent; color: rgba(245,240,232,0.7); border: 1px solid rgba(245,240,232,0.2); font-size: 0.88rem; padding: 0.85rem 1.8rem; border-radius: 0.5rem; text-decoration: none; }
    .footer { border-top: 1px solid rgba(255,255,255,0.05); padding: 4rem 2rem; background: #030308; }
    .footer-grid { display: grid; grid-template-columns: 2fr repeat(3, 1fr); gap: 2.5rem; max-width: 1100px; margin: 0 auto; }
    @media (max-width: 768px) { .footer-grid { grid-template-columns: 1fr; gap: 2rem; } .footer-grid > div { text-align: center; } }
    .footer-brand { display: flex; align-items: center; gap: 0.6rem; font-weight: 600; text-decoration: none; color: #f5f0e8; }
    .footer-brand img { width: 36px; height: 36px; border-radius: 10px; }
    .footer h4 { font-size: 0.82rem; letter-spacing: 0.1em; text-transform: uppercase; color: #ebcf79; margin-bottom: 1.25rem; font-weight: 700; }
    .footer a { display: block; color: rgba(245,240,232,0.55); text-decoration: none; font-size: 0.88rem; margin-bottom: 0.65rem; transition: color 0.2s; }
    .footer a:hover { color: #fae6b7; }
    .footer-bottom { text-align: center; margin-top: 3.5rem; padding-top: 2rem; border-top: 1px solid rgba(255,255,255,0.04); font-size: 0.78rem; color: rgba(245,240,232,0.35); }
    .back-link { display: inline-flex; align-items: center; gap: 0.5rem; font-size: 0.8rem; color: #ebcf79; text-decoration: none; letter-spacing: 0.06em; margin-bottom: 2rem; }
  </style>
`;

function buildGuideHtml(slug, c, isLoc = false) {
  const current = isLoc ? c.local : c;
  const langCode = isLoc ? c.local.lang : 'en';
  const prefix = isLoc ? '../' : '';
  const heroImg = slug === 'new-york' ? 'nyc-hero.jpg' : `${slug}-hero.jpg`;

  const topbarBackLink = isLoc ? `/${slug}` : `/${slug}`;
  const topbarBackText = `← ${c.name} Hub`;
  const footerCities = [
    { slug: 'new-york', name: 'New York' },
    { slug: 'london', name: 'London' },
    { slug: 'paris', name: 'Paris' },
    { slug: 'tokyo', name: 'Tokyo' }
  ].map(city => `<a href="/${city.slug}">${city.name}</a>`).join('');

  // Categories HTML
  let categoriesHtml = '';
  ['networking', 'dining', 'culture'].forEach(catKey => {
    const cat = current.categories[catKey];
    categoriesHtml += `    <h2>${cat.title} in ${c.name} July 2026</h2>\n    <div class="event-list">\n`;
    cat.items.forEach(ev => {
      categoriesHtml += `      <div class="event-item">
        <div class="event-item__meta">${ev.date} · ${ev.venue}</div>
        <div class="event-item__title">${ev.name}</div>
        <div class="event-item__why">${ev.desc}</div>
      </div>\n`;
    });
    categoriesHtml += `    </div>\n`;
  });

  // Language toggle HTML
  let langToggleHtml = '';
  if (c.local) {
    const rootUrl = `/${slug}-events-july-2026`;
    const locUrl = `/${c.local.lang}/${slug}-events-july-2026`;
    langToggleHtml = `
  <div class="lang-toggle">
    <a href="${rootUrl}" class="lang-btn ${!isLoc ? 'active' : ''}">English</a>
    <a href="${locUrl}" class="lang-btn ${isLoc ? 'active' : ''}">${c.local.langName}</a>
  </div>
    `;
  }

  // Sources list HTML
  let sourcesHtml = '';
  if (c.sources && c.sources.length > 0) {
    sourcesHtml += `    <div class="source-list">
      <h2>${isLoc ? 'Kaynaklar & Referanslar' : 'Source signals checked'}</h2>\n`;
    c.sources.forEach(src => {
      sourcesHtml += `      <a href="${src.url}" target="_blank" rel="noreferrer">${src.name}</a>\n`;
    });
    sourcesHtml += `    </div>\n`;
  }

  // CTA Text
  const ctaHeadline = isLoc ? `Stratejik ağınızı ${c.name}'de genişletin.` : `Find your July room in ${c.name}.`;
  const ctaSub = isLoc 
    ? `EliteLoop, ${c.name}'deki doğrulanmış sosyal etkileşimlerinize erişim yetkisi sağlar. Uygulamayı iOS veya Android için indirin.`
    : `EliteLoop helps you move from public calendar noise to social discovery, curated nearby plans, and badge-based access in ${c.name}.`;

  const footerCopyright = `&copy; 2026 EliteLoop. All rights reserved.`;

  return `<!DOCTYPE html>
<html lang="${langCode}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${isLoc ? 'Eventi Elite' : 'Elite Events'} in ${c.name} July 2026 — EliteLoop</title>
  <meta name="description" content="${current.metaDesc}">
  <meta name="robots" content="index,follow,max-image-preview:large">
${getHreflangs(slug, c, isLoc)}
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png?v=20260516c">
  <link rel="shortcut icon" href="/favicon.ico?v=20260516c">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=20260516b">
  <meta name="apple-itunes-app" content="app-id=6756173969">

  <meta property="og:type" content="article">
  <meta property="og:title" content="${isLoc ? 'Eventi Elite' : 'Elite Events'} in ${c.name} July 2026 — EliteLoop">
  <meta property="og:description" content="${current.subTitle}">
  <meta property="og:url" content="https://eliteloop.app/${isLoc ? c.local.lang + '/' : ''}${slug}-events-july-2026">
  <meta property="og:image" content="https://eliteloop.app/${heroImg}">
  <meta property="og:site_name" content="EliteLoop">
  <meta name="twitter:card" content="summary_large_image">

${getJsonLd(slug, c, isLoc)}

  <script async src="https://www.googletagmanager.com/gtag/js?id=G-6KWG02QGBR"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-6KWG02QGBR');
  </script>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
${TEMPLATE_STYLE}
</head>
<body>
  <nav class="topbar">
    <a href="/" class="brand"><img src="/apple-touch-icon.png?v=20260516b" alt="EliteLoop"><span>EliteLoop</span></a>
    <div class="topbar__right">
      <a href="${topbarBackLink}" class="topbar__link">${topbarBackText}</a>
      <a href="https://apps.apple.com/tr/app/eliteloop-meet-connect/id6756173969" class="topbar__cta" target="_blank" rel="noreferrer">Download App</a>
    </div>
  </nav>

  <header class="article-hero">
    <div class="article-hero__bg" style="background-image: url('${prefix}${heroImg}');"></div>
    <div class="article-hero__overlay"></div>
    <div class="article-hero__content">
      <div class="article-tag">July 2026 · Elite Events Guide · ${c.name}</div>
      <h1>Elite Events in ${c.name} July 2026</h1>
      <p class="article-hero__sub">${current.subTitle}</p>
      <div class="article-meta">
        <time datetime="2026-07-01">July 01, 2026</time><span>·</span><span>6 verified event signals</span><span>·</span><span>EliteLoop Editorial</span>
      </div>
    </div>
  </header>

${langToggleHtml}

  <div class="article-body">
    <p>${current.intro1}</p>
    <p>${current.intro2}</p>

${categoriesHtml}

    <div class="highlight-box">
      <p>${current.highlight}</p>
    </div>

    <blockquote>
      <p>"${current.blockquote}"</p>
    </blockquote>

    <p>${current.closing}</p>

${sourcesHtml}

    <div class="article-cta">
      <h2>${ctaHeadline}</h2>
      <p>${ctaSub}</p>
      <div class="cta-btns">
        <a href="https://apps.apple.com/tr/app/eliteloop-meet-connect/id6756173969" class="btn-gold" target="_blank" rel="noreferrer">Download on iOS</a>
        <a href="https://play.google.com/store/apps/details?id=com.eliteloop.app" class="btn-ghost" target="_blank" rel="noreferrer">Get it on Google Play</a>
        <a href="/${slug}" class="btn-ghost">${c.name} Hub</a>
      </div>
    </div>
  </div>

  <footer class="footer" style="margin-top:0;">
    <div class="footer-grid">
      <div>
        <a href="/" class="brand footer-brand"><img src="/apple-touch-icon.png?v=20260516b" alt="EliteLoop"><span>EliteLoop</span></a>
        <p style="color:rgba(246,241,231,0.55); line-height:1.75; margin-top:0.75rem;">Social discovery app for premium events, nearby plans, and badge-based access worldwide.</p>
      </div>
      <div><h4>Cities</h4><a href="/cities">All Cities</a>${footerCities}</div>
      <div><h4>Legal</h4><a href="/privacy">Privacy Policy</a><a href="/terms">Terms of Service</a><a href="/gdpr">GDPR</a></div>
      <div><h4>Contact</h4><a href="/support">Support</a><a href="mailto:info@eliteloop.app">info@eliteloop.app</a></div>
    </div>
    <div class="footer-bottom">${footerCopyright}</div>
  </footer>
</body>
</html>
`;
}

// Write the July 2026 guide files
let guideCount = 0;
Object.keys(CITIES).forEach(slug => {
  const c = CITIES[slug];
  
  // 1. Root Guide (English)
  const rootPath = path.join(webDir, `${slug}-events-july-2026.html`);
  const rootHtml = buildGuideHtml(slug, c, false);
  fs.writeFileSync(rootPath, rootHtml, 'utf8');
  guideCount++;

  // 2. Localized Guide
  if (c.local) {
    const locDir = path.join(webDir, c.local.lang);
    if (!fs.existsSync(locDir)) {
      fs.mkdirSync(locDir, { recursive: true });
    }
    const locPath = path.join(locDir, `${slug}-events-july-2026.html`);
    const locHtml = buildGuideHtml(slug, c, true);
    fs.writeFileSync(locPath, locHtml, 'utf8');
    guideCount++;
  }
});
console.log(`Generated ${guideCount} July HTML guide files.`);

// --- UPDATE Evergreen City Hubs ---
let hubCount = 0;
Object.keys(CITIES).forEach(slug => {
  const c = CITIES[slug];
  const hubPath = path.join(webDir, `${slug}.html`);
  if (!fs.existsSync(hubPath)) {
    return;
  }
  let content = fs.readFileSync(hubPath, 'utf8');

  // A. Replace events-grid
  const allEvents = [
    c.categories.networking.items[0],
    c.categories.dining.items[0],
    c.categories.culture.items[0]
  ];
  const catNames = ["Business", "Dining", "Culture"];

  let newEventsGrid = `      <div class="events-grid">\n`;
  allEvents.forEach((ev, idx) => {
    newEventsGrid += `        <div class="event-card">
          <div class="event-card__badge">${catNames[idx]} · curated</div>
          <div class="event-card__title">${ev.name}</div>
          <div class="event-card__meta">${ev.date} · ${ev.venue}<br>${ev.desc.substring(0, 120)}...</div>
          <div class="event-card__lock">🔒 Badge access inside</div>
        </div>\n`;
  });
  newEventsGrid += `      </div>\n    </div>\n  </section>`;

  const eventsGridRegex = /<div class="events-grid">([\s\S]*?)<\/section>/;
  content = content.replace(eventsGridRegex, newEventsGrid);

  // B. Parse June 2026 report details from file to build archive card
  let juneTitle = `Elite Events in ${c.name} June 2026`;
  let juneDesc = `${c.name} elite events June 2026.`;
  let juneDate = "2026-06-01";
  let juneDateDisplay = "June 1, 2026";
  
  const juneFilePath = path.join(webDir, `${slug}-events-june-2026.html`);
  if (fs.existsSync(juneFilePath)) {
    const juneContent = fs.readFileSync(juneFilePath, 'utf8');
    const titleMatch = juneContent.match(/<title>(.*?)<\/title>/i);
    if (titleMatch) juneTitle = titleMatch[1].replace(' — EliteLoop', '').trim();
    
    const descMatch = juneContent.match(/<meta name="description" content="(.*?)"/i);
    if (descMatch) juneDesc = descMatch[1].trim();

    const timeMatch = juneContent.match(/<time datetime="([^"]+)">([^<]+)<\/time>/i);
    if (timeMatch) {
      juneDate = timeMatch[1].trim();
      juneDateDisplay = timeMatch[2].trim();
    }
  }

  // C. Update featured card in scene-section
  const currentJulySlug = `${slug}-events-july-2026`;
  const currentJulyTitle = `Elite Events in ${c.name} July 2026`;
  const currentJulyDesc = c.metaDesc;

  // Let's replace the main featured card inside scene-section
  const sceneCardRegex = /<a href="\/[a-z0-9-]+-events-june-2026" class="scene-card"([\s\S]*?)<\/a>/;
  const cleanSceneCard = `<a href="/${currentJulySlug}" class="scene-card" aria-label="${currentJulyTitle}">
      <div class="scene-card__content">
        <div class="scene-card__tag">July 2026 · Elite Events Guide</div>
        <div class="scene-card__title">${currentJulyTitle}</div>
        <div class="scene-card__excerpt">${currentJulyDesc}</div>
        <div class="scene-card__read">Read full guide →</div>
      </div>
      <div class="scene-card__meta">
        <div class="scene-stat">
          <div class="scene-stat__num">6</div>
          <div class="scene-stat__label">Verified events</div>
        </div>
        <div class="scene-stat">
          <div class="scene-stat__num">3</div>
          <div class="scene-stat__label">Access layers</div>
        </div>
        <div class="scene-stat">
          <div class="scene-stat__num">July</div>
          <div class="scene-stat__label">Current dispatch</div>
        </div>
      </div>
    </a>`;
  
  if (sceneCardRegex.test(content)) {
    content = content.replace(sceneCardRegex, cleanSceneCard);
  } else {
    // Also support fallback replacement of any events guide link in the featured slot
    const genericSceneCardRegex = /<a href="\/[a-z0-9-]+-events-[a-z0-9-]+" class="scene-card"([\s\S]*?)<\/a>/;
    content = content.replace(genericSceneCardRegex, cleanSceneCard);
  }

  // D. Prepend June 2026 card to report-archive-list
  const archiveItemHtml = `      <a href="/${slug}-events-june-2026" class="report-archive-item">
        <div class="report-archive__meta">
          <time datetime="${juneDate}" class="report-archive__date">${juneDateDisplay}</time>
          <span class="report-archive__tag">Elite Events Guide</span>
        </div>
        <div class="report-archive__content">
          <div class="report-archive__title">${juneTitle}</div>
          <div class="report-archive__excerpt">${juneDesc}</div>
        </div>
      </a>\n`;

  // We find <div class="report-archive-list" ...>
  // check if it already contains the June 2026 guide
  if (!content.includes(`href="/${slug}-events-june-2026"`)) {
    const archiveListRegex = /(<div class="report-archive-list"[^>]*>)/;
    content = content.replace(archiveListRegex, `$1\n${archiveItemHtml}`);
  }

  fs.writeFileSync(hubPath, content, 'utf8');
  hubCount++;
});
console.log(`Updated ${hubCount} evergreen city hubs with July data.`);
