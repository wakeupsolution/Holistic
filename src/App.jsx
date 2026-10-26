import React, { useState, useEffect } from "react";

const reels = [
  { id: "DewWA4zThDg" },
  { id: "DejSSAxTaPB" },
  { id: "DeOuQGYT1WF" },
  { id: "DeMOafOzjq-" },
  { id: "DeHSkisTH_m" },
  { id: "DdvrddhTRcI" },
];

const reviews = [
  {
    name: "Vignesh S",
    role: "Data Analyst - Bangalore",
    text: "Overcame my money blocks and transformed my financial situation. I'm now on a path of true abundance that I never thought possible.",
  },
  {
    name: "Ananya Singh",
    role: "Software Engineer - Delhi",
    text: "A game-changer for my relationships. The deep insights into self-love have brought remarkable harmony to my personal and professional life.",
  },
  {
    name: "Vinodhini Shivam",
    role: "Research Analyst, USA",
    text: "Gayathri’s empowering teachings helped me break free from financial anxiety. The manifestation techniques are truly life-altering.",
  },
  {
    name: "Nivedita Rao",
    role: "Tarot Reader - Bangalore",
    text: "A revelation for my mind-body connection. The healing techniques brought a significant improvement to my physical and mental well-being.",
  },
  {
    name: "Karthikeyan Ravi",
    role: "Associate Manager - Coimbatore",
    text: "A brilliant toolkit for inner peace. Reprogramming my subconscious mind has allowed me to navigate life with profound calm.",
  },
  {
    name: "Divya Ravichandran",
    role: "Fashion Designer - Chennai",
    text: "I was stuck in self-doubt. This provided a roadmap for self-discovery, empowering me to finally live my true purpose.",
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

  // --- Auto-Slide Videos ---
  useEffect(() => {
    if (videoPaused) return;
    const timer = setInterval(() => {
      setVideoIndex((current) => (current >= videoMaxIndex ? 0 : current + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [videoPaused, videoMaxIndex]);

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
        className={`fixed top-0 left-0 right-0 z-50 h-22 px-6 md:px-12 flex justify-between items-center transition-all duration-300 ${
          isScrolled
            ? "bg-white shadow-md border-b-0 text-[#2A1625]"
            : "bg-transparent border-b border-white/10 text-white"
        }`}
      >
        <div className="relative h-full w-40 shrink-0">
          <img
            src={isScrolled ? "/colorlogo.png" : "/whitelogo.png"}
            alt="Heal and Manifest Logo"
            className="absolute left-0 top-1/2 -translate-y-1/2 w-[230px] h-[85px] max-w-none object-contain object-left transition-opacity duration-300"
          />
        </div>

        <div className="hidden md:flex items-center gap-5 text-sm font-medium">
          <span
            className={
              isScrolled ? "text-[#71656D]" : "text-white/90 tracking-wide"
            }
          >
            ⚡ Live 2-Hour Masterclass
          </span>
          <a
            href="#register"
            className={`px-6 py-2 rounded-full transition-all font-semibold ${
              isScrolled
                ? "bg-[#9E4770] text-white hover:bg-[#803458]"
                : "bg-transparent text-white hover:bg-white/10 border border-white/70"
            }`}
          >
            Book for ₹99
          </a>
        </div>
      </header>

      {/* SECTION 1: FULL WIDTH LEFT-ALIGNED HERO BANNER */}
      <section className="relative min-h-[90vh] md:min-h-screen flex flex-col justify-end md:justify-center pt-24 pb-8 md:pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/mobilebaner.png"
            alt="Mobile Background"
            className="w-full h-full object-cover md:hidden"
          />
          <img
            src="/dektopbaner.png"
            alt="Desktop Background"
            className="w-full h-full object-cover hidden md:block"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent md:bg-gradient-to-r md:from-black/90 md:via-black/50 md:to-transparent"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-12 flex flex-col items-start mt-auto md:mt-0">
          <div className="w-full max-w-2xl text-left space-y-5 md:space-y-6 bg-black/20 backdrop-blur-xl border border-white/10 p-6 md:p-0 rounded-3xl md:bg-transparent md:backdrop-blur-none md:border-none md:rounded-none shadow-2xl md:shadow-none">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase bg-transparent text-white border border-white/30 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-[#F3C973]"></span>
              Subconscious Healing
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight">
              Rewire Your Mind. <br />
              <span className="text-[#F3C973] font-medium">Manifest Abundance.</span>
            </h1>

            <p className="text-base md:text-xl text-white/80 leading-relaxed font-light">
              Break free from unconscious blocks and self-sabotage. Learn proven frameworks to step into your highest potential.
            </p>

            <div className="pt-2 md:pt-4 w-full sm:w-auto">
              <a
                href="#register"
                className="inline-flex justify-center items-center px-10 py-4 bg-transparent hover:bg-white/10 text-white font-semibold rounded-full transition-all text-lg w-full sm:w-auto transform hover:-translate-y-1 border-2 border-white backdrop-blur-sm"
              >
                Claim Your Seat for ₹99 ↗
              </a>
            </div>

            <div className="flex justify-between md:justify-start items-center md:gap-12 pt-6 mt-4 border-t border-white/20 text-white">
              <div className="flex flex-col">
                <AnimatedNumber value="1.5" suffix="M+" isFloat={true} />
                <span className="text-[10px] md:text-sm font-light text-white/70 uppercase tracking-widest mt-1">
                  Followers
                </span>
              </div>
              <div className="flex flex-col">
                <AnimatedNumber value="10" suffix="+" isFloat={false} />
                <span className="text-[10px] md:text-sm font-light text-white/70 uppercase tracking-widest mt-1">
                  Years Exp.
                </span>
              </div>
              <div className="flex flex-col">
                <AnimatedNumber value="30000" suffix="+" isFloat={false} />
                <span className="text-[10px] md:text-sm font-light text-white/70 uppercase tracking-widest mt-1">
                  Transformed
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: PROFILE & CREDIBILITY */}
      <section className="relative py-20 md:py-32 bg-[#FAF6F0] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#2A1625_2px,transparent_2px)] [background-size:24px_24px]"></div>
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-[#9E4770]/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="flex justify-center lg:justify-end relative group">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#9E4770]/10 to-transparent rounded-[4rem] transform -rotate-2 scale-105 transition-transform duration-700 group-hover:rotate-0"></div>
            <img
              src="/person.png"
              alt="Mentor Gayathri"
              className="w-full max-w-xl lg:max-w-2xl object-contain drop-shadow-[0_30px_40px_rgba(42,22,37,0.2)] relative z-10 transition-transform duration-700 hover:scale-[1.03]"
            />
          </div>

          <div className="space-y-8 flex flex-col items-start max-w-2xl">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="h-[2px] w-10 bg-[#9E4770]"></span>
                <span className="text-sm uppercase tracking-[0.2em] text-[#9E4770] font-bold">
                  Meet Your Coach
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl font-bold text-[#2A1625] tracking-tight leading-tight">
                Holistic Therapist Gayathri
              </h2>
            </div>

            <div className="text-[#71656D] leading-relaxed text-lg md:text-xl space-y-6 font-light">
              <p className="font-medium text-[#2A1625] text-xl md:text-2xl">
                A certified healing & manifestation coach with over 10 years of experience rewiring subconscious patterns.
              </p>
              <p>
                Mentored by global leaders like Tony Robbins, Jack Canfield, and Marisa Peer, Gayathri has empowered{" "}
                <strong className="font-semibold text-[#2A1625]">30,000+ individuals</strong> to overcome deep-rooted traumas and wealth blocks.
              </p>
              <p>
                Today, she guides a community of{" "}
                <strong className="font-semibold text-[#2A1625]">1.5M+ followers</strong>, on a mission to help 10 Million people step into absolute abundance.
              </p>
            </div>

            <div className="pt-6 w-full sm:w-auto relative">
              <div className="absolute inset-0 bg-[#9E4770] rounded-full blur animate-pulse opacity-60"></div>
              <a
                href="#register"
                className="relative inline-flex justify-center items-center px-12 py-5 bg-[#2A1625] hover:bg-[#9E4770] text-white font-semibold tracking-wide rounded-full shadow-2xl transition-all duration-300 text-lg md:text-xl w-full sm:w-auto transform hover:-translate-y-1 group"
              >
                Claim Your Seat for ₹99
                <span className="ml-3 group-hover:translate-x-2 transition-transform">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: CORE SERVICES */}
      <section className="relative py-20 md:py-32 bg-[#FAF6F0] overflow-hidden px-5">
        <style>
          {`
            @keyframes slideInLeft {
              0% { opacity: 0; transform: translateX(-60px); }
              100% { opacity: 1; transform: translateX(0); }
            }
            .animate-slide-left {
              opacity: 0;
              animation: slideInLeft 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
            }
          `}
        </style>

        <div className="max-w-[1400px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm uppercase tracking-[0.2em] text-[#9E4770] font-bold">
              Transformation Areas
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#2A1625] mt-4 tracking-tight">
              What You Will Master
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
            {[
              {
                id: "01",
                title: "Subconscious Healing",
                desc: "Release suppressed emotions and past trauma holding you back.",
                img: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=1000&q=80",
              },
              {
                id: "02",
                title: "Wealth Manifestation",
                desc: "Eliminate money blocks and attract high-income opportunities.",
                img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1000&q=80",
              },
              {
                id: "03",
                title: "Emotional Harmony",
                desc: "Heal attachment wounds and build deep emotional security.",
                img: "https://img.magnific.com/free-photo/two-cheerful-sisters-lying-grass_158595-1545.jpg?semt=ais_hybrid&w=740&q=80",
              },
              {
                id: "04",
                title: "Spiritual Alignment",
                desc: "Restore inner balance and connect with your highest self.",
                img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1000&q=80",
              },
            ].map((service, idx) => (
              <div
                key={idx}
                className="animate-slide-left relative w-full h-[400px] md:h-[450px] rounded-[2rem] overflow-hidden group shadow-2xl"
                style={{ animationDelay: `${idx * 0.2}s` }}
              >
                <img
                  src={service.img}
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2A1625] via-[#2A1625]/60 to-transparent opacity-90"></div>
                <div className="relative z-10 flex flex-col justify-between h-full p-8 md:p-10">
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center text-[#F3C973] font-bold text-xl border border-white/20">
                    {service.id}
                  </div>
                  <div className="flex flex-col items-start">
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
                      {service.title}
                    </h3>
                    <p className="text-white/80 font-light text-base md:text-lg mb-6 max-w-sm leading-relaxed">
                      {service.desc}
                    </p>
                    <a
                      href="#register"
                      className="inline-flex items-center justify-center px-8 py-3.5 bg-[#F3C973] hover:bg-white text-[#2A1625] font-bold rounded-full transition-all duration-300 text-sm md:text-base transform group-hover:-translate-y-1 shadow-[0_10px_20px_rgba(243,201,115,0.2)]"
                    >
                      Book for ₹99 <span className="ml-2 font-normal">→</span>
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
                    ></iframe>
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
              Real Stories
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#2A1625] mt-4 tracking-tight">
              Lives Transformed
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
        Your Transformation Starts Here
      </span>

      <h2 className="mx-auto max-w-3xl font-serif text-3xl font-bold leading-tight text-[#2A1625] sm:text-4xl md:text-5xl">
        Invest in Yourself.
        <span className="mt-2 block italic text-[#9E4770]">
          Transform Your Inner World.
        </span>
      </h2>

      <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#2A1625]/65 md:text-base">
        Take the first step toward greater self-awareness with a guided
        subconscious healing and manifestation experience.
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
            Limited Seats Available
          </div>

          <h3 className="font-serif text-3xl font-bold leading-tight text-[#2A1625] sm:text-4xl">
            Subconscious Healing
            <span className="block text-[#9E4770]">
              & Manifestation
            </span>
            Masterclass
          </h3>

          <p className="mt-5 max-w-lg text-sm leading-7 text-[#2A1625]/65">
            Discover guided practices designed to help you explore your
            subconscious patterns, develop self-awareness, and create
            more intentional habits.
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
                  2-Hour Live Workshop
                </h4>
                <p className="mt-1 text-sm leading-6 text-[#2A1625]/60">
                  An interactive session to explore your inner patterns.
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
                  Subconscious Rewiring Worksheet
                </h4>
                <p className="mt-1 text-sm leading-6 text-[#2A1625]/60">
                  A step-by-step worksheet for personal reflection.
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
                  Guided Healing & Alignment Audio
                </h4>
                <p className="mt-1 text-sm leading-6 text-[#2A1625]/60">
                  A guided audio experience for reflection and relaxation.
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
                  Live Q&A Session
                </h4>
                <p className="mt-1 text-sm leading-6 text-[#2A1625]/60">
                  Ask questions and participate in the discussion.
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
              A guided experience for personal growth and self-reflection.
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
              Exclusive Workshop Offer
            </span>

            <p className="mt-8 text-sm font-medium text-white/65">
              Your Entry Pass
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
              Get access to the masterclass and all the listed resources
              for just ₹99.
            </p>

            {/* CTA Button */}
            <a
              href="/register"
              className="group mt-8 flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#F3C973] to-[#E7B84F] px-5 py-4 text-sm font-extrabold text-[#2A1625] shadow-[0_8px_30px_rgba(243,201,115,0.2)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_35px_rgba(243,201,115,0.35)] focus:outline-none focus:ring-4 focus:ring-[#F3C973]/40"
            >
              Reserve My Seat

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
                One small step toward a more intentional you.
              </p>

              <p className="mt-2 font-serif text-sm italic text-[#F3C973]">
                Your journey begins within.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>

    {/* Bottom Trust Points */}
    <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-medium text-[#2A1625]/60">
      <span className="flex items-center gap-2">
        <span className="text-[#9E4770]">✦</span>
        Interactive Learning
      </span>

      <span className="flex items-center gap-2">
        <span className="text-[#9E4770]">✦</span>
        Guided Exercises
      </span>

      <span className="flex items-center gap-2">
        <span className="text-[#9E4770]">✦</span>
        Personal Reflection
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
          src="/whitelogo.png" 
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