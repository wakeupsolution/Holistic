import React, { useState, useEffect } from "react";


const reels = [
  { id: "DdbdcfXx_mx" },
  { id: "Dc8i6hfRtQs" },
  { id: "DctGpU-RFgU" },
  { id: "De_2muTRNBL" },
  { id: "Dd6WI3bxALo" },
  { id: "Ddyna9NxLKY" },
  { id: "Ddq6CT4xdQF" },
  { id: "DdMDqLYRpL6" },
];



const reviews = [
  {
    text: "We love each other, but sometimes we hurt each other without understanding why. Could understanding our emotions change everything?",
    name: "For Couples",
    role: "Understand Each Other Better",
  },
  {
    text: "Marriage brings love, but also challenges. Learning to communicate can help couples feel heard, valued, and connected.",
    name: "For Married Partners",
    role: "Build a Stronger Bond",
  },
  {
    text: "Why do the same arguments keep coming back? Understanding our patterns is the first step toward healthier conversations.",
    name: "For Every Relationship",
    role: "Break Repeating Patterns",
  },
  {
    text: "A lasting relationship isn't about never disagreeing. It's about listening, understanding, and choosing to grow together.",
    name: "For Lasting Love",
    role: "Create Deeper Connections",
  },
];


// --- Smooth Counter Component ---
const AnimatedNumber = ({ value, suffix, isFloat }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const end = parseFloat(value);
    const duration = 2000; // 2 seconds animation
    const startTime = performance.now();

    const updateCount = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth easing function (ease-out)
      const ease = 1 - Math.pow(1 - progress, 4);
      const current = end * ease;

      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(updateCount);
  }, [value]);

  return (
    <span className="font-bold text-2xl md:text-3xl text-[#F3C973]">
      {isFloat ? count.toFixed(1) : Math.floor(count).toLocaleString()}
      {suffix}
    </span>
  );
};

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  // --- 1. Separate Video (Reels) State ---
  const [videoIndex, setVideoIndex] = useState(0);
  const [videoPaused, setVideoPaused] = useState(false);
  const [videoSlidesToShow, setVideoSlidesToShow] = useState(4);

  // --- 2. Separate Reviews State ---
  const [reviewIndex, setReviewIndex] = useState(0);
  const [reviewPaused, setReviewPaused] = useState(false);
  const [reviewSlidesToShow, setReviewSlidesToShow] = useState(3);

  // --- Scroll Listener for Header ---
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- Responsive Slides Logic ---
  useEffect(() => {
    const updateSlides = () => {
      if (window.innerWidth < 768) {
        setVideoSlidesToShow(1);
        setReviewSlidesToShow(1);
      } else if (window.innerWidth < 1024) {
        setVideoSlidesToShow(2);
        setReviewSlidesToShow(2);
      } else {
        setVideoSlidesToShow(4); // 4 cards for videos on desktop
        setReviewSlidesToShow(3); // 3 cards for reviews on desktop
      }
    };
    updateSlides();
    window.addEventListener("resize", updateSlides);
    return () => window.removeEventListener("resize", updateSlides);
  }, []);

  // Max Indexes
  const videoMaxIndex = Math.max(0, reels.length - videoSlidesToShow);
  const reviewMaxIndex = Math.max(0, reviews.length - reviewSlidesToShow);



  // --- Auto-Slide Reviews ---
  useEffect(() => {
    if (reviewPaused) return;
    const timer = setInterval(() => {
      setReviewIndex((current) => (current >= reviewMaxIndex ? 0 : current + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [reviewPaused, reviewMaxIndex]);

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#241E22] antialiased">
  
{/* HEADER */}
<header
  className={`fixed top-0 left-0 right-0 z-50 h-20 px-5 md:px-12
  flex justify-between items-center transition-all duration-300 ${
    isScrolled
      ? "bg-white shadow-md text-[#2a16254e]"
      : "bg-transparent text-white"
  }`}
>
  <div className="relative h-full w-40 md:w-48 shrink-0">
    <img
      src={isScrolled ? "/colorlogo.png" : "/whitecolor.png"}
      alt="Heal and Manifest Logo"
      className="absolute left-0 top-1/2 -translate-y-1/2
      w-[250px] md:w-[300px] h-auto max-w-none
      object-contain object-left transition-all duration-300"
    />
  </div>

  <div className="hidden md:flex items-center gap-5 text-sm font-medium">
    <span
      className={
        isScrolled
          ? "text-[#71656D]"
          : "text-white/90 tracking-wide"
      }
    >
      ❤️ Live Relationship Webinar
    </span>

    <a
      href="#register"
      className="px-6 py-3 rounded-full bg-[#9E4770]
      text-white font-semibold hover:bg-[#803458]
      transition-all duration-300 shadow-lg"
    >
      Join Now – ₹99
    </a>
  </div>
</header>



{/* HERO SECTION */}
<section
  className="relative isolate w-full min-h-screen
    flex items-center overflow-hidden
    bg-[#080504] pt-24 pb-10
    sm:pt-28 md:pt-24 md:pb-12"
>
  {/* BACKGROUND IMAGE */}
  <div className="absolute inset-0 -z-20 overflow-hidden">

    {/* Desktop Background */}
    <img
      src="/dektopbaner.png"
      alt=""
      aria-hidden="true"
      className="hidden md:block absolute inset-0
        w-full h-full object-contain object-right"
    />

    {/* Mobile Background */}
    <img
      src="/mobilebaner.png"
      alt=""
      aria-hidden="true"
      className="md:hidden absolute inset-0
        w-full h-full object-cover object-center"
    />

  </div>


  {/* DESKTOP OVERLAY */}
  <div
    className="absolute inset-0 -z-10
      bg-gradient-to-r
      from-black/95 via-black/65 to-black/10
      md:block hidden"
  />

  {/* MOBILE OVERLAY */}
  <div
    className="absolute inset-0 -z-10
      bg-gradient-to-b
      from-black/50 via-black/65 to-black/95
      md:hidden"
  />


  {/* HERO CONTENT WRAPPER */}
  <div
    className="relative z-10 w-full
      max-w-[1440px] mx-auto
      px-4 sm:px-8 lg:px-12 xl:px-16"
  >
    <div
      className="w-full max-w-[760px]
        text-left space-y-5
        sm:space-y-6 md:space-y-7
        py-5 md:py-8"
    >

      {/* CATEGORY */}
      <div
        className="inline-flex max-w-full
          items-center gap-2
          px-3 sm:px-4 py-2
          rounded-full
          bg-white/10 border border-white/20
          backdrop-blur-md"
      >
        <span
          className="w-2 h-2 rounded-full
            bg-[#F3C973] shrink-0"
        />

        <span
          className="text-[9px] sm:text-xs
            font-semibold tracking-[0.12em]
            sm:tracking-[0.16em]
            uppercase text-white"
        >
          Relationship & Emotional Intelligence
        </span>
      </div>


      {/* WEBINAR LABEL */}
      <div
        className="flex items-center gap-2
          text-[#F3C973]
          text-sm sm:text-base font-semibold"
      >
        <span className="text-xl">❤️</span>
        <span>LIVE ONLINE WEBINAR</span>
      </div>


      {/* MAIN HEADING */}
      <h1
        className="text-[36px] leading-[1.12]
          sm:text-5xl
          md:text-5xl
          lg:text-6xl
          xl:text-7xl
          font-bold text-white tracking-tight"
      >
        Why Do We Hurt

        <span
          className="block text-[#F3C973]
            font-medium mt-2"
        >
          the People We Love?
        </span>
      </h1>


      {/* DESCRIPTION */}
      <p
        className="text-sm sm:text-base
          md:text-lg lg:text-xl
          text-white/90 leading-relaxed
          max-w-[650px] font-light"
      >
        Do the same arguments keep happening?
        Do emotions take over before you can explain
        yourself? Discover why it happens and learn
        how to communicate better, understand your
        emotions, and build healthier relationships.
      </p>


      {/* BENEFITS */}
      <div
        className="grid grid-cols-1
          sm:grid-cols-2
          gap-x-6 gap-y-3
          pt-1 max-w-[650px]
          text-sm sm:text-base
          text-white/95"
      >

        {[
          "Understand Your Emotions",
          "Improve Communication",
          "Break Repeating Patterns",
          "Build Stronger Connections",
        ].map((benefit) => (
          <div
            key={benefit}
            className="flex items-center gap-3 min-w-0"
          >
            <span
              className="flex items-center justify-center
                w-7 h-7 rounded-full
                bg-[#F3C973]/20
                text-[#F3C973] shrink-0"
            >
              ✓
            </span>

            <span>{benefit}</span>
          </div>
        ))}

      </div>


      {/* SPECIAL OFFER CARD */}
      <div
        className="relative w-full max-w-[440px]
          mt-5 rounded-2xl
          border border-[#F3C973]/50
          bg-black/55 backdrop-blur-md
          p-4 sm:p-5 overflow-hidden"
      >
        {/* OFFER BADGE */}
        <div
          className="absolute top-0 right-0
            bg-[#F3C973] text-[#2A1625]
            text-[10px] sm:text-xs
            font-extrabold px-3 sm:px-4 py-2
            rounded-bl-xl tracking-wide"
        >
          SPECIAL OFFER
        </div>

        <p className="text-white/80 text-xs sm:text-sm mb-2 pr-24">
          Get this valuable webinar at an exclusive price
        </p>

        <div className="flex items-center gap-3 flex-wrap">
          <span
            className="text-white/60
              line-through text-lg sm:text-2xl"
          >
            ₹3,000
          </span>

          <span
            className="text-[#F3C973]
              text-4xl sm:text-5xl font-extrabold"
          >
            ₹99
          </span>

          <span className="text-white text-sm font-semibold">
            ONLY
          </span>
        </div>

        <p className="text-green-300 text-xs sm:text-sm font-semibold mt-2">
          Save ₹2,901 on your webinar registration!
        </p>
      </div>


      {/* CTA BUTTON */}
      <div className="pt-1 w-full sm:w-auto">

        <a
          href="#register"
          className="group inline-flex items-center
            justify-center gap-3
            w-full sm:w-auto
            px-6 sm:px-8 lg:px-10
            py-4 bg-[#9E4770]
            hover:bg-[#803458]
            text-white font-bold
            text-sm sm:text-base lg:text-lg
            rounded-full transition-all duration-300
            shadow-xl hover:-translate-y-1"
        >
          Reserve Your Seat for ₹99

          <span
            className="text-xl
              group-hover:translate-x-1
              transition-transform duration-300"
          >
            →
          </span>
        </a>

        <p
          className="text-white/70 text-xs
            mt-3 leading-relaxed
            text-left max-w-[440px]"
        >
          An opportunity to understand yourself
          and connect better with the people you love.
        </p>

      </div>

    </div>
  </div>
</section>



 {/* SECTION 2: PROFILE & WEBINAR OFFER */}
<section className="relative overflow-hidden bg-[#FAF6F0] px-5 py-12 md:px-8 md:py-16">

  {/* Background Pattern */}
  <div
    className="absolute inset-0 pointer-events-none opacity-[0.035]"
    style={{
      backgroundImage:
        "radial-gradient(#9E4770 1px, transparent 1px)",
      backgroundSize: "22px 22px",
    }}
  />

  {/* Background Glow */}
  <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-[#9E4770]/10 blur-[100px]" />
  <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-[#9E4770]/10 blur-[100px]" />

  <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-stretch gap-8 lg:grid-cols-2 lg:gap-12">

    {/* LEFT: PROFILE IMAGE */}
    <div className="relative min-h-[420px] overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-[#F0DDE5] via-[#F8EDEB] to-[#E8CFDA] sm:min-h-[480px] lg:min-h-0">

      {/* Decorative Circle */}
      <div className="absolute -right-10 top-10 h-52 w-52 rounded-full border border-[#9E4770]/20" />

      <div className="absolute bottom-12 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-white/40 blur-3xl" />

      {/* Profile Image */}
      {/* Profile Image */}
<img
  src="/person.png"
  alt="Kavitha Ganeshraja"
  className="absolute inset-x-0 bottom-[73px] h-[95%] w-full object-contain object-bottom p-0 transition-transform duration-500 hover:scale-[1.02]"
/>

      {/* Bottom Profile Badge */}
      <div className="absolute bottom-5 left-5 right-5 rounded-xl border border-white/70 bg-white/90 p-4 shadow-lg backdrop-blur-sm sm:bottom-6 sm:left-6 sm:right-6">

        <p className="text-base font-bold text-[#2A1625]">
          Kavitha Ganeshraja
        </p>

        <p className="mt-1 text-xs text-[#71656D] sm:text-sm">
          Relationship & Emotional Intelligence Expert
        </p>

      </div>

    </div>

    {/* RIGHT: CONTENT & OFFER */}
    <div className="flex flex-col justify-center rounded-[1.75rem] border border-[#9E4770]/10 bg-white/60 p-5 sm:p-7 lg:p-8">

      {/* Section Label */}
      <div className="mb-4 flex items-center gap-3">
        <span className="h-[2px] w-8 bg-[#9E4770]" />

        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#9E4770] sm:text-xs">
          Meet Your Guide
        </span>
      </div>

      {/* Heading */}
      <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-[#2A1625] sm:text-4xl">
        Understand Your Emotions.
        <span className="mt-1 block text-[#9E4770]">
          Build Stronger Relationships.
        </span>
      </h2>

      {/* Description */}
      <p className="mt-4 text-sm leading-6 text-[#71656D] sm:text-base">
        Discover how emotional intelligence can help you understand yourself,
        communicate better, and build healthier relationships.
      </p>

      {/* Offer Card */}
      <div className="mt-6 rounded-2xl border border-[#9E4770]/15 bg-white p-5 shadow-[0_12px_35px_rgba(42,22,37,0.06)] sm:p-6">

        {/* Offer Label */}
        <div className="inline-flex items-center gap-2 rounded-full bg-[#F7EAF0] px-3 py-2">

          <span className="text-sm">✦</span>

          <span className="text-[10px] font-bold uppercase tracking-wider text-[#9E4770] sm:text-xs">
            Exclusive Webinar Offer
          </span>

        </div>

        {/* Price */}
        <div className="mt-5 flex flex-wrap items-baseline gap-3">

          <span className="text-base text-[#A59AA1] line-through sm:text-lg">
            ₹3,000
          </span>

          <span className="text-4xl font-extrabold tracking-tight text-[#9E4770] sm:text-5xl">
            ₹99
          </span>

          <span className="text-sm font-bold uppercase text-[#2A1625]">
            Only
          </span>

        </div>

        {/* Savings */}
        <div className="mt-4 flex items-center gap-3 rounded-xl bg-[#2A1625] p-3 text-white">

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-xl">
            🎉
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-wider text-white/65">
              Special Savings
            </p>

            <p className="mt-1 text-base font-bold">
              Save ₹2,901
              <span className="ml-2 text-xs font-semibold text-[#F3BBD1]">
                96.7% OFF
              </span>
            </p>
          </div>

        </div>

        {/* CTA Button */}
        <a
          href="#register"
          className="group mt-5 flex min-h-[50px] w-full items-center justify-center gap-2 rounded-full bg-[#9E4770] px-4 py-3 text-center text-sm font-bold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#2A1625] sm:text-base"
        >
          Join the Webinar for ₹99

          <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </a>

        {/* Footer */}
        <p className="mt-3 text-center text-xs text-[#8A7D85]">
          Your journey towards better relationships starts here.
        </p>

      </div>

    </div>

  </div>
</section>
     
{/* SECTION 3: CORE SERVICES */}
<section className="relative py-20 md:py-32 bg-[#FAF6F0] overflow-hidden px-5">
  <style>
    {`
      @keyframes slideInLeft {
        0% {
          opacity: 0;
          transform: translateX(-60px);
        }
        100% {
          opacity: 1;
          transform: translateX(0);
        }
      }

      .animate-slide-left {
        opacity: 0;
        animation: slideInLeft 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
      }

      @media (prefers-reduced-motion: reduce) {
        .animate-slide-left {
          opacity: 1;
          animation: none;
        }
      }
    `}
  </style>

  <div className="max-w-[1400px] mx-auto">

    {/* SECTION HEADING */}
    <div className="text-center max-w-3xl mx-auto mb-16">
      <span className="text-sm uppercase tracking-[0.2em] text-[#9E4770] font-bold">
        WHAT YOU'LL DISCOVER
      </span>

      <h2 className="text-4xl md:text-5xl font-bold text-[#2A1625] mt-4 tracking-tight">
        Build Stronger, Healthier Relationships
      </h2>
    </div>

    {/* CORE SERVICES */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">

      {[
        {
          id: "01",
          category: "EMOTIONAL TRIGGERS",
          title: "Why Small Moments Can Trigger Big Reactions",
          desc: "Understand the hidden emotions behind unexpected reactions and discover why seemingly small moments can create intense feelings in relationships.",
          img: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1000&q=80",
        },
        {
          id: "02",
          category: "CHILDHOOD PATTERNS",
          title: "What We Carry Into Adult Relationships",
          desc: "Explore how childhood experiences, emotional needs, and learned behaviours influence the way we connect with our partners.",
          img: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1000&q=80",
        },
        {
          id: "03",
          category: "COMMUNICATION",
          title: "How Conversations Turn Into Conflict",
          desc: "Recognise communication patterns that lead to misunderstandings and learn how empathy and listening can transform difficult conversations.",
          img: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=1000&q=80",
        },
        {
          id: "04",
          category: "EMOTIONAL AWARENESS",
          title: "What You and Your Partner May Need",
          desc: "Discover the emotional needs that often go unspoken and learn how awareness, understanding, and connection can strengthen your relationship.",
          img: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1000&q=80",
        },
      ].map((service, idx) => (
        <div
          key={service.id}
          className="animate-slide-left relative w-full h-[420px] md:h-[450px] rounded-[2rem] overflow-hidden group shadow-2xl"
          style={{ animationDelay: `${idx * 0.2}s` }}
        >
          {/* BACKGROUND IMAGE */}
          <img
            src={service.img}
            alt={service.title}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />

          {/* IMAGE OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#2A1625] via-[#2A1625]/70 to-[#2A1625]/10 opacity-95" />

          {/* CARD CONTENT */}
          <div className="relative z-10 flex flex-col justify-between h-full p-7 md:p-10">

            {/* NUMBER */}
            <div className="flex items-start justify-between gap-4">
              <div className="w-12 h-12 shrink-0 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center text-[#F3C973] font-bold text-xl border border-white/20">
                {service.id}
              </div>

              <span className="text-white/90 text-[10px] md:text-xs font-bold tracking-[0.18em] border border-white/30 rounded-full px-4 py-2 bg-white/10 backdrop-blur-sm">
                {service.category}
              </span>
            </div>

            {/* TEXT AND BUTTON */}
            <div className="flex flex-col items-start">

              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 tracking-tight leading-tight max-w-xl">
                {service.title}
              </h3>

              <p className="text-white/85 font-light text-sm md:text-base mb-6 max-w-lg leading-relaxed">
                {service.desc}
              </p>

              <a
                href="#register"
                className="inline-flex items-center justify-center px-7 py-3.5 bg-[#F3C973] hover:bg-white text-[#2A1625] font-bold rounded-full transition-all duration-300 text-sm md:text-base transform group-hover:-translate-y-1 shadow-[0_10px_20px_rgba(243,201,115,0.2)]"
              >
                Book for ₹99
                <span className="ml-2 font-normal">→</span>
              </a>

            </div>
          </div>
        </div>
      ))}

    </div>
  </div>
</section>



      {/* SECTION 4: REELS CAROUSEL */}
      <section className="border-b border-[#2A1625]/10 bg-white px-5 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#9E4770]">
                Free Daily Wisdom
              </span>
              <h2 className="mt-2 font-serif text-3xl font-bold text-[#2A1625] md:text-4xl">
                Trending on Instagram
              </h2>
              <p className="mt-3 text-sm text-[#71656D]">
                Discover daily inspiration, healing, and positive transformation.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setVideoIndex((c) => (c <= 0 ? videoMaxIndex : c - 1))}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#9E4770]/30 text-xl text-[#9E4770] transition hover:bg-[#9E4770] hover:text-white"
              >
                &#8592;
              </button>
              <button
                type="button"
                onClick={() => setVideoIndex((c) => (c >= videoMaxIndex ? 0 : c + 1))}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#9E4770]/30 text-xl text-[#9E4770] transition hover:bg-[#9E4770] hover:text-white"
              >
                &#8594;
              </button>
            </div>
          </div>

          <div
            className="overflow-hidden"
            onMouseEnter={() => setVideoPaused(true)}
            onMouseLeave={() => setVideoPaused(false)}
          >
            <div
              className="flex transition-transform duration-700 ease-in-out py-4"
              style={{
                transform: `translateX(-${videoIndex * (100 / videoSlidesToShow)}%)`,
              }}
            >
              {reels.map((reel) => (
                <div
                  key={reel.id}
                  className="shrink-0 px-3"
                  style={{ flex: `0 0 ${100 / videoSlidesToShow}%` }}
                >
                  <div className="relative block h-[480px] md:h-[580px] overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-gray-200">
                  
                        <iframe
                          src={`https://www.instagram.com/reel/${reel.id}/embed`}
                          className="absolute top-0 left-0 w-full h-[calc(100%+140px)] border-0 pointer-events-auto"
                          frameBorder="0"
                          scrolling="no"
                          allowTransparency="true"
                          allow="encrypted-media"
                          title="Instagram Reel"
                        />


                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex justify-center gap-2">
            {Array.from({ length: videoMaxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setVideoIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  videoIndex === index ? "w-8 bg-[#9E4770]" : "w-2 bg-[#9E4770]/25"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: REVIEWS CAROUSEL */}
      <section className="relative py-20 md:py-32 bg-[#FAF6F0] overflow-hidden px-5 border-b border-[#2A1625]/10">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#9E4770_2px,transparent_2px)] [background-size:30px_30px]"></div>

        <div className="relative z-10 max-w-[1400px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm uppercase tracking-[0.2em] text-[#9E4770] font-bold">
             RELATIONSHIPS, REIMAGINED
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#2A1625] mt-4 tracking-tight">
              Every Relationship Has a Story
            </h2>
          </div>

          <div
            className="overflow-hidden"
            onMouseEnter={() => setReviewPaused(true)}
            onMouseLeave={() => setReviewPaused(false)}
          >
            <div
              className="flex transition-transform duration-700 ease-in-out py-4"
              style={{
                transform: `translateX(-${reviewIndex * (100 / reviewSlidesToShow)}%)`,
              }}
            >
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className="shrink-0 px-4"
                  style={{ flex: `0 0 ${100 / reviewSlidesToShow}%` }}
                >
                  <div className="bg-white rounded-[2rem] p-8 md:p-10 h-full flex flex-col justify-between shadow-[0_10px_40px_rgba(42,22,37,0.05)] border border-[#9E4770]/10 relative group transition-transform duration-500 hover:-translate-y-2">
                    <div className="absolute top-6 right-8 text-[#FAF6F0] transition-colors duration-500 group-hover:text-[#F3C973]/20">
                      <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    </div>

                    <p className="text-[#71656D] leading-relaxed text-lg md:text-xl font-light relative z-10 mb-10">
                      "{review.text}"
                    </p>

                    <div className="mt-auto pt-6 border-t border-[#2A1625]/5 relative z-10">
                      <h4 className="text-xl font-bold text-[#9E4770] mb-1">
                        {review.name}
                      </h4>
                      <p className="text-sm font-medium text-[#2A1625]/60 uppercase tracking-wide">
                        {review.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 flex justify-center items-center gap-4">
            <button
              onClick={() => setReviewIndex((c) => (c <= 0 ? reviewMaxIndex : c - 1))}
              className="h-10 w-10 flex items-center justify-center rounded-full bg-white text-[#9E4770] shadow-md hover:bg-[#9E4770] hover:text-white transition-colors border border-[#9E4770]/20"
            >
              &#8592;
            </button>

            <div className="flex gap-2">
              {Array.from({ length: reviewMaxIndex + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setReviewIndex(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    reviewIndex === index ? "w-8 bg-[#9E4770]" : "w-2.5 bg-[#9E4770]/20"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => setReviewIndex((c) => (c >= reviewMaxIndex ? 0 : c + 1))}
              className="h-10 w-10 flex items-center justify-center rounded-full bg-white text-[#9E4770] shadow-md hover:bg-[#9E4770] hover:text-white transition-colors border border-[#9E4770]/20"
            >
              &#8594;
            </button>
          </div>
        </div>
      </section>

  
{/* SECTION 6: PREMIUM MASTERCLASS CHECKOUT */}
<section
  id="register"
  className="relative overflow-hidden bg-[#FAF6F0] px-5 py-20 md:py-28"
>
  {/* Decorative Background Elements */}
  <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#9E4770]/10 blur-3xl" />
  <div className="absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-[#F3C973]/20 blur-3xl" />

  <div className="relative mx-auto max-w-6xl">

    {/* Section Heading */}
    <div className="mb-12 text-center">
      <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#9E4770]/20 bg-white px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#9E4770] shadow-sm">
        <span className="h-2 w-2 animate-pulse rounded-full bg-[#9E4770]" />
       Love Better. Connect Deeper.
      </span>

      <h2 className="mx-auto max-w-3xl font-serif text-3xl font-bold leading-tight text-[#2A1625] sm:text-4xl md:text-5xl">
           Why Do We Hurt
        <span className="mt-2 block italic text-[#9E4770]">
         The People We Love?
        </span>
      </h2>

      <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#2A1625]/65 md:text-base">
           Discover why love turns into conflict, why the same arguments repeat,
    and how to build stronger, healthier relationships.
      </p>
    </div>

    {/* Main Checkout Card */}
    <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[28px] border border-[#F3C973]/60 bg-white shadow-[0_25px_80px_rgba(42,22,37,0.12)]">

      {/* Top Gold Accent */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#9E4770] via-[#F3C973] to-[#9E4770]" />

      <div className="grid md:grid-cols-[1.25fr_0.75fr]">

        {/* LEFT: WORKSHOP DETAILS */}
        <div className="p-7 sm:p-10 md:p-12 lg:p-14">

          {/* Limited Seats Badge */}
          <div className="mb-7 inline-flex items-center gap-2 rounded-lg bg-[#F3C973]/20 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#7A4B18]">
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 7v5l3 2" />
            </svg>
           Your Journey to Better Relationships
          </div>

          <h3 className="font-serif text-3xl font-bold leading-tight text-[#2A1625] sm:text-4xl">
           Why Do We Hurt 
            <span className="block text-[#9E4770]">
              the People
            </span>
            We Love?
          </h3>

          <p className="mt-5 max-w-lg text-sm leading-7 text-[#2A1625]/65">
            Discover why couples fight, why love feels different after marriage, and how emotional understanding can bring partners closer.
          </p>

          {/* Workshop Features */}
          <div className="mt-9 space-y-5">

            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#9E4770]/10 text-[#9E4770]">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>
              </div>

              <div>
                <h4 className="font-bold text-[#2A1625]">
                   Why Couples Drift Apart
   
                </h4>
                <p className="mt-1 text-sm leading-6 text-[#2A1625]/60">
                  Understand what creates distance after marriage.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#9E4770]/10 text-[#9E4770]">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <path d="M8 4h8l4 4v12H4V4h4Z" />
                  <path d="M8 4v5h8V4M8 13h8M8 17h5" />
                </svg>
              </div>

              <div>
                <h4 className="font-bold text-[#2A1625]">
                  Love vs. Marriage
   

                </h4>
                <p className="mt-1 text-sm leading-6 text-[#2A1625]/60">
                  Discover why love alone may not be enough.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#9E4770]/10 text-[#9E4770]">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <path d="M12 3v18M8 7a4 4 0 0 1 8 0c0 2-2 3-4 5-2-2-4-3-4-5Z" />
                  <path d="M5 16c1 2 3 3 7 3s6-1 7-3" />
                </svg>
              </div>

              <div>
                <h4 className="font-bold text-[#2A1625]">
                Break the Cycle of Arguments
  
                </h4>
                <p className="mt-1 text-sm leading-6 text-[#2A1625]/60">
                  Recognize emotional triggers and repeated conflicts.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#9E4770]/10 text-[#9E4770]">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z" />
                </svg>
              </div>

              <div>
                <h4 className="font-bold text-[#2A1625]">
                Build Lasting Connections

                </h4>
                <p className="mt-1 text-sm leading-6 text-[#2A1625]/60">
                     Learn the value of trust, empathy, and communication.
                </p>
              </div>
            </div>

          </div>

          {/* Bottom Note */}
          <div className="mt-9 border-t border-[#2A1625]/10 pt-6">
            <p className="flex items-center gap-2 text-xs font-medium text-[#2A1625]/60">
              <svg
                className="h-4 w-4 text-[#9E4770]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="m5 12 4 4L19 6" />
              </svg>
             A 2-hour live webinar to understand relationships from a new perspective.
            </p>
          </div>
        </div>

        {/* RIGHT: PREMIUM PRICE CARD */}
        <div className="relative flex flex-col items-center justify-center overflow-hidden bg-[#2A1625] p-8 text-center text-white sm:p-10 md:p-9 lg:p-12">

          {/* Decorative Glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#9E4770]/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[#F3C973]/15 blur-3xl" />

          {/* Decorative Circles */}
          <div className="pointer-events-none absolute right-7 top-7 h-16 w-16 rounded-full border border-[#F3C973]/20" />
          <div className="pointer-events-none absolute right-11 top-11 h-8 w-8 rounded-full border border-[#F3C973]/30" />

          <div className="relative z-10 w-full">

            <span className="inline-flex items-center gap-2 rounded-full border border-[#F3C973]/30 bg-[#F3C973]/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#F3C973]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#F3C973]" />
              LIVE RELATIONSHIP WEBINAR
            </span>

            <p className="mt-8 text-sm font-medium text-white/65">
              Your Webinar Pass
            </p>

            {/* Price */}
            <div className="mt-3 flex items-center justify-center gap-3">
              <span className="font-serif text-6xl font-bold tracking-tight text-[#F3C973] sm:text-7xl">
                ₹99
              </span>

              <div className="text-left">
                <p className="text-sm text-white/45 line-through">
                  ₹1,999
                </p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-[#F3C973]">
                  Special Price
                </p>
              </div>
            </div>

            {/* Offer Highlight */}
            <div className="mx-auto mt-5 inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2.5">
              <svg
                className="h-4 w-4 text-[#F3C973]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z" />
              </svg>

              <span className="text-xs font-semibold text-white">
                Save ₹1,900
              </span>
            </div>

            <p className="mx-auto mt-5 max-w-xs text-sm leading-6 text-white/60">
             Discover why couples fight, why love changes after marriage, and how to build a deeper emotional connection—for just ₹99.
            </p>

            {/* CTA Button */}
            <a
              href="/register"
              className="group mt-8 flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#F3C973] to-[#E7B84F] px-5 py-4 text-sm font-extrabold text-[#2A1625] shadow-[0_8px_30px_rgba(243,201,115,0.2)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_35px_rgba(243,201,115,0.35)] focus:outline-none focus:ring-4 focus:ring-[#F3C973]/40"
            >
             Save My Seat for ₹99

              <svg
                className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>

            {/* Secure Payment */}
            <div className="mt-5 flex items-center justify-center gap-2 text-[11px] text-white/55">
              <svg
                className="h-4 w-4 text-[#F3C973]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <rect x="4" y="10" width="16" height="11" rx="2" />
                <path d="M8 10V7a4 4 0 0 1 8 0v3" />
              </svg>

              Secure Registration
            </div>

            {/* Offer Footer */}
            <div className="mt-8 border-t border-white/10 pt-6">
              <p className="text-xs leading-6 text-white/55">
              Understand each other. Communicate better. Grow together.
              </p>

              <p className="mt-2 font-serif text-sm italic text-[#F3C973]">
                Because love deserves understanding. </p>
            </div>

          </div>
        </div>
      </div>
    </div>

    {/* Bottom Trust Points */}
    <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-medium text-[#2A1625]/60">
      <span className="flex items-center gap-2">
        <span className="text-[#9E4770]">✦</span>
     Understand Your Partner
      </span>

      <span className="flex items-center gap-2">
        <span className="text-[#9E4770]">✦</span>
        Better Communication
      </span>

      <span className="flex items-center gap-2">
        <span className="text-[#9E4770]">✦</span>
         Deeper Emotional Connection
      </span>
    </div>

  </div>
</section>

{/* PREMIUM FOOTER */}
<footer className="relative overflow-hidden bg-[#402439] text-white">

  {/* Top Accent Line */}
  <div className="h-[2px] bg-gradient-to-r from-transparent via-[#F3C973] to-transparent" />

  <div className="mx-auto max-w-7xl px-6 py-10 md:px-10 md:py-12">

    {/* Main Footer Row */}
    <div className="flex flex-col items-center justify-between gap-8 text-center md:flex-row md:gap-6 md:text-left">

      {/* BRAND LOGO */}
      <a
        href="#"
        className="group flex items-center shrink-0"
        aria-label="Home"
      >
        <img 
          src="/whitecolor.png" 
          alt="Heal and Manifest Logo" 
          className="h-12 md:h-16 w-auto object-contain transition duration-300 group-hover:opacity-80"
        />
      </a>

      {/* COPYRIGHT & SOCKET DESIGN */}
      <div className="text-sm leading-6 flex flex-col items-center md:items-start">
        <p className="text-white/65">
          © {new Date().getFullYear()} Holistic Therapist Gayathri
        </p>
        <p className="text-white/45">
          All rights reserved.
        </p>
        <p className="mt-2 text-xs text-white/40">
          Designed by <a href="https://wakeupsolution.in/" className="font-semibold text-white/60 hover:text-[#F3C973] transition-colors">WakeUp Solution</a>
        </p>
      </div>

      {/* REGISTER BUTTON */}
      <a
        href="#register"
        className="group inline-flex items-center gap-3 rounded-full border border-[#F3C973]/50 bg-[#F3C973]/10 px-6 py-3 text-sm font-semibold text-[#F3C973] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#F3C973] hover:bg-[#F3C973] hover:text-[#402439] hover:shadow-lg hover:shadow-black/10"
      >
        Register for ₹99
        <svg
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M7 17 17 7M7 7h10v10" />
        </svg>
      </a>

    </div>

    {/* DIVIDER */}
    <div className="my-8 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent md:my-9" />

    {/* DISCLAIMER & BACK TO TOP */}
    <div className="flex flex-col items-center justify-between gap-3 text-center md:flex-row md:items-start md:text-left">

      <div className="flex max-w-4xl items-start gap-3">
        <svg
          className="mt-0.5 h-4 w-4 shrink-0 text-[#E8BFCB]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 11v5M12 7h.01" />
        </svg>
      </div>

      {/* BACK TO TOP */}
      <a
        href="#top"
        className="shrink-0 text-xs font-medium text-white/55 transition-colors hover:text-[#F3C973]"
      >
        Back to top ↑
      </a>

    </div>

  </div>
</footer>




      {/* MOBILE STICKY BOTTOM BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white p-4 border-t border-[#2A1625]/10 flex items-center justify-between md:hidden shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
        <div>
          <p className="text-[10px] font-bold text-[#71656D] uppercase tracking-wider">
            Live Masterclass
          </p>
          <p className="text-xl font-serif font-bold text-[#2A1625]">
            ₹99 <span className="text-sm line-through text-[#71656D] ml-1">₹1999</span>
          </p>
        </div>
        <a
          href="#register"
          className="px-6 py-3 bg-[#9E4770] text-white font-bold text-sm rounded-lg shadow-md"
        >
          Claim Seat ↗
        </a>
      </div>
    </div>
  );
}