import React, { useState, useEffect } from "react";
import WorkshopPopup from "./WorkshopPopup";

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

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";

    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);

    document.body.appendChild(script);
  });
};
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
  const [isPaying, setIsPaying] = useState(false);
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



  const handlePayment = async () => {
  if (isPaying) return;

  try {
    setIsPaying(true);

    // Load Razorpay checkout
    const loaded = await loadRazorpayScript();

    if (!loaded) {
      alert("Unable to load payment gateway");
      return;
    }

    // Create Razorpay order through VPS backend
    const orderResponse = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/payment/create-order`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: 1,
        }),
      }
    );

    const orderData = await orderResponse.json();

    if (!orderResponse.ok || !orderData.success) {
      throw new Error(orderData.message || "Order creation failed");
    }

    // Razorpay checkout options
    const options = {
      key: orderData.key,
      amount: orderData.amount,
      currency: "INR",
      name: "Kavitha Ganeshraja",
      description: "3-Hour Relationship Session",
      order_id: orderData.orderId,

      theme: {
        color: "#9E4770",
      },

      handler: async function (response) {
        try {
          // Verify payment through backend
          const verifyResponse = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/api/payment/verify`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            }
          );

          const verifyData = await verifyResponse.json();

          if (verifyResponse.ok && verifyData.success) {
            alert("Payment successful! Registration confirmed.");

            // TODO: Save registration details in your database.
            // Only mark the registration as paid after verification.

            window.location.href = "/success";
          } else {
            alert("Payment verification failed");
          }
        } catch (error) {
          console.error("Verification error:", error);
          alert("Unable to verify payment");
        } finally {
          setIsPaying(false);
        }
      },

      modal: {
        ondismiss: () => {
          setIsPaying(false);
        },
      },
    };

    const razorpay = new window.Razorpay(options);

    razorpay.on("payment.failed", (response) => {
      console.error(response.error);
      alert("Payment failed. Please try again.");
      setIsPaying(false);
    });

    razorpay.open();

  } catch (error) {
    console.error("Payment error:", error);
    alert(error.message || "Payment initialization failed");
    setIsPaying(false);
  }
};
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
  className={`fixed top-0 left-0 right-0 z-50
    h-[72px] md:h-[90px]
    px-4 sm:px-6 md:px-10 lg:px-16
    flex justify-between items-center gap-3
    transition-all duration-300
    ${
      isScrolled
        ? "bg-white shadow-md text-[#2A1625]"
        : "bg-transparent text-white"
    }`}
>

  {/* LOGO */}
  <div className="shrink-0 w-[165px] sm:w-[190px] md:w-[250px] lg:w-[290px]">
    <img
      src={isScrolled ? "/colorlogo.png" : "/whitecolor.png"}
      alt="Kavitha Ganeshraja Logo"
      className="w-full h-auto object-contain object-left
        transition-all duration-300"
    />
  </div>

  {/* RIGHT CONTENT */}
  <div className="flex items-center gap-2 sm:gap-4 md:gap-6 shrink-0">

    {/* SESSION TEXT */}
    <span
      className={`hidden lg:block text-sm xl:text-base font-medium whitespace-nowrap
        ${
          isScrolled
            ? "text-[#71656D]"
            : "text-white"
        }`}
    >
      ❤️ Live 3-Hour Relationship Session
    </span>

    {/* JOIN BUTTON */}
    <a
       onClick={handlePayment}
  disabled={isPaying}
      className="px-3.5 sm:px-5 md:px-7
        py-2.5 md:py-3
        rounded-full bg-[#9E4770]
        text-white
        text-[11px] sm:text-xs md:text-base
        font-semibold whitespace-nowrap
        hover:bg-[#803458]
        transition-all duration-300
        shadow-lg"
    >
     {isPaying ? "Processing..." : "  Join Now – ₹99"}
    </a>

  </div>

</header>





{/* HERO SECTION */}
<section
  className="relative isolate w-full
    min-h-[650px] lg:min-h-[720px]
    flex items-center overflow-hidden
    bg-[#080504]
    pt-28 pb-10
    md:pt-28 md:pb-12"
>

  {/* BACKGROUND IMAGE */}
  <div className="absolute inset-0 -z-20 overflow-hidden">

  {/* DESKTOP BACKGROUND */}
  <img
    src="/dektopbaner.png"
    alt=""
    aria-hidden="true"
    className="hidden md:block absolute inset-0
      w-full h-full
      object-contain object-right"
  />

  {/* MOBILE BACKGROUND */}
  <img
    src="/mobilebaner.png"
    alt=""
    aria-hidden="true"
    className="md:hidden absolute inset-0
      w-full h-full
      object-cover object-center"
  />

  </div>

  {/* DESKTOP OVERLAY */}
  <div
    className="absolute inset-0 -z-10 hidden md:block
      bg-gradient-to-r
      from-black/95 via-black/65 to-black/10"
  />

  {/* MOBILE OVERLAY */}
  <div
    className="absolute inset-0 -z-10 md:hidden
      bg-gradient-to-b
      from-black/75 via-black/65 to-black/90"
  />

  {/* HERO CONTENT */}
  <div
    className="relative z-10 w-full
      max-w-[1500px] mx-auto
      px-5 sm:px-8 lg:px-14 xl:px-16"
  >

    <div
      className="w-full max-w-[720px]
        text-left space-y-5 md:space-y-6"
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

        <span className="w-2 h-2 rounded-full bg-[#F3C973] shrink-0" />

        <span
          className="text-[9px] sm:text-[10px] md:text-[11px]
            font-medium tracking-[0.10em]
            uppercase text-white leading-relaxed"
        >
          Relationship & Emotional Intelligence Expert
          | Couple Dynamics | Human Behaviour
        </span>

      </div>

      {/* SESSION LABEL */}
      <div
        className="flex items-center gap-2
          text-[#F3C973]
          text-xs sm:text-sm md:text-base
          font-medium"
      >
        <span className="text-lg">❤️</span>

        <span>
          LIVE ONLINE SESSION
          <span className="text-white/90 font-normal">
            {" "}• 3 HOURS
          </span>
        </span>
      </div>

      {/* MAIN HEADING */}
      <h1
        className="text-[32px]
          leading-[1.15]
          sm:text-[40px]
          md:text-[48px]
          lg:text-[60px]
          xl:text-[66px]
          font-semibold
          text-white
          tracking-[-0.025em]"
      >

        Why Do We Hurt

        <span
          className="block
            text-[#F3C973]
            font-normal mt-1"
        >
          the People We Love?
        </span>

      </h1>

      {/* DESCRIPTION */}
      <p
        className="text-[13px]
          sm:text-sm
          md:text-base
          lg:text-[17px]
          text-white/90
          leading-[1.75]
          max-w-[650px]
          font-normal"
      >

        You may love someone deeply—and still snap at them,
        shut down, bring up old wounds, or repeat the same
        argument. Why does it happen? And what's really
        going on beneath the reaction?

        <br /><br />

        Join Kavitha Ganeshraja for a thoughtful, practical
        <strong className="text-[#F3C973] font-medium">
          {" "}3-hour session
        </strong>
        {" "}to explore the emotional patterns that shape
        how we connect, disconnect and reconnect.

      </p>

      {/* BENEFITS */}
      <div
        className="grid grid-cols-1
          sm:grid-cols-2
          gap-x-7 gap-y-3
          pt-1 max-w-[620px]
          text-xs sm:text-sm md:text-[15px]
          text-white/95 font-normal"
      >

        {[
          "Emotional Triggers",
          "Childhood Patterns",
          "Healthy Communication",
          "Build Stronger Connections",
        ].map((benefit) => (

          <div
            key={benefit}
            className="flex items-center gap-2.5"
          >

            <span
              className="flex items-center justify-center
                w-6 h-6 rounded-full
                bg-[#F3C973]/20
                text-[#F3C973]
                text-xs shrink-0"
            >
              ✓
            </span>

            <span>{benefit}</span>

          </div>

        ))}

      </div>

      {/* SPECIAL OFFER CARD */}
      <div
        className="relative w-full max-w-[420px]
          mt-4 rounded-xl
          border border-[#F3C973]/50
          bg-black/60 backdrop-blur-lg
          p-4 sm:p-5
          overflow-hidden"
      >

        {/* OFFER BADGE */}
        <div
          className="absolute top-0 right-0
            bg-[#F3C973]
            text-[#2A1625]
            text-[9px] sm:text-[10px]
            font-bold
            px-3 py-1.5
            rounded-bl-lg
            tracking-wide"
        >
          SPECIAL OFFER
        </div>

        <p className="text-white/80
          text-[11px] sm:text-xs mb-2 pr-24"
        >
          Get this valuable 3-hour session at an exclusive price
        </p>

        <div className="flex items-center gap-3 flex-wrap">

          <span
            className="text-white/60
              line-through text-lg sm:text-xl"
          >
            ₹3,000
          </span>

          <span
            className="text-[#F3C973]
              text-3xl sm:text-4xl font-bold"
          >
            ₹99
          </span>

          <span className="text-white text-xs font-medium">
            ONLY
          </span>

        </div>

        <p
          className="text-green-300
            text-[11px] sm:text-xs
            font-medium mt-2"
        >
          Save ₹2,901 on your session registration!
        </p>

      </div>

      {/* CTA BUTTON */}
      <div className="pt-1 w-full sm:w-auto">

        <a
          onClick={handlePayment}
          disabled={isPaying}
          className="group inline-flex
            items-center justify-center
            gap-2.5
            w-full sm:w-auto
            px-6 sm:px-8
            py-3.5
            bg-[#9E4770]
            hover:bg-[#803458]
            text-white font-semibold
            text-xs sm:text-sm md:text-base
            rounded-full
            transition-all duration-300
            shadow-xl
            hover:-translate-y-1"
        >
          {isPaying ?"Processing...": "Reserve Your Seat for ₹99"}

          <span
            className="text-lg
              group-hover:translate-x-1
              transition-transform duration-300"
          >
            →
          </span>

        </a>

        <p
          className="text-white/70
            text-[10px] sm:text-xs
            mt-3 leading-relaxed
            max-w-[440px]"
        >
          An opportunity to understand yourself
          and connect better with the people you love.

        </p>

      </div>

    </div>

  </div>

</section>





 {/* SECTION 2: PROFILE & Session OFFER */}
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
          Meet Your Mentor
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

      {/* PREMIUM OFFER CARD */}
<div className="relative mt-6 w-full max-w-[440px]
  overflow-hidden rounded-2xl
  border border-[#9E4770]/25
  bg-white p-5 sm:p-6
  shadow-[0_15px_45px_rgba(42,22,37,0.12)]">

  {/* TOP ACCENT */}
  <div className="absolute left-0 top-0 h-1 w-full
    bg-gradient-to-r from-[#9E4770] via-[#F3BBD1] to-[#9E4770]" />

  {/* OFFER HEADER */}
  <div className="flex items-center justify-between gap-2">

    <div className="inline-flex items-center gap-2
      rounded-full bg-[#F7EAF0] px-3 py-2">

      <span className="text-sm text-[#9E4770]">✦</span>

      <span className="text-[10px] font-bold uppercase
        tracking-wider text-[#9E4770] sm:text-xs">
        Exclusive Offer
      </span>

    </div>

    {/* SESSION DURATION */}
    <span className="rounded-full bg-[#2A1625]
      px-3 py-2 text-[9px] font-bold
      uppercase tracking-wide text-white sm:text-[10px]">
      ⏱ 3 Hours
    </span>

  </div>


  {/* SESSION TITLE */}
  <div className="mt-5">

    <p className="text-xs font-semibold uppercase
      tracking-[0.15em] text-[#9E4770]">
      Live Online Relationship Session
    </p>

    <h3 className="mt-2 text-xl font-bold
      leading-snug text-[#2A1625] sm:text-2xl">
      Understand Yourself.
      <span className="block text-[#9E4770] font-semibold">
        Build Stronger Connections.
      </span>
    </h3>

  </div>


  {/* PRICE SECTION */}
  <div className="mt-5 flex items-center gap-3">

    <div>
      <p className="text-[10px] font-medium uppercase
        tracking-wider text-[#A59AA1]">
        Regular Price
      </p>

      <span className="text-lg text-[#A59AA1]
        line-through sm:text-xl">
        ₹3,000
      </span>
    </div>

    <div className="h-10 w-px bg-[#E9DCE2]" />

    <div>
      <p className="text-[10px] font-bold uppercase
        tracking-wider text-[#9E4770]">
        Special Price
      </p>

      <div className="flex items-baseline gap-1">

        <span className="text-5xl font-extrabold
          tracking-tight text-[#9E4770]">
          ₹99
        </span>

        <span className="text-xs font-semibold
          text-[#2A1625]">
          ONLY
        </span>

      </div>
    </div>

  </div>


  {/* SAVINGS HIGHLIGHT */}
  <div className="mt-5 flex items-center gap-3
    rounded-xl bg-[#2A1625] p-3.5 text-white">

    <div className="flex h-10 w-10 shrink-0
      items-center justify-center rounded-full
      bg-white/10 text-xl">
      🎉
    </div>

    <div className="min-w-0">

      <p className="text-[10px] uppercase
        tracking-wider text-white/60">
        Your Special Savings
      </p>

      <p className="mt-1 text-base font-bold">
        Save ₹2,901

        <span className="ml-2 rounded-md
          bg-[#F3BBD1]/20 px-2 py-1
          text-[10px] font-bold text-[#F3BBD1]">
          96.7% OFF
        </span>
      </p>

    </div>

  </div>


  {/* CTA BUTTON */}
  <a
    onClick={handlePayment}
          disabled={isPaying}
    className="group mt-5 flex min-h-[52px]
      w-full items-center justify-center
      gap-2 rounded-full
      bg-[#9E4770] px-4 py-3
      text-center text-sm font-bold
      text-white shadow-lg
      transition-all duration-300
      hover:-translate-y-1
      hover:bg-[#803458] sm:text-base"
  >

{isPaying ?"Processing...": "Reserve Your Seat for ₹99"}

    <span className="text-lg transition-transform
      duration-300 group-hover:translate-x-1">
      →
    </span>

  </a>


  {/* FOOTER */}
  <div className="mt-4 flex items-center
    justify-center gap-2">

    <span className="text-[#9E4770]">♥</span>

    <p className="text-center text-[10px]
      leading-relaxed text-[#8A7D85] sm:text-xs">
      A meaningful 3-hour journey towards
      healthier relationships.
    </p>

  </div>

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
  category: "RELATIONSHIP AWARENESS",
  title: "Silent Divorce: When Love Turns Into Silence",
  desc: "Explore the hidden signs of emotional disconnection, understand why couples drift apart while staying together, and discover ways to rebuild intimacy, communication, and emotional connection.",
  img: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1000&q=80",
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


{/* SECTION 6: SESSION OFFER */}
<section
  id="register"
  className="relative overflow-hidden bg-[#FAF6F0] px-5 py-14 md:py-20"
>
  <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#9E4770]/10 blur-3xl" />
  <div className="absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-[#F3C973]/20 blur-3xl" />

  <div className="relative mx-auto max-w-6xl">

    {/* HEADING */}
    <div className="mb-10 text-center">

      <span className="inline-flex items-center gap-2 rounded-full border border-[#9E4770]/20 bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-[#9E4770]">
        ✦ A Meaningful Step Towards Better Relationships
      </span>

      <h2 className="mx-auto mt-5 max-w-3xl font-serif text-3xl font-bold leading-tight text-[#2A1625] sm:text-4xl md:text-5xl">
        Your Relationship Deserves
        <span className="block italic text-[#9E4770]">
          More Than Just Love.
        </span>
      </h2>

      <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#2A1625]/65">
        Understand your emotions, break repeating patterns,
        and discover healthier ways to connect with the people you love.
      </p>

    </div>


    {/* OFFER CARD */}
    <div className="mx-auto max-w-5xl overflow-hidden rounded-[24px] border border-[#F3C973]/50 bg-white shadow-xl">

      <div className="h-1.5 bg-gradient-to-r from-[#9E4770] via-[#F3C973] to-[#9E4770]" />

      <div className="grid md:grid-cols-[1.2fr_0.8fr]">

        {/* LEFT CONTENT */}
        <div className="p-6 sm:p-9 md:p-11">

          <span className="rounded-full bg-[#F3C973]/20 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-[#7A4B18]">
            ❤️ Your Journey Starts Here
          </span>

          <h3 className="mt-6 font-serif text-3xl font-bold leading-tight text-[#2A1625] sm:text-4xl">
            Don't Let Emotional
            <span className="block text-[#9E4770]">
              Distance Define
            </span>
            Your Relationship.
          </h3>

          <p className="mt-4 max-w-lg text-sm leading-7 text-[#2A1625]/65">
            Take 3 hours to understand yourself, explore
            relationship patterns, and discover new ways
            to build meaningful connections.
          </p>


          {/* BENEFITS */}
          <div className="mt-7 space-y-5">

            {[
              ["♡", "Understand Your Emotions", "Recognize your emotional triggers."],
              ["✦", "Break Repeating Patterns", "Understand recurring conflicts."],
              ["♥", "Reconnect With Understanding", "Explore healthier communication."],
            ].map(([icon, title, desc]) => (

              <div key={title} className="flex items-center gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#9E4770]/10 text-lg text-[#9E4770]">
                  {icon}
                </div>

                <div>
                  <h4 className="text-sm font-bold text-[#2A1625]">
                    {title}
                  </h4>

                  <p className="mt-1 text-xs text-[#2A1625]/60">
                    {desc}
                  </p>
                </div>

              </div>

            ))}

          </div>

          <p className="mt-7 border-t border-[#2A1625]/10 pt-5 font-serif text-base italic text-[#9E4770]">
            Because love deserves understanding.
          </p>

        </div>


        {/* RIGHT PRICE CARD */}
        <div className="relative flex flex-col items-center justify-center overflow-hidden bg-[#2A1625] p-7 text-center text-white sm:p-10">

          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#9E4770]/30 blur-3xl" />

          <div className="relative z-10 w-full">

            <span className="inline-flex rounded-full border border-[#F3C973]/30 bg-[#F3C973]/10 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-[#F3C973]">
              ✦ EXCLUSIVE SESSION OFFER
            </span>

            <h3 className="mt-7 font-serif text-2xl font-bold">
              Invest 3 Hours
              <span className="block text-[#F3C973]">
                In Your Relationships
              </span>
            </h3>

            <div className="mx-auto mt-6 inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-3">
              ⏰
              <span className="text-xs font-bold">
                3-HOUR LIVE ONLINE SESSION
              </span>
            </div>

            {/* PRICE */}
            <div className="mt-7 flex items-center justify-center gap-3">

              <span className="font-serif text-6xl font-bold text-[#F3C973]">
                ₹99
              </span>

              <div className="text-left">
                <p className="text-sm text-white/50 line-through">
                  ₹3,000
                </p>
                <p className="text-[10px] font-bold uppercase text-[#F3C973]">
                  Special Price
                </p>
              </div>

            </div>

            {/* SAVINGS */}
            <div className="mt-4 inline-flex rounded-lg bg-white/10 px-4 py-2.5">
              <span className="text-xs font-bold text-white">
                🎉 Save ₹2,901 · 96.7% OFF
              </span>
            </div>

            <p className="mx-auto mt-6 max-w-xs text-sm leading-6 text-white/65">
              Take the first step towards understanding
              yourself and your relationships.
            </p>

            {/* CTA */}
            <a
             onClick={handlePayment}
             disabled={isPaying}
              className="group mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#F3C973] to-[#E7B84F] px-5 py-4 text-sm font-bold text-[#2A1625] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
             
              {isPaying ? "Processing..." :" Join the Session for ₹99"}

              <span className="text-lg transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>

            <p className="mt-4 text-[11px] text-white/50">
              🔒 Secure Registration
            </p>

          </div>

        </div>

      </div>
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
          © {new Date().getFullYear()} Kavitha Ganeshraja
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
        onClick={handlePayment}
        disabled ={isPaying}
        className="group inline-flex items-center gap-3 rounded-full border border-[#F3C973]/50 bg-[#F3C973]/10 px-6 py-3 text-sm font-semibold text-[#F3C973] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#F3C973] hover:bg-[#F3C973] hover:text-[#402439] hover:shadow-lg hover:shadow-black/10"
      >
       
        {isPaying ? "Processing..."  :" Join the Session for ₹99"}
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



{/* ANIMATED FLOATING CONTACT BUTTONS */}
<div className="fixed right-3 bottom-20 md:right-5 md:bottom-7 z-[9999] flex flex-col gap-3 md:gap-5">

  {/* CALL BUTTON */}
  <a
    href="tel:+919876543210"
    aria-label="Call us"
    className="group relative flex h-12 w-12 md:h-16 md:w-16 sm:h-14 sm:w-14
      items-center justify-center rounded-full
      bg-gradient-to-br from-[#B85B85] to-[#803458]
      text-white shadow-xl
      transition-all duration-300
      hover:scale-110 hover:shadow-2xl
      motion-safe:animate-bounce"
  >
    {/* PULSE RING */}
    <span className="absolute inset-0 rounded-full border-2 border-[#9E4770] animate-ping opacity-30" />

    {/* CALL ICON */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="relative z-10 h-6 w-6 md:h-8 md:w-8 transition-transform duration-300 group-hover:rotate-12"
    >
      <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.25 1.02z" />
    </svg>

    {/* TOOLTIP */}
    <span className="absolute right-[60px] md:right-[78px] whitespace-nowrap
      rounded-lg bg-[#2A1625] px-3 py-2
      text-xs font-semibold text-white
      opacity-0 translate-x-2 pointer-events-none
      transition-all duration-300
      group-hover:opacity-100 group-hover:translate-x-0">
      Call Us Now
    </span>
  </a>


  {/* WHATSAPP BUTTON */}
  <a
    href="https://wa.me/919876543210"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat with us on WhatsApp"
    className="group relative flex h-12 w-12 md:h-16 md:w-16 sm:h-14 sm:w-14
      items-center justify-center rounded-full
      bg-gradient-to-br from-[#32E875] to-[#0B9F50]
      text-white shadow-xl
      transition-all duration-300
      hover:scale-110 hover:shadow-2xl
      motion-safe:animate-bounce"
  >
    {/* PULSE RING */}
    <span className="absolute inset-0 rounded-full border-2 border-[#25D366] animate-ping opacity-30" />

    {/* WHATSAPP ICON */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="relative z-10 h-7 w-7 md:h-9 md:w-9 transition-transform duration-300 group-hover:rotate-12"
    >
      <path d="M20.52 3.48A11.87 11.87 0 0012.04 0C5.48 0 .14 5.34.14 11.9c0 2.1.55 4.15 1.6 5.96L0 24l6.3-1.65a11.9 11.9 0 005.73 1.46h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.17-3.42-8.43zM12.04 21.8a9.9 9.9 0 01-5.04-1.38l-.36-.21-3.74.98 1-3.65-.24-.38a9.87 9.87 0 01-1.52-5.26c0-5.46 4.45-9.9 9.91-9.9a9.83 9.83 0 017 2.9 9.83 9.83 0 012.9 7c0 5.46-4.45 9.9-9.91 9.9zm5.43-7.42c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.67-2.08-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.2 5.08 4.49.71.31 1.26.5 1.69.64.71.23 1.35.2 1.86.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35z" />
    </svg>

    {/* TOOLTIP */}
    <span className="absolute right-[60px] md:right-[78px] whitespace-nowrap
      rounded-lg bg-[#2A1625] px-3 py-2
      text-xs font-semibold text-white
      opacity-0 translate-x-2 pointer-events-none
      transition-all duration-300
      group-hover:opacity-100 group-hover:translate-x-0">
      Chat on WhatsApp
    </span>
  </a>

</div>






      {/* MOBILE STICKY BOTTOM BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white p-4 border-t border-[#2A1625]/10 flex items-center justify-between md:hidden shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
        <div>
          <p className="text-[10px] font-bold text-[#71656D] uppercase tracking-wider">
            Live Masterclass
          </p>
          <p className="text-xl font-serif font-bold text-[#2A1625]">
            ₹99 <span className="text-sm line-through text-[#71656D] ml-1">₹3000</span>
          </p>
        </div>
        <a
          onClick={handlePayment}
        disabled ={isPaying}
          className="px-6 py-3 bg-[#9E4770] text-white font-bold text-sm rounded-lg shadow-md"
        >
          
          {isPaying ?"Processing...": "Claim Seat ↗"}
        </a>
      </div>
       <WorkshopPopup />
    </div>
    
  );
}