// scripts/seed.js

const BASE_URL = process.env.BASE_URL || 'http://localhost:5000';

require("dotenv").config();
const mongoose = require("mongoose");
const Category = require("../src/models/category");
const Author = require("../src/models/author");
const Article = require("../src/models/article");
const User = require("../src/models/user");
const Ad = require("../src/models/ad");  
const bcrypt = require("bcryptjs");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

const seedDatabase = async () => {
  try {
    // Clear existing data
    console.log("🗑️  Clearing existing data...");
    await Category.deleteMany({});
    await Author.deleteMany({});
    await Article.deleteMany({});
    await User.deleteMany({});
    await Ad.deleteMany({});  

    // Create categories
    console.log("📁 Creating categories...");
    const categories = await Category.insertMany([
      {
        name: "Fashion",
        slug: "fashion",
        description: "Latest fashion trends and style guides",
        icon: "👗",
        color: "#FF6B9D",
      },
      {
        name: "Lifestyle",
        slug: "lifestyle",
        description: "Living your best life",
        icon: "🌟",
        color: "#4ECDC4",
      },
      {
        name: "Sports",
        slug: "sports",
        description: "Arts, music, and cultural insights",
        icon: "🎭",
        color: "#FFD93D",
      },
      {
        name: "News",
        slug: "news",
        description: "Latest news and current events",
        icon: "📰",
        color: "#FF6B6B",
      },
      {
        name: "Entertainment",
        slug: "entertainment",
        description: "Movies, music, and pop culture",
        icon: "🎬",
        color: "#4D96FF",
      },
      {
        name: "Features",
        slug: "features",
        description: "In-depth features and special stories",
        icon: "📝",
        color: "#FFA94D",
      },
    ]);
    console.log(`✅ Created ${categories.length} categories`);

    // Create admin user
    console.log("👤 Creating admin user...");
    const hashedPassword = await bcrypt.hash("admin123", 10);
    const adminUser = await User.create({
      name: "Admin User",
      email: "admin@nationstyle.com",
      password: hashedPassword,
      role: "admin",
    });
    console.log("✅ Admin user created");

    // Create sample ads
  console.log("📢 Creating ads...");
 const ads = await Ad.insertMany([  
  {
    title: "Flame.dev",
    imageUrl: "uploads/ads/flamedevbanner.png",
    link: "https://example.com",
    position: "sidebar",
    isActive: true,
  },
  {
    title: "Iroko news media",
    imageUrl: "uploads/ads/irokonewsad.png",
    link: "https://example.com",
    position: "header",
    isActive: true,
  },
]);
console.log(`✅ Created ${ads.length} ads`);

    // Create authors
    console.log("✍️  Creating authors...");
    const authors = await Author.insertMany([
      {
        name: "Okediya Bukunmi",
        slug: "okediya-bukunmi",
        bio: "Fashion editor with 10 years of experience covering runway shows and street style.",
        email: "okediyabukunmi@nationstyle.com",
        profileImage: "uploads/authors/author1.jpeg",
        social: {
          twitter: "@sarahjfashion",
          instagram: "@sarahjstyle",
        },
      },
      {
        name: "Udusi David",
        slug: "udusi-david",
        bio: "Executive Leadership in Entertainment Talent Management & Brand Expansion Serious inquiries only.",
        email: "udusidavid@nationstyle.com",
        profileImage: "uploads/authors/udusidavid.jpeg",
      },
      {
        name: "Olusoga Feyifunmi",
        slug: "olusoga-feyifunmi",
        bio: "Fashion Editor.",
        email: "feyifunmi@nationstyle.com",
        profileImage: "uploads/authors/olusogafeyifunmi.jpeg",
      },

      {
        name: "Famuyide Oluwafolakemi",
        slug: "famuyide-oluwafolakemi",
        bio: "Entertainment editor ",
        profileImage: "uploads/authors/famuyidefolakemi.jpeg",
      },

      {
        name: "Awosusi Oluwatomisin",
        slug: "awosusi-oluwatomisin",
        bio: "Mass Communication student at Adeleke University with a strong interest in media, communication, and storytelling.",
        profileImage: "uploads/authors/awosusioluwatomisin.jpeg",
      },

      {
        name: "Elijah Gana",
        slug: "elijah-gana",
        bio: "Entertainment editor ",
        profileImage: "uploads/authors/awosusioluwatomisin.jpeg",
      },

      {
        name: "Falade Obafemi",
        slug: "falade-obafemi",
        bio: "Campus Journalist,  Broadcast Media Enthusiast. News Media owner.",
        profileImage: "uploads/authors/faladeobafemi.jpeg",
      },

      {
        name: "Oyetunde Habeeb ",
        slug: "oyetunde-habeeb",
        bio: "College footballer, Sports analyst. Sports enthusiast.",
        profileImage: "uploads/authors/oyetundehabbeb.jpeg",
      },

      {
        name: "Hosea Oyindamola ",
        slug: "hosea-oyindamola",
        bio: "Makeup Artist, Content Creator, Beauty Enthusiast",
        profileImage: "uploads/authors/hoseaoyindamola.jpeg",
      },

      {
        name: "Dada Oluwasemilore",
        slug: "dada-oluwasemilore",
        bio: "Lifestyle editor, aspiring PR and brand strategist",
        profileImage: "uploads/articles/Dada Oluwasemilore .jpeg",
      },

      {
        name: "Segun Bukola",
        slug: "segun-bukola",
        bio: "News editor",
        profileImage: "uploads/authors/segunbukola.jpeg",
      },

      {
        name: "Akinsola Femi",
        slug: "akinsola-femi",
        bio: "College Footballer, Sport Analyst. Sport News Writer",
        profileImage: "uploads/authors/akinsolafemi.jpeg",
      },
    ]);
    console.log(`✅ Created ${authors.length} authors`);

    const okediyaBukunmi = authors.find((a) => a.slug === "okediya-bukunmi");
    const udusiDavid = authors.find((a) => a.slug === "udusi-david");
    const olusogaFeyifunmi = authors.find((a) => a.slug === "olusoga-feyifunmi");
    const famuyideOluwafolakemi = authors.find((a) => a.slug === "famuyide-oluwafolakemi",);
    const awosusiOluwatomisin = authors.find((a) => a.slug === "awosusi-oluwatomisin",);
    const elijahGana = authors.find((a) => a.slug === "elijah-gana");
    const faladeObafemi = authors.find((a) => a.slug === "falade-obafemi");
    const oyetundeHabeeb = authors.find((a) => a.slug === "oyetunde-habeeb");
    const hoseaOyindamola = authors.find((a) => a.slug === "hosea-oyindamola");
    const dadaOluwasemilore = authors.find((a) => a.slug === "dada-oluwasemilore");
    const segunBukola = authors.find((a) => a.slug === "segun-bukola");
    const akinsolaFemi = authors.find((a) => a.slug === "akinsola-femi");

    // Create sample articles
    console.log("📝 Creating articles...");
    const fashionCategory = categories.find((c) => c.slug === "fashion");
    const beautyCategory = categories.find((c) => c.slug === "beauty");
    const lifestyleCategory = categories.find((c) => c.slug === "lifestyle");
    const sportsCategory = categories.find((c) => c.slug === "sports");
    const featuresCategory = categories.find((c) => c.slug === "features");
    const travelCategory = categories.find((c) => c.slug === "travel");
    const newsCategory = categories.find((c) => c.slug === "news");
    const entertainmentCategory = categories.find(
      (c) => c.slug === "entertainment",
    );

    //  { name: 'HOME', path: '/' },
    // { name: 'NEWS', path: '/category/news' },
    // { name: 'FASHION', path: '/category/fashion' },
    // { name: 'LIFESTYLE', path: '/category/lifestyle' },
    // { name: 'CULTURE', path: '/category/culture' },
    // { name: 'FEATURES', path: '/category/features' },
    // { name: 'ENTERTAINMENT', path: '/category/entertainment' },

    const articles = await Article.insertMany([
  // FASHION ARTICLES (4 articles)
  {
    title: "The Evolution of Fashion",
    slug: "evolution-of-fashion-" + Date.now(),
    excerpt: "How Style Reflects Identity and Culture",
    content: `<h3>The Evolution of Fashion: How Style Reflects Identity and Culture</h3>
    Fashion is more than just clothing; it is a powerful form of self-expression that reflects identity, culture, and social change. Over the years, fashion has evolved from being a simple necessity for protection to becoming a major influence in society. Today, what people wear often communicates their personality, beliefs, status, and even their mood.

    In earlier times, clothing was mainly designed for survival. People wore garments made from animal skins, leaves, and natural fibers to protect themselves from weather conditions. As civilizations developed, fashion began to represent social class and occupation. For example, kings, queens, and nobles wore luxurious fabrics like silk and velvet, while common people wore simpler materials such as cotton or wool. This showed that fashion has always been closely connected to identity and hierarchy.

    As time passed, fashion became more creative and expressive. The industrial revolution played a huge role in making clothing more accessible. Mass production allowed more people to follow trends instead of only the wealthy. Designers started experimenting with new fabrics, colors, and styles. Fashion houses emerged, and runways became platforms where new ideas were introduced to the world.

    In modern society, fashion is deeply tied to personal identity. Many people use their clothing choices to express who they are. Some prefer minimalist styles with neutral colors to show elegance and simplicity, while others choose bold prints and bright colors to express confidence and creativity. Streetwear, luxury fashion, vintage styles, and cultural attire all represent different personalities and lifestyles.

    Culture also has a strong influence on fashion. Traditional outfits, fabrics, and patterns often tell stories about a community’s history and values. For instance, African prints, Asian silk garments, and indigenous beadwork are not just beautiful designs; they carry meaning and heritage. Wearing cultural fashion can be a way of honoring one’s roots and preserving traditions.

    Social media has changed fashion in recent years. Platforms like Instagram and TikTok allow trends to spread quickly across the world. Influencers and celebrities now play a major role in shaping what is popular. At the same time, there is a growing movement toward individuality, where people mix styles to create unique looks instead of following every trend.

    Another important shift in modern fashion is the rise of sustainability. Many designers and consumers are becoming more aware of the environmental impact of fast fashion. As a result, there is increasing support for thrift shopping, recycling clothes, and investing in high-quality pieces that last longer. This shows that fashion is not only about appearance but also about responsibility and awareness.

    Furthermore, fashion can affect confidence and self-esteem. Wearing clothes that make someone feel comfortable and confident can improve how they present themselves in daily life. This is why many people say, “Dress how you want to be addressed.” Clothing can influence first impressions, communication, and even opportunities.

    In conclusion, fashion is a dynamic and meaningful part of human society. It has evolved from basic survival clothing into a powerful tool for identity, culture, creativity, and communication. As trends continue to change, one thing remains constant: fashion will always be a reflection of who we are and the world we live in.`,
    featuredImage: "https://nation-style.onrender.com/uploads/articles/evolutionoffashion.png",
    category: fashionCategory._id,
    author: olusogaFeyifunmi._id,
    tags: ["trends", "spring", "fashion week"],
    isFeatured: true,
    isTopStory: true,
    published: true,
    readTime: 5,
    views: 1250,
  },

  {
    title: "Sustainable Fashion: Where to Shop Eco-Friendly",
    slug: "sustainable-fashion-shopping-" + Date.now(),
    excerpt: "Discover brands that are making fashion more sustainable.",
    content: `<h3>Sustainable Fashion: Where to Shop Eco-Friendly — A Nigerian Style Guide</h3>
    From the bustling markets of Lagos to vibrant online boutiques, sustainable fashion is no longer a fringe trend — it’s a movement shaping the future of how we shop, dress, and think about our wardrobes. Eco-friendly fashion isn’t just about wearing the latest looks; it’s about supporting ethical production, reducing waste, and celebrating craftsmanship that respects both people and the planet.

    Here’s your insider guide to where to shop sustainable fashion — locally and beyond.

    🇳🇬 Homegrown & Eco-Conscious Nigerian Brands to Know

    Nigeria’s fashion scene is rich with designers who are blending culture with sustainability — using traditional textiles, upcycled materials, and ethical practices to create stylish pieces with purpose.

    • NKWO – A standout Lagos brand transforming off-cuts, discarded denim, and textile leftovers into bold, handcrafted pieces. The label’s zero-waste design and community-focused production make it a true champion of eco fashion.

    • Ethnik by Tunde Owolabi – Celebrates Nigerian heritage with aso-oke-inspired sneakers, bags, and accessories. Handcrafted by local artisans, these pieces tell a story while supporting fair wages and traditional skills.

    • Iamisigo – Known for wearable art, this brand collaborates with artisans on hand-dyed, hand-woven garments produced in limited quantities, steering clear of mass consumption.

    • Orange Culture – Bold, gender-fluid designs made in small batches with ethically sourced fabrics — perfect if you want style that also stands for something.

    • RE.Lagos & Gozel Green – Brands focused on minimalist, timeless fashion that reduces waste through slow production methods and quality materials.

    • Shekudo & Lisa Folawiyo Studio – While Shekudo’s handcrafted accessories lean on local craftmanship, Lisa Folawiyo repurposes Ankara in luxury pieces that celebrate heritage and durability — both examples of sustainable, culturally rooted fashion.

    🛍️ Not Just Brands — Eco-Friendly Places to Shop

    • Nigerian Markets & Thrift Culture – Sustainability isn’t only about new eco brands. Thrift shopping in popular hubs like Yaba Market, Oshodi, Tejuosho, and Balogun is a powerful way to reduce waste and find stylish, one-of-a-kind pieces. Pre-loved fashion gives garments a second life and keeps them out of landfills.

    • Community & Craft Marketplaces – Places like Lekki Arts & Crafts Market and Jabi Arts & Crafts Market feature handcrafted items from artisans using sustainable materials — ideal for accessories and statement pieces.

    🌍 Online & Global Sustainable Fashion Shops

    If you’re ready to expand your sustainable wardrobe beyond local designers, there are online platforms and brands dedicated to ethical fashion:

    • EcoFashionStar – Curated selections of eco-friendly, ethically made fashion that prioritises responsible production and mindful style.

    • Good On You & Similar Directories – Not shops in themselves, but valuable resources that help you discover verified sustainable brands and avoid “greenwashing” — when companies exaggerate their eco-credentials.

    Some global brands also offer eco-lines made with organic cotton, recycled fabrics, and low-impact production practices — ideal for timeless staples and conscious shopping.

    🧠 Tips for Shopping Sustainably

    Here’s how to make eco-friendly fashion a reality in your closet:

    1. Quality Over Quantity – Invest in pieces that last. Sustainable fashion favours timeless design and durable materials.
    2. Know What You’re Buying – Look for natural fibres like organic cotton, linen, and hemp, and ask brands about their materials and production practices.
    3. Shop Second-Hand – Thrifting and vintage shopping are huge eco wins — and often great for unique style finds.
    4. Support Local Artisans – Buying locally helps reduce carbon footprints and empowers communities.

    🌿 Why It Matters

    Eco-friendly fashion isn’t a trend — it’s a lifestyle shift. By choosing brands and shops that value the planet and people, you’re contributing to a fashion future that respects workers, celebrates culture, and protects our environment. 🌱

    From Lagos boutiques to online ethical marketplaces, sustainable fashion is where style meets conscience. Are you ready to wear your values?`,
    featuredImage: "https://nation-style.onrender.com/uploads/articles/sustainablefashion.png",
    category: fashionCategory._id,
    author: okediyaBukunmi._id,
    tags: ["sustainable", "eco-friendly", "ethical fashion"],
    isFeatured: false,
    published: true,
    readTime: 6,
    views: 670,
  },

  {
    title: "Street Style Inspiration from Fashion Week",
    slug: "street-style-fashion-week-" + Date.now(),
    excerpt: "The best looks spotted outside the shows.",
    content: `<h3>Street Style Inspiration from Fashion Week: Where Trends Really Come Alive</h3>
    If the runway is where fashion is introduced, the streets are where it becomes real. Outside the show venues — from Paris boulevards to New York sidewalks — editors, influencers, stylists, and everyday fashion lovers turn pavements into personal catwalks. And this season, street style proved one thing loud and clear: individuality is the ultimate luxury.

    🎨 Colour Is the New Neutral

    Muted tones stepped aside as bold colours stole the spotlight. Think head-to-toe red, vibrant lime green, electric blue, and playful pinks. The trick wasn’t matching perfectly — it was wearing colour with confidence. Unexpected combinations like purple and orange or teal and yellow brought fresh energy to classic silhouettes.

    Street style said goodbye to playing safe and hello to standing out.

    🧥 Power in Oversized Silhouettes

    Structured oversized blazers, wide-leg trousers, and dramatic coats dominated the scene. The look balanced comfort and authority — soft tailoring that still made a statement. Many styled their oversized pieces with fitted inner layers like crop tops or slim tanks to keep proportions sharp.

    It’s giving “boss energy,” but make it effortless.

    👟 Sneakers Stayed Winning

    Fashion Week confirmed it: sneakers are not going anywhere. Chunky soles, retro runners, and sleek minimalist trainers paired seamlessly with suits, skirts, and even dressy outfits. Comfort and coolness walked hand in hand, proving you don’t need heels to serve a look.

    Style that lets you move? We love to see it.

    👜 Accessories Did the Heavy Lifting

    This season’s street style stars knew one thing — accessories can transform everything. Oversized sunglasses, sculptural earrings, layered chains, and bold handbags elevated even the simplest outfits.

    Belts were used to cinch oversized blazers, gloves added drama, and mini bags continued their reign as tiny but mighty statement pieces.

    👖 Denim, But Make It Fashion

    Denim stepped far beyond basic jeans. We saw patchwork details, denim maxi skirts, structured denim corsets, and matching two-piece sets. Double denim wasn’t just accepted — it was styled with confidence and polish.

    Who knew your favourite fabric could look this high fashion?

    🌍 Culture Was the Ultimate Influence

    One of the most beautiful parts of Fashion Week street style was the celebration of heritage. Guests mixed traditional fabrics, handcrafted pieces, and cultural silhouettes with contemporary fashion. From Ankara accents to Asian-inspired tailoring and Middle Eastern layering, global style influences were proudly on display.

    Fashion felt less like a trend cycle and more like a cultural conversation.

    ✨ The Street Style Lesson

    Street style reminds us that fashion doesn’t belong only to designers or celebrities. It belongs to people bold enough to experiment, mix, clash, and create something uniquely theirs.

    You don’t need an invitation to Fashion Week to be stylish. Start with one statement piece, play with colour, add personality through accessories, and most importantly — wear your confidence like it’s couture.

    Because at the end of the day, the best trend you can follow…
    is your own.`,
    featuredImage: "https://nation-style.onrender.com/uploads/articles/streetstyle.png",
    category: fashionCategory._id,
    author: okediyaBukunmi._id,
    tags: ["street style", "fashion week", "inspiration"],
    isFeatured: false,
    isBreaking: true,
    published: true,
    readTime: 4,
    views: 1100,
  },

  // LIFESTYLE ARTICLES (4 articles)
  {
    title: "Veekee James Dubai Baby Shower",
    slug: "veekee-james-baby-shower-" + Date.now(),
    excerpt: "Veekee James Turns Dubai Into a Fairy Tale for Her Baby Shower and Gender Reveal",
    content: `<h3>Veekee James Turns Dubai Into a Fairy Tale for Her Baby Shower and Gender Reveal</h3>
    Dubai What happens when one of Nigeria’s most stylish designers steps into motherhood? A moment the internet can’t stop talking about.

    Veekee James, the Nigerian fashion designer celebrated for her couture bridal gowns and luxe aesthetic, recently hosted an unforgettable baby shower and gender reveal party in Dubai that has been trending across social media and entertainment outlets this week.  ￼

    The celebration, held in the glitzy cosmopolitan setting of Dubai, was a crisp all-white affair, from the décor to the guests’ attire. Elegant arrangements of white balloons, floral installations, and soft ambient lighting set the tone, creating a dreamlike atmosphere that perfectly matched Veekee’s signature sophistication.  ￼

    But the highlight of the night came with the emotional gender reveal moment. After weeks of anticipation, family and friends watched as clouds of pink smoke filled the sky, signaling that Veekee and her husband, Femi Atere, are expecting a baby girl their first child together. The moment was captured in a now-viral video where Veekee broke into tears of joy, and Femi’s delighted reaction spread across timelines.  ￼

    Sharing clips from the event on social media, Veekee described it as one of the “most beautiful events” of her life, surrounded by her closest support system. She also teased that a full vlog of the celebration will soon be released on the couple’s YouTube channel, The Ateres, giving fans an even deeper look into the festivities.  ￼

    This milestone comes just days after the couple officially announced their pregnancy on Instagram, captioning a series of maternity photos with the heartfelt words: “And two shall become 3… Indeed this is what only GOD can do.”  ￼

    Veekee and Femi, who tied the knot in a stylish wedding in February 2024, have continued to share their love story and creative ventures online. This latest chapter, blending glamorous celebration with personal joy, shows just how intentional and inspirational their journey has become.  ￼

    With Dubai as the backdrop and loved ones by their side, Veekee James’ baby shower wasn’t just an event it was a cultural moment that fused luxury, emotion, and fashion in a way only she could.`,
    featuredImage: "https://nation-style.onrender.com/uploads/articles/vekkejames1.jpeg",
    category: lifestyleCategory._id,
    author: awosusiOluwatomisin._id,
    tags: ["celebrity", "lifestyle"],
    isFeatured: true,
    published: true,
    readTime: 5,
    views: 2100,
  },

  {
    title: "The Best Skincare Ingredients for Glowing Skin",
    slug: "best-skincare-ingredients-" + Date.now(),
    excerpt: "Science-backed ingredients that actually work.",
    content: `<h3>The Best Skincare Ingredients for Glowing Skin — Your Expert Guide</h3>
    Everyone wants that radiant, luminous complexion — but great skin doesn’t happen by luck. It happens with the right ingredients. From antioxidants that fight dullness to hydrators that lock in moisture, here’s your insider guide to the best skincare ingredients for glowing skin — and how they actually work.

    ✨ 1. Vitamin C — The Brightening Superstar

    What it does:
    Vitamin C is a powerful antioxidant that helps even out skin tone, fade dark spots, and protect against environmental damage.

    Why it’s great:
    It supports collagen production and boosts radiance, giving skin that fresh, lit-from-within glow.

    How to use:
    Look for serums with L-ascorbic acid or stable Vitamin C derivatives like tetrahexyldecyl ascorbate. Apply in the morning under sunscreen.

    💧 2. Hyaluronic Acid — Deep Hydration Hero

    What it does:
    Hyaluronic acid attracts and binds moisture to the skin — holding up to 1,000× its weight in water.

    Why it’s great:
    Hydrated skin looks plumper, smoother, and more luminous — wrinkles appear softer, and texture feels silky.

    How to use:
    Use after cleansing (AM/PM) on damp skin, then seal it with a moisturizer to lock in hydration.

    🍋 3. Niacinamide — The Texture Transformer

    What it does:
    Also known as Vitamin B3, niacinamide improves skin texture, reduces redness, and balances oil production.

    Why it’s great:
    It helps reduce the appearance of pores while supporting the skin’s barrier function — essential for healthy, glowing skin.

    How to use:
    A gentle ingredient that works well with most products — try incorporating it into your daily routine.

    🍯 4. Alpha Hydroxy Acids (AHAs) — The Smooth-Skin Secret

    What it does:
    AHAs like glycolic acid and lactic acid gently exfoliate dead skin cells, revealing smoother, brighter skin beneath.

    Why it’s great:
    By encouraging cell turnover, AHAs help fade dullness, refine texture, and improve radiance.

    How to use:
    Start with lower concentrations; use in the evening and always finish with sunscreen the next day.

    🌿 5. Retinol — The Glow & Renew Powerhouse

    What it does:
    Retinol speeds up cell turnover, encourages collagen production, and improves fine lines and pigmentation.

    Why it’s great:
    With consistent use, retinol helps reveal fresher, smoother, more luminous skin.

    How to use:
    Start slowly (every other night), and pair with SPF — retinol increases sun sensitivity.

    🛡️ 6. Ceramides — The Skin Barrier Builders

    What it does:
    Ceramides are natural lipids that strengthen your skin’s protective barrier, preventing moisture loss.

    Why it’s great:
    A strong barrier means hydrated, healthy-looking skin that glows from within.

    How to use:
    Often found in creams and lotions — great for daily use, especially dry or sensitive skin.

    🌸 7. Antioxidants — The Environmental Shield

    What it does:
    Ingredients like green tea extract, resveratrol, and vitamin E protect skin from environmental stressors that dull your glow.

    Why it’s great:
    Antioxidants combat free radicals, supporting brighter, fresher skin.

    How to use:
    Use in morning and evening routines to maximize skin protection.

    🍃 8. Peptides — The Firming Boosters

    What it does:
    Peptides help signal cell repair and support skin elasticity.

    Why it’s great:
    Firm, resilient skin reflects light better — contributing to that sought-after glow.

    How to use:
    Commonly found in serums and creams; layer under moisturizer.

    🪩 9. Squalane — Lightweight Hydration Magic

    What it does:
    Squalane mimics the skin’s natural oils, delivering lightweight but lasting hydration without clogging pores.

    Why it’s great:
    It softens, smooths, and helps skin look supple and radiant.

    How to use:
    Add a few drops to your routine after serums and before moisturizer.

    🌟 Pro Tips for Glowing Skin

    ✨ Consistency beats intensity. Daily care matters more than occasional heavy treatments.
    ✨ Layer smartly. Start with thinnest products (serums) and finish with creams/oils.
    ✨ SPF every day. No glow lasts when your skin is sun-damaged — sunscreen is non-negotiable.
    ✨ Hydration + rest = radiance. What you drink and how you sleep reflects on your skin.

    🛍️ Quick Routine Example

    AM: Cleanser → Vitamin C → Hyaluronic Acid → Moisturizer → SPF
    PM: Cleanser → AHA/Retinol (alternate nights) → Niacinamide → Ceramides → Squalane

    ✨ Final Glow Note

    Beautiful skin is not a myth — it’s a ritual. With the right ingredients — and patience — you can transform dullness into luminosity and create a complexion that not only glows but also feels deeply healthy.

    Want a product recommendation list (budget to luxury) for these ingredients? I can tailor it to your skin type!`,
    featuredImage: "https://nation-style.onrender.com/uploads/articles/bestskincare.png",
    category: lifestyleCategory._id,
    author: okediyaBukunmi._id,
    tags: ["skincare", "ingredients", "beauty science"],
    isFeatured: false,
    isTopStory: true,
    published: true,
    readTime: 8,
    views: 1540,
  },

  {
    title: "How to Create a Morning Routine That Sticks",
    slug: "morning-routine-guide-" + Date.now(),
    excerpt: "Start your day right with these simple habits.",
    content: `<h3>How to Create a Morning Routine That Actually Sticks</h3>
    We’ve all said it: “Starting tomorrow, I’ll wake up early, drink water, exercise, journal, plan my day…”
    Then tomorrow comes… and snooze wins. 😅

    The secret to a morning routine that lasts isn’t motivation — it’s strategy. Here’s how to build one you’ll truly keep.

    🌅 1. Start Small — Tiny Wins Build Real Habits

    The biggest mistake? Trying to change your whole life overnight.

    Instead of a 10-step routine, start with just 2–3 simple actions:

    Drink a glass of water

    Stretch for 2 minutes

    Write one priority for the day

    Small habits feel easy → easy habits get repeated → repeated habits become routine.

    Consistency beats intensity every time.

    ⏰ 2. Wake Up at a Realistic Time

    If you currently wake up at 7:30am, don’t suddenly aim for 5:00am. That’s a setup. Shift your wake-up time 15–20 minutes earlier each week if you want earlier mornings.

    And yes — sleep earlier too. A good morning starts the night before.

    📵 3. Don’t Let Your Phone Win the Morning

    Scrolling first thing = mental overload before your day even begins.

    Try this instead:

    Keep your phone away from your bed

    Spend the first 20–30 minutes phone-free

    Replace scrolling with something intentional (stretching, prayer, journaling, quiet thinking)

    Your mind deserves a gentle start, not notifications and stress.

    💧 4. Do One Thing for Your Body

    You don’t need a full gym session. Just wake your body up.

    Options:

    Light stretching

    A short walk

    10 squats + 10 pushups

    Dancing to one song you love

    Movement boosts mood, energy, and focus for the rest of the day.

    🧠 5. Do One Thing for Your Mind

    This sets the tone for how you think and feel all day.

    Try:

    Journaling one page

    Writing 3 things you’re grateful for

    Reading 5–10 minutes

    Quiet prayer or meditation

    A calm mind in the morning = better decisions all day.

    📋 6. Choose Your “Main Thing” for the Day

    Before the world starts making demands, decide:
    “What’s the ONE thing that will make today productive?”

    Write it down. When your day gets busy, that one focus keeps you grounded.

    🎯 7. Attach Your Routine to Something You Already Do

    Habits stick better when they’re linked.

    For example:

    After brushing teeth → drink water

    After drinking water → stretch

    After stretching → journal

    This creates a natural flow instead of relying on memory or motivation.

    🧩 8. Make It Enjoyable (Or You’ll Quit)

    Your routine shouldn’t feel like punishment.

    Light a candle. Play soft music. Use a nice mug. Sit in your favorite chair. Wear cozy clothes. Enjoy the vibe.

    If mornings feel good, you’ll want to repeat them.

    🔁 9. Missed a Day? Don’t Restart — Just Continue

    Skipping one day doesn’t ruin the habit. Quitting does.

    No guilt. No “I’ll start next month.”
    Just pick it back up the next morning like nothing happened.

    🌟 Sample Simple Morning Routine (20–30 Minutes)

    Wake up & drink water (2 mins)

    Light stretch or quick movement (5 mins)

    Quiet time / prayer / breathing (5 mins)

    Write top priority for the day (3 mins)

    Get ready for your day

    That’s it. Simple. Sustainable. Powerful.

    💛 Final Thought

    A good morning routine doesn’t just organize your day — it protects your energy, focus, and peace before the world gets loud.

    Start small. Keep it simple. Make it yours.`,
    featuredImage: "https://nation-style.onrender.com/uploads/articles/morningroutine2.png",
    category: lifestyleCategory._id,
    author: okediyaBukunmi._id,
    tags: ["wellness", "productivity", "habits"],
    isFeatured: false,
    published: true,
    readTime: 6,
    views: 980,
  },

  // NEWS ARTICLES (3 articles)
  {
    title: "Nigeria 2027: The Election that will Define a Generation",
    slug: "nigeria-2027-election-" + Date.now(),
    excerpt: "Two years to the polls, Nigeria stands at a crossroads.",
    content: `<h3>Nigeria 2027: The Election That Will Define a Generation</h3>
    By February 2026, the countdown to Nigeria’s next general elections has begun in earnest. Though the ballot boxes will not be opened until 2027, the political atmosphere already feels heavy with uncertainty. Across the country, conversations about democracy are increasingly shaped by fear, frustration, and fatigue.

    For many Nigerians, the central question is no longer who will win the next election, but whether the process itself can still inspire confidence.

    A Democracy Tested by Insecurity

    Insecurity remains the most visible threat to Nigeria’s electoral future. From banditry in the North-West to communal violence and kidnappings in other regions, the ability of citizens to safely participate in elections is far from guaranteed.

    Previous elections have shown that voter turnout drops sharply in areas affected by violence. Analysts warn that unless security conditions improve, large sections of the population may be effectively excluded from the democratic process.

    Pull Quote:
    “Elections cannot succeed where citizens are afraid to vote,”
    — Security analyst

    Beyond physical danger, insecurity feeds political distrust. When the state struggles to protect lives and property, confidence in its ability to conduct free and fair elections weakens.

    INEC and the Burden of Credibility

    At the centre of the debate is the Independent National Electoral Commission (INEC). Once again, questions surround logistics, funding, transparency, and the use of technology in elections.

    The promise of electronic transmission of results raised hopes in recent election cycles, but inconsistent implementation and legal disputes have damaged public trust. Civil society groups argue that clarity and consistency — not last-minute adjustments — are essential if INEC is to regain credibility.

    With 2027 approaching, pressure is mounting for the commission to demonstrate independence not just in words, but in action.

    SIDEBAR: Key Election Concerns Ahead of 2027
      •	Rising insecurity across multiple regions
      •	Vote-buying and monetisation of politics
      •	Trust in election technology and result transmission
      •	Legal battles overshadowing electoral outcomes
      •	Voter apathy, especially among young people

    Politics in Motion: Power Shifts and Realignments

    Behind closed doors, Nigeria’s political elite is already repositioning. Party defections, quiet alliances, and strategic calculations suggest that 2027 will be fiercely contested.

    These realignments are not just about ideology, but survival. Control of political structures, influence over party machinery, and access to state resources remain decisive factors in Nigerian politics.

    Observers note that early manoeuvring reflects both confidence and anxiety — confidence among those seeking continuity, and anxiety among those uncertain of public support.

    The Youth Question

    Nigeria’s youth population represents both its greatest democratic potential and its biggest challenge. While young Nigerians dominate social media conversations about governance and accountability, many remain disconnected from the formal electoral process.

    Economic hardship, unemployment, and repeated disappointment with political leadership have fuelled voter apathy. For some, migration has replaced participation as a form of protest.

    Pull Quote:
    “A democracy cannot renew itself if its young people stop believing in it.”

    Unless political actors meaningfully engage young voters beyond slogans and hashtags, turnout in 2027 may tell a troubling story.

    From Ballot Box to Courtroom

    Another persistent concern is the increasing role of the judiciary in determining election outcomes. While legal redress is a democratic safeguard, the growing perception that elections are ultimately “won in court” undermines faith in the ballot.

    Legal experts warn that excessive litigation reflects deeper failures in electoral administration and political conduct. Democracy, they argue, should be settled primarily by voters — not judges.

    The Year That Matters Most

    Many analysts believe 2026 will be decisive. Electoral reforms, security strategies, civic education, and political behaviour in the coming months will shape the credibility of the 2027 polls long before election day arrives.

    Nigeria still has time to correct course. But time alone is not enough.

    A Test Beyond Politics

    The 2027 elections will be more than a contest for power. They will test whether Nigeria’s democracy can adapt, restore trust, and include a new generation of citizens who are increasingly sceptical of political promises.

    The question facing the nation is stark:
    Will 2027 mark a renewal of democratic faith — or deepen the distance between the people and the system meant to serve them?

    Two years may seem like a long time in politics.
    In democracy, it is barely enough.`,
    featuredImage: "https://nation-style.onrender.com/uploads/articles/image.png",
    category: newsCategory._id,
    author: okediyaBukunmi._id,
    tags: ["news", "politics", "election"],
    isBreaking: true,
    isFeatured: true,
    published: true,
    readTime: 3,
    views: 2500,
  },

  {
    title: "FG Unveils $540m Programme To Empower Nigerian Women",
    slug: "fg-women-empowerment-" + Date.now(),
    excerpt: "Federal Government launches major empowerment initiative.",
    content: `<h3>FG Unveils $540m Programme To Empower Nigerian Women Nationwide</h3>
    On The 5th of February, 2026 the Federal Government of Nigeria lunched the $540million Nigeria for Women Programme Scale-Up(NFWP-SU), targeting at least five million women across the 36 states in Nigeria including the federal capital territory(FCT), Abuja. 

    The $540million, is mainly directed at improving the social development, economic empowerment, and financial inclusion for women nation wide. It is co-financed by the World Bank, federal and state governments and built on the Phase onw’s success in six pilot states, where 26,577 Women Affinity Groups formed with over 560,000 members.

    The NFWP-SU is headed by  Dr Hadiza Maina. During the lunch of the empowerment program at the presidential villa, The Minister of Women Affairs and Social Development, Imaan Sulaiman-Ibrahim, said “Today is a structural signal for Nigerian women, children, and families. It is a signal that under your leadership, women are no longer treated as beneficiaries at the margins of development, but as primary drivers of Nigeria’s economy social, and democratic stability.”

    President Bola Ahmed Tinubu, represented by Vice President Kashim Shettima, declared 2026 as the "Year of Social Development and Families." He remarked that Nigeria’s journey toward sustainable growth is inseparable from the empowerment of its women. “A nation that relegates its women is a nation bound for implosion,” the President noted, adding that the NFWP-SU is a strategic investment in the nation’s productivity and food security.

    From the legislature, Senator Ireti Kingibe, Chairperson of the Senate Committee on Women Affairs, representing the Senate President, underscored firm parliamentary backing.
    She said the programme “aligns strongly with the legislative priorities of the National Assembly and reinforces our commitment to inclusive growth, gender-responsive governance and sustainable national development.”
    She assured stakeholders of continued legislative action, stating, “the continued support of the National Assembly in strengthening the legal and institutional framework that expands opportunities for women and protects their contributions to national progress.”

    The consensus across all voices was clear: empowering women is not charity, but disciplined policy, sound economics and a cornerstone of Nigeria’s national transformation.
    The event was witnessed by ministers, governors, lawmakers, civil society organisations, women groups and development partners.`,
    featuredImage: "https://nation-style.onrender.com/uploads/articles/news1.jpeg",
    category: newsCategory._id,
    author: segunBukola._id,
    tags: ["news", "policy"],
    published: true,
    readTime: 5,
    views: 1200,
  },

  {
    title: "New Political Parties Join Nigerian Arena",
    slug: "new-political-parties-" + Date.now(),
    excerpt: "INEC registers DLA and NDC ahead of 2027 elections.",
    content: `<h3>Democratic Leadership Alliance and Nigeria Democratic Congress Join Nigeria's Political Arena</h3>
    On Thursday, 5 February 2026, the Independent National Electoral Commission (INEC) expanded Nigeria’s political landscape with the registration of two new political parties, the Democratic Leadership Alliance (DLA) and the Nigeria Democratic Congress (NDC), raising the number of officially recognised parties in the country to 21 ahead of the 2027 general elections.
    The announcement was made in Abuja during INEC’s first regular consultative meeting with political parties for the year, where the Commission said the decision followed months of administrative scrutiny and legal engagements involving more than 171 political associations that had applied for registration beginning in 2025. According to INEC, the registrations marked the conclusion of a demanding process that significantly narrowed the field of applicants.

    INEC Chairman, Prof. Joash Amupitan, SAN, explained that the Democratic Leadership Alliance emerged as the only association that fully satisfied all constitutional and statutory requirements for registration under the 1999 Constitution (as amended), the Electoral Act 2022, and the Commission’s Regulations and Guidelines. As a result, the DLA was formally registered with effect from 5 February 2026, having complied with conditions relating to documentation, spread, internal organisation and regulatory standards.
    The Nigeria Democratic Congress, however, followed a different path. INEC confirmed that the party was registered in compliance with a Federal High Court order issued in 2025, which directed the Commission to grant the association political party status. While the Commission noted that the NDC did not emerge through the same compliance-based administrative process as the DLA, it said it was constitutionally bound to obey the court’s directive in line with the rule of law.

    The contrasting routes to registration have since drawn attention within political and legal circles, reopening debates about the limits of INEC’s regulatory discretion and the growing role of judicial intervention in Nigeria’s electoral processes. While some observers argue that court oversight serves as a safeguard against arbitrariness, others warn that frequent court-ordered registrations could complicate the Commission’s role as the primary regulator of political parties.

    As of the time of filing this report, neither the DLA nor the NDC has publicly unveiled a full national leadership structure, including positions such as national chairman, secretary and other principal officers. INEC officials said certificates of registration would be formally presented in due course, after which the parties are expected to submit updated leadership registers and conduct internal congresses in accordance with their constitutions.

    Both parties are also yet to release detailed manifestos or policy documents outlining their ideological leanings or governance priorities. Analysts note that this absence will likely attract closer scrutiny in the months ahead, particularly as Nigerians increasingly demand clear policy alternatives on issues such as economic hardship, insecurity, governance reform and electoral credibility. The timing of the parties’ emergence, however, suggests an attempt to tap into growing public dissatisfaction with the country’s dominant political platforms.

    The registration exercise has not been without controversy. Promoters of several political associations denied registration have questioned INEC’s criteria and consistency, arguing that some groups which met stated requirements were excluded. On 6 February 2026, Dr. Umar Ardo, promoter of the All Democratic Alliance (ADA), publicly raised concerns over what he described as inconsistencies in the registration process after his group failed to secure approval.

    INEC has defended its actions, maintaining that it acted strictly within the confines of the law and emphasising that obedience to court orders is mandatory in a constitutional democracy. 
    The Commission also used the occasion to caution political parties on the need to strengthen internal democracy and reduce disputes that often undermine electoral integrity.

    The inclusion of the DLA and NDC comes as INEC intensifies preparations for key off-cycle elections, including the Federal Capital Territory Area Council elections scheduled for 21 February 2026, the Ekiti State governorship election on 20 June 2026, and the Osun State governorship election slated for 8 August 2026, all of which are seen as important indicators ahead of the 2027 polls.

    While the registration of new parties widens Nigeria’s democratic space, political observers caution that legal recognition alone does not guarantee electoral relevance. Past election cycles have shown that many registered parties struggle to build nationwide structures, attract credible candidates or mobilise sufficient resources to compete meaningfully at the polls.

    For the Democratic Leadership Alliance and the Nigeria Democratic Congress, attention is now expected to shift from the announcement of their registration to their ability to organise effectively, articulate clear political identities and demonstrate seriousness as Nigeria’s long march toward the 2027 general elections continues.`,
    featuredImage: "https://nation-style.onrender.com/uploads/articles/ballotbox.png",
    category: newsCategory._id,
    author: faladeObafemi._id,
    tags: ["news", "policy"],
    published: true,
    readTime: 5,
    views: 1200,
  },

  // FEATURES ARTICLES (3 articles)
  {
    title: "Tech Industry Sees Record Growth",
    slug: "tech-industry-growth-" + Date.now(),
    excerpt: "Innovation drives unprecedented expansion.",
    content: `<h3>TECH BOOM 2026: RECORD GROWTH AND WHAT IT MEANS FOR NIGERIA</h3>
    From Silicon Valley to Silicon Lagoon, the tech world is in overdrive. What was once steady expansion has now exploded into one of the brightest growth stories of the decade — driven by artificial intelligence (AI), stronger investment flows, booming digital adoption, and fresh opportunities for startups. Whether you’re a founder, investor, or consumer, this is the moment to pay attention.

    🚀 A Historic Year for the Global Tech Industry

    Global technology growth isn’t just strong — it’s breaking records. According to industry analysts, worldwide IT spending surged 14% in 2025, marking the largest annual growth since the late 1990s and driven in large part by massive AI investments in infrastructure, hardware, and software. Total information and communications technology spending is expected to approach $7 trillion — proof that digital transformation remains the engine of modern economies.

    Semiconductors — the backbone of global tech — are also poised for a significant uplift in 2026, with industry forecasts showing sustained demand and strong sales growth as AI and advanced computing remain priorities across sectors.

    Even as some markets adjust, the underlying momentum remains powerful: consulting revenues in the tech sector are set to exceed $400 billion this year, highlighting continued business demand for digital strategy and transformation services.

    🇳🇬 Nigeria’s Tech Ecosystem: Growth With Nuance

    Nigeria’s tech landscape is rapidly evolving — and while not immune to global headwinds, it continues to chart its own success story.

    In 2025, Nigerian fintech companies raised more than $520 million in funding, underlining the country’s role as a key innovation hub on the African continent. Local startups also expressed strong confidence in regional expansion, with many looking beyond Nigeria’s borders into broader African markets.

    Industry advocates describe 2026 as a “turning point” for Nigeria’s tech ecosystem, driven by improved regulation, increased innovation, and a growing digital economy. These shifts have helped local tech firms weather uncertainty and plan for sustained growth.

    Telecoms also play a central role. Major players like Airtel Nigeria are investing in network upgrades and technology advancements — efforts that promise better connectivity, faster services, and expanded digital participation across demographic groups.

    💡 What’s Driving the Tech Surge

    1. Artificial Intelligence Takes Centre Stage
    AI is no longer a future concept — it’s mainstream. From cloud infrastructure to enterprise applications, companies across the globe are adopting AI tools to automate operations, accelerate innovation, and unlock new revenue streams.

    2. Startup Funding Flows Despite Challenges
    While global venture capital trends have softened in some regions, sectors such as fintech, mobility tech, and regulatory technology (RegTech) continue to attract investment, especially in emerging markets like Africa. Local investors and international partners are increasingly eyeing Nigeria’s tech potential.

    3. Digital Skills and Workforce Growth
    Tech hubs are popping up across Nigeria, with investment in training, youth empowerment programmes, and innovation events energising the ecosystem. These initiatives are helping close the digital skills gap and prepare the next generation of tech leaders.

    4. Cross-Sector Tech Adoption
    From agriculture and logistics to health and finance, digital tools are reshaping traditional industries. This broad adoption is strengthening demand for tech solutions and creating sustainable new revenue channels.

    📊 Challenges Along the Way

    Nigeria’s tech narrative isn’t all smooth sailing. Some reports indicate that other African ecosystems — notably Kenya — have recently attracted larger venture capital inflows, challenging Nigeria’s dominant position as the continent’s startup leader.

    Additionally, local startups often confront funding inconsistencies, regulatory hurdles, and the perennial need to build stronger domestic investment channels. But for many industry watchers, these issues signal growing pains rather than decline — and opportunities for strategic improvement.

    🌍 What This Means for You

    For readers asking, “Why does tech growth matter?” — here’s the takeaway:

    Consumers will enjoy better digital services, faster connectivity, and more innovation in everyday tech products.

    Entrepreneurs have a growing landscape of opportunities, from startups to scale-ups.

    Investors have new frontiers to explore, especially in fields like AI, fintech, and digital infrastructure.

    Nigeria’s tech industry is not just growing — it’s maturing. We are witnessing a shift from survival to meaningful impact, where innovation, investment, and digital culture converge to shape the nation’s future.`,
    featuredImage: "https://nation-style.onrender.com/uploads/articles/tech2.png",
    category: featuresCategory._id,
    author: okediyaBukunmi._id,
    tags: ["news", "technology", "business"],
    isTopStory: true,
    published: true,
    readTime: 4,
    views: 1800,
  },

  {
    title: "Corporate Finance in Focus",
    slug: "corporate-finance-focus-" + Date.now(),
    excerpt: "Investment Transitions and Profitability Pressures",
    content: `<h3>Corporate Finance in Focus: Investment Transitions and Profitability Pressures</h3>
    Recent corporate developments underscore the contrasting realities businesses face in today’s financial environment. While some companies are repositioning for growth through strategic acquisitions, others are grappling with rising costs that continue to erode profitability. The cases of Beta Glass Plc and Fortis Global Insurance provide insight into how investment decisions and financial management shape corporate outcomes.

    Helios Investment Partners Takes Control of Beta Glass

    Beta Glass Plc has experienced a major shift in its ownership structure following its acquisition by Helios Investment Partners, a private equity firm known for backing high-growth businesses across emerging markets. The transaction represents a strategic investment in Nigeria’s manufacturing sector, particularly in industrial packaging and glass production.

    Under Helios’ ownership, Beta Glass is expected to benefit from improved access to capital, operational restructuring, and stronger management oversight. Private equity acquisitions typically focus on enhancing efficiency and long-term value creation, suggesting that the company may pursue expansion, technology upgrades, and cost optimization initiatives in the coming years.

    From a financial standpoint, the acquisition reflects sustained investor confidence in the company’s fundamentals and in the broader prospects of industrial manufacturing, despite prevailing economic headwinds.

    Fortis Global Insurance Struggles Amid Rising Operating Expenses

    In a separate development, Fortis Global Insurance posted a ₦1.68 billion loss for the 2025 financial year, even though it recorded an increase in premium income. The outcome highlights the growing challenge faced by insurers in maintaining profitability in an environment of rising claims and escalating operating costs.

    Industry analysts point to inflation, higher claims settlements, and increased regulatory and reinsurance expenses as major contributors to the loss. Additionally, weak investment returns may have further pressured the company’s financial position, reducing the benefits of increased premium collection.

    The situation illustrates a critical principle in financial analysis: profitability depends not only on revenue growth but also on effective cost control and risk management.

    Implications for Investors and the Economy

    The contrasting fortunes of Beta Glass and Fortis Global Insurance reveal how strategic ownership changes can create opportunities for growth, while poor cost dynamics can undermine financial performance. For investors, these developments emphasize the importance of evaluating both revenue trends and underlying expenses when assessing a company’s financial health.

    As companies navigate a complex economic climate, disciplined financial strategies, prudent investment decisions, and sound governance will remain essential to long-term success.`,
    featuredImage: "https://nation-style.onrender.com/uploads/articles/corporatefinance.png",
    category: featuresCategory._id,
    author: elijahGana._id,
    tags: ["news", "finance", "business"],
    isTopStory: true,
    published: true,
    readTime: 4,
    views: 1800,
  },

  {
    title: "Fortis Global Insurance Records Loss Despite Higher Premiums",
    slug: "fortis-insurance-loss-" + Date.now(),
    excerpt: "Challenges facing Nigeria's insurance industry.",
    content: `<h3>Fortis Global Insurance Records ₦1.68 Billion Loss in 2025</h3>
    Fortis Global Insurance Plc has reported a loss of ₦1.68 billion for the 2025 financial year, drawing attention to the persistent challenges facing Nigeria’s insurance industry. The loss occurred despite an increase in gross premium income, raising questions about cost management and underwriting efficiency.

    Financial results show that while the company succeeded in growing revenue, this was outweighed by rising claims expenses and operating costs. Inflationary pressures, higher reinsurance costs, and increased risk exposure across key policy segments contributed significantly to the negative performance. The figures highlight a growing concern in the sector: revenue growth alone is no longer enough to guarantee profitability.

    Industry observers note that Fortis Global’s results reflect a broader trend among insurers struggling to balance premium growth with effective risk control. The company has indicated plans to reassess its pricing strategies and strengthen internal controls to improve future performance. As investors and policyholders watch closely, the coming financial year will be critical in determining whether these measures can restore confidence and stability.`,
    featuredImage: "https://nation-style.onrender.com/uploads/articles/globalinsurance.png",
    category: featuresCategory._id,
    author: hoseaOyindamola._id,
    tags: ["news", "finance", "business"],
    isTopStory: true,
    published: true,
    readTime: 4,
    views: 1800,
  },

  // ENTERTAINMENT ARTICLES (4 articles)
  {
    title: "Behind the Scenes: Funke Akindele's Latest",
    slug: "behind-the-scenes-review-" + Date.now(),
    excerpt: "A Web of Quiet Sacrifice and Loud Betrayal.",
    content: `<h3>THE CURTAIN CALL: Behind the Scenes — A Web of Quiet Sacrifice and Loud Betrayal</h3>
      Nollywood’s reigning monarch, Funke Akindele, returns not with a crown, but with a deeply resonant mirror held up to the intricate web of the modern Nigerian family. Her cinematic phenomenon, Behind the Scenes, transcends its record shattering box office success to deliver a meticulously woven tapestry of interconnected lives. This is not merely the story of one woman’s burden, but an ensemble portrait where every character, from the glittering centre to the quiet periphery, embodies a facet of a larger, deeply relatable societal tension.

    At the heart of this storm is Aderonke "Ronke" Faniran, brought to life with a profound, weary grace by Scarlet Gomez. Ronke is the sun around which her family’s universe orbits, a self made real estate mogul whose success has warped her generosity into an expected entitlement. Her world is a symphony of ringing phones and unannounced visits, where her identity is slowly erased by her role as the perennial provider. The film’s audacious central plot, Ronke’s decision to fake her own death, is less a mere twist and more a seismic litmus test for every relationship she holds dear. It is a desperate gambit to answer the haunting question that fuels the entire narrative: is she loved for her essence or for her account balance?

    The true narrative power of the film lies in its expansive gaze, moving beyond Ronke’s silent exhaustion to explore the full ecosystem of dependency and desire that surrounds her. Take Adetutu, played with delicious, entitled grievance by Funke Akindele herself, whose character is crucially defined by a past sacrifice, the abandonment of her own education for the sake of her twins. These children become less individuals and more perpetual leverage in a lifelong transaction of guilt and obligation with her sister, illustrating how past choices can calcify into present day manipulation. In a devastating reveal that cuts to the film’s core, even the position of ultimate trust is violated, as Ronke’s own driver, the person least expected to do so, steals from her. This act is a powerful symbol, proving that the corrosive sense of entitlement fostered by her wealth knows no bounds of role or relation. Amidst this adult conflict, the silent sufferers are Ronke’s own children, whose emotional stability becomes the unspoken collateral damage in a war over money and attention. Their quiet pain asks the film’s most poignant question: who protects the innocent when the provider is under siege?

    Yet, within this web of exploitation, the film carefully threads notes of contrast and solace. The relationship between Johnson, played by Debo "Mr. Macaroni," and the housemaid Oluchi, portrayed with raw emotion by Destiny Etiko, stands as a vital counterpoint. Their bond, described as one of the story’s key emotional engines, is built on a foundation of genuine connection, a foil that makes the transactional nature of Ronke’s familial ties feel all the more cold. And in her lawyer and confidant, Victor, played by Uzor Arukwe, Ronke finds a sanctuary of platonic loyalty. His steadfast support offers a quiet endorsement of the idea that men and women can be best friends, providing her with a strategic ally and emotional harbour utterly absent in her dealings with her blood relatives.

    Directed with polished precision by Akindele and Tunde Olaoye, the film’s glossy aesthetic, from sleek corporate towers to chaotic family homes, creates a world of aspirational beauty that makes the emotional poverty festering within it all the more stark. Every betrayal, from the driver’s theft to a sister’s guilt tripping, and every moment of silent suffering, from Ronke’s weary eyes to her children’s confusion, builds an overwhelming case for her drastic act. Together, they paint a systemic picture of exploitation, a cycle where personal responsibility is abdicated and trust is relentlessly monetized.

    The film’s seismic cultural impact, evidenced by fiery debates on social media and in living rooms across the nation, stems from this piercing accuracy. Audiences did not just watch a story; they saw fragments of their own lives reflected in its drama. Behind the Scenes ultimately becomes a lavish, emotionally charged argument that true strength is not found in endless, self annihilating sacrifice, but in the courageous, often lonely, act of drawing a boundary. It is a landmark in Nollywood’s evolution, a blockbuster that dares to unravel the complex human threads behind a simple headline, proving that the most compelling dramas are those where every character, from the star to the driver, has a story that is intimately, inseparably connected.`,
    featuredImage: "https://nation-style.onrender.com/uploads/articles/funkeakindele.png",
    category: entertainmentCategory._id,
    author: famuyideOluwafolakemi._id,
    tags: ["movies", "entertainment", "nollywood"],
    isFeatured: true,
    published: true,
    readTime: 6,
    views: 1650,
  },

  {
    title: "Inside Music's Biggest Night: The 2026 Grammys",
    slug: "grammys-2026-recap-" + Date.now(),
    excerpt: "African artists shine at the Grammy Awards.",
    content: `<h3>Inside Music's Biggest Night: The 2026 Grammys</h3>
      The 2026 Grammy Awards, which were glittering, boisterous, and dominated by the distinct pulse of African rhythms, arrived like a late-night party in Lagos that, for some reason, everyone on the planet tuned into. The 68th ceremony, which took place at Crypto.com Arena in Los Angeles on Sunday, February 1, 2026, confirmed what African listeners already knew: Afrobeats and its cousins are now setting the playlist rather than being guests at the table. Despite the prominence of the continent, only one African performer remained with a golden gramophone. 

    The African lineup, Afrobeats on global display
    Africa’s presence at the 2026 Grammys was both broad and deep. The Best African Music Performance category, now a marquee slot in the telecast, read like a who’s who of contemporary African pop.
    South Africa’s Tyla arrived with “Push 2 Start,” a sultry, mid tempo groove that blends amapiano, R&B and pop into something sleek and international. Nigeria’s Burna Boy brought “Higher,” a high energy anthem that leans into his signature Afro fusion swagger. Davido competed with “Sensational” (featuring Chris Brown and Lojay), a glossy crossover track that has spent months bouncing between club playlists and TikTok feeds.
    Elsewhere on the shortlist, Ayra Starr’s “Last Heartbreak Song” offered emotional depth, Omah Lay’s “Holy Ghost” doubled down on his brooding, genre bending style, and Wizkid’s “Piece of My Heart” (with Brent Faiyaz) leaned into smooth, late night R&B. Uganda’s Eddy Kenzo rounded out the list with “Blessed,” a vibrant, celebratory single that channels his long standing blend of dancehall and East African pop.
    Beyond this category, veteran African voices such as Benin’s Angélique Kidjo and Senegal’s Youssou N’Dour appeared in world music and global performance adjacent spaces, reminding the audience that Africa’s Grammy story is not just about Afrobeats, it’s also about decades of sonic innovation.
    When the envelope was opened and Tyla’s name was called for Best African Music Performance, the moment felt less like an upset and more like the closing of a circle.
    Tyla became the first African artist to win the category twice, having previously taken the 2024 Grammy for “Water.” This time, “Push 2 Start” edged out four other African giants, Burna Boy, Davido, Ayra Starr and Eddy Kenzo, plus Wizkid, whose nomination underscored the sheer density of Nigerian talent on the global stage.
    Industry watchers say Tyla’s repeat win signals that the Recording Academy is beginning to reward consistency and cross genre appeal from African artists, not just one off global smashes. Her sound, rooted in South African amapiano but polished for international radio, fits neatly into the Academy’s evolving definition of “African music,” which now balances local authenticity with global accessibility.
    The near misses, what didn’t go home
    For all the excitement around Tyla, the night also felt like a reminder of how far African artists still have to go in the Grammys’ top tier categories.
    Several Afrobeats infused collaborations and features by Nigerian artists surfaced in pop, R&B and global performance style spaces, yet none of the “Big Four” awards, Album of the Year, Record of the Year, Song of the Year and Best New Artist, went to an African born act. Veteran African world music figures such as Angélique Kidjo and Youssou N’Dour were acknowledged for their contributions, but they did not add to their existing Grammy tallies this year.
    In the eyes of many African fans, the message is clear: visibility at the Grammys is no longer the exception, it is the expectation. The next frontier, they argue, is breaking through into the general field awards, where African born artists have yet to win.
    The 2026 ceremony reinforced that Afrobeats and African pop are now fixtures on the global charts, not just passing trends. Nigerian artists still dominate the African nominee pool, but Tyla’s repeat win signals that South Africa and East Africa are gaining equal footing in international tastemaking.
    For African creatives, the takeaway is that Grammy recognition is no longer a question of “if” but “when.” The challenge now is to convert that visibility into wins in the top categories, where the industry’s most coveted trophies live. As one Lagos based producer put it, “We’re not begging for a seat anymore. We’re asking for the microphone.”
    In the end, the 2026 Grammys were less about a single African winner and more about a continent’s arrival on the world stage. The music spoke for itself, and the world listened.`,
    featuredImage: "https://nation-style.onrender.com/uploads/articles/tyla.jpeg",
    category: entertainmentCategory._id,
    author: famuyideOluwafolakemi._id,
    tags: ["music", "grammys", "entertainment"],
    isTopStory: true,
    published: true,
    readTime: 5,
    views: 1420,
  },

  {
    title: "Davido Showcases Luxury Lifestyle With New Car",
    slug: "davido-new-car-" + Date.now(),
    excerpt: "Nigerian superstar acquires Lamborghini Revuelto.",
    content: `<h3>Davido Showcases Luxury Lifestyle With Acquisition of New Car</h3>
    Nigerian Afrobeats star David Adeleke, popularly known as Davido, has once again drawn public attention following reports of his acquisition of a new luxury car.Davido recently acquired a new 2026 Lamborghini Revuelto, valued at over ₦2.2 billion ($1 million+). The luxury sports car was specially built for him, adding to his extensive car collection. 

    The development, which surfaced through images and videos circulating on social media, has generated widespread reactions from fans and lifestyle observers. The singer, known for his success in the global music scene, has over the years built a reputation for high-end living, often reflected in his choice of automobiles.

    Entertainment analysts note that Davido’s latest purchase adds to his collection of luxury vehicles and further highlights the growing influence and financial success of Nigerian artists on the international stage. Fans have taken to social media platforms to congratulate the artist, praising his achievements and consistency in the music industry.

    However, the news has also sparked conversations around celebrity lifestyle and wealth display, especially amid prevailing economic challenges. While some view such displays as a reward for hard work and success, others argue for a more reserved public portrayal of wealth.

    Despite differing opinions, Davido remains one of Africa’s most celebrated music stars, with his lifestyle choices continuing to attract public interest alongside his musical projects.`,
    featuredImage: "https://nation-style.onrender.com/uploads/articles/davido.jpeg",
    category: entertainmentCategory._id,
    author: dadaOluwasemilore._id,
    tags: ["celebrity", "entertainment", "lifestyle"],
    isFeatured: true,
    published: true,
    readTime: 6,
    views: 1650,
  },

  {
    title: "When Legacy Meets Stardom: The Wizkid–Seun Kuti Showdown",
    slug: "wizkid-seun-kuti-controversy-" + Date.now(),
    excerpt: "A social media clash that reignited debates about music and legacy.",
    content: `<h3>When Legacy Meets Stardom: The Wizkid–Seun Kuti Showdown</h3>
      In late January 2026, Nigerian social media witnessed a cultural face-off that went far beyond celebrity banter. What began as a conversation about music, legacy, and respect quickly escalated into a viral controversy involving Afrobeats global star Wizkid and Seun Kuti, son of Afrobeat pioneer Fela Anikulapo-Kuti. The clash divided fans, sparked heated debates online, and reopened an old question: Can modern stars be compared to legends?
 
 
    How It All Started
    The controversy was ignited after Seun Kuti, during an Instagram Live session, reacted strongly to comparisons between Wizkid and his late father, Fela. Seun criticized Wizkid’s fanbase, popularly known as Wizkid FC, accusing them of being disrespectful and historically ignorant for placing Wizkid in the same category as Fela.
    
    To Seun, Fela was not just a musician but a revolutionary figure whose impact transcended entertainment — influencing politics, activism, and African consciousness. He maintained that comparing a modern pop star to such a figure diminished the weight of Fela’s legacy.
    
    What may have been intended as a critique of fandom culture soon took a personal turn.
    
    Wizkid’s Response
    
    Wizkid, known for keeping a relatively low profile in controversies, broke his silence via Instagram Stories. His response was blunt, emotional, and instantly viral. In a series of posts, he fired back at Seun Kuti, asserting his own achievements and global influence. One particular statement interpreted by many as dismissive of Fela’s legacy  became the focal point of outrage and debate online.
    
    Within hours, screenshots of Wizkid’s posts flooded timelines, turning the disagreement into a full-blown social media spectacle.
    Social media was both the stage and the fuel for the controversy.
    Instagram was where it all began and escalated from Seun’s Live video to Wizkid’s story replies.
    X (formerly Twitter) amplified the drama, with hashtags, memes, think-pieces, and fan wars dominating trends.
    Blogs and entertainment pages recycled clips and screenshots, often without context, intensifying public reactions.As usual, the internet did what it does best: it chose sides.
    
    As the controversy grew, misinformation spread just as fast.
    
    One major false narrative was that Wizkid directly insulted Fela Anikulapo-Kuti. While his words were undeniably provocative, they were largely a reaction to Seun and the comparisons being made, not a direct attack on Fela’s music or ideology.
    
    Another misconception was that Seun Kuti deliberately attacked Wizkid personally from the start. In reality, his initial comments were directed at fans and the culture of comparison  though his tone and choice of words helped escalate the situation.
    
    Screenshots without full context, exaggerated headlines, and emotionally charged commentary blurred the line between fact and assumption.
    
    As the debate raged, members of the Kuti family weighed in.
    
    Femi Kuti, Fela’s eldest son, expressed disappointment that the issue had escalated so publicly. He called for respect for his father’s legacy without hostility and urged people to avoid unnecessary comparisons.
    
    Other commentators and cultural critics also used the moment to educate the public on the difference between Afrobeat  Fela’s politically charged genre and Afrobeats, the modern, globally appealing sound represented by Wizkid.
    
    Gradually, the tone of the conversation began to shift from insults to introspection.
    
    Like most social media storms, the Wizkid Seun Kuti clash eventually lost momentum.
    
    Public fatigue set in as fans grew tired of repetitive arguments. Influential voices called for calm, emphasizing that both men represented different eras and purposes in Nigerian music history. Wizkid stopped posting about the issue, Seun moved on to other topics, and new trends quickly replaced the feud online.
    
    Within days, the noise faded.
    
    The Wizkid–Seun Kuti controversy was never just about ego or insults. It exposed a deeper cultural tension between legacy and modern success, between historical impact and global popularity, and between fandom loyalty and respect for history.
    
    In the end, it served as a reminder that while music evolves, legends remain untouchable and comparisons, when handled carelessly, can spark more heat than harmony.
    
    One thing is certain: Nigerian music, past and present, continues to inspire passionate conversations and that, in itself, is part of its power.`,
    featuredImage: "https://nation-style.onrender.com/uploads/articles/starboy.png",
    category: entertainmentCategory._id,
    author: udusiDavid._id,
    tags: ["music", "entertainment", "controversy"],
    isTopStory: true,
    published: true,
    readTime: 5,
    views: 1420,
  },

  // sports
  {
    title: "Germany Women Secure Strong Win in Olympic Hockey MatchMilan, Italy.",
    slug: "Germany-Women-Secure-Strong-Win-in-Olympic-Hockey-MatchMilan,-Italy." + Date.now(),
    excerpt: "the 2026 Winter Olympics",
    content: `<h3>Germany Women Secure Strong Win in Olympic Hockey Match
    Milan, Italy.</h3>

    The Germany women’s ice hockey team delivered an impressive performance today in the preliminary round of the 2026 Winter Olympics, claiming a 5–2 victory over Japan in Group B action at the Milano Rho Ice Hockey Arena. 

    From the opening minutes, Germany set the tone for a dominant match, racing out to a 5–0 lead by the middle of the second period before Japan responded with two late goals that narrowed the final scoreline. 

    Standout Performances:
    Laura Kluge was a key figure in the victory, scoring one goal and providing three assists to lead Germany’s offense. 

    Nicola Hadraschek stood out with two goals and an assist, adding significant firepower to the German attack. 

    Daria Gleissner and Emily Nix also found the back of the net, each contributing both goals and assists to help build the early lead. 

    Goalie Sandra Abstreiter made 20 saves, earning her first Olympic win between the pipes and giving the team stability in net. 

    Germany’s strong offensive effort was reflected in their ability to pressure Japan early, with captain Gleissner opening the scoring just 44 seconds into the match. 

    What This Means
    The victory marks an important boost for Germany’s campaign in the women’s ice hockey tournament at Milano Cortina 2026. After a tough opening loss to Sweden earlier in the tournament, today’s result brings the squad level with Japan in the standings and keeps their hopes alive for advancing toward the quarterfinals. 

    Japan, despite spirited play later in the game, will need strong results in upcoming matches to remain competitive in Group B`,
    featuredImage: "https://nation-style.onrender.com/uploads/articles/hockeyteam.png",
    category: sportsCategory._id,
    author: oyetundeHabeeb._id,
    tags: ["sports", "entertainment",],
    isTopStory: true,
    published: true,
    readTime: 5,
    views: 1420,
  },

   {
    title: "FC Barcelona Dominates Mallorca 3-0 to Extend La Liga Lead.",
    slug: "FC-Barcelona-Dominates-Mallorca-3-0-to-Extend-La-Liga-Lead" + Date.now(),
    excerpt: "FC Barcelona vs RCD Mallorca",
    content:`<h3>FC Barcelona Dominates Mallorca 3-0 to Extend La Liga Lead</h3> 
    FC Barcelona secured a convincing 3-0 victory over RCD Mallorca in today’s La Liga match at the Spotify Camp Nou, strengthening their position at the top of the Spanish league table. 

    Match Highlights
    Barcelona took control early and never looked back, finishing with a 3-0 scoreline. 
    Robert Lewandowski opened the scoring in the first half. 

    Teen sensation Lamine Yamal added a spectacular long-range goal, his fifth in a row across competitions, extending his impressive form. 

    Marc Bernal sealed the win with a stylish finish late in the match, marking his first goal for Barcelona. 
    Barca Blaugranes
    What This Means
    With this result, Barcelona extends its lead to four points at the top of La Liga, keeping pressure on rivals like Real Madrid as the title race intensifies. 

    Coach Hansi Flick’s squad showed depth and tactical control despite missing key players due to injury, with strong performances across the pitch. 

    Up Next
    Barcelona’s focus now shifts to upcoming league fixtures and the Copa del Rey semifinal, where they will face Atletico Madrid in a crucial matchup later this month.`,
    featuredImage: "https://nation-style.onrender.com/uploads/articles/3-0.jpeg",
    category: sportsCategory._id,
    author: akinsolaFemi._id,
    tags: ["sports", "entertainment",],
    isTopStory: true,
    published: true,
    readTime: 5,
    views: 1420,
  },
]);
    console.log(`✅ Created ${articles.length} articles`);

    console.log("\n🎉 Database seeded successfully!");
    console.log("\n📊 Summary:");
    console.log(`   - Categories: ${categories.length}`);
    console.log(`   - Authors: ${authors.length}`);
    console.log(`   - Articles: ${articles.length}`);
    console.log(`   - Admin: ${adminUser.email} / admin123`);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    await mongoose.connection.close();
    console.log("\n👋 Database connection closed");
  }
};

// Run the seed
connectDB().then(seedDatabase);
