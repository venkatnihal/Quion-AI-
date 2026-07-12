# QuionAI — Complete Frontend Architecture Blueprint
# Senior Product Design + Motion Design + Frontend Architecture
# Do not write code until this document is approved.

---

## LOGO ANALYSIS & DESIGN IMPLICATIONS

The logo reveals three structural rules for the entire system:

1. The "Q" icon is a CIRCULAR RING with circuit-chip interior — this IS the neural network motif.
   The 3D globe must echo this: ring geometry + node grid inside.

2. The wordmark uses "QuionAi" (capital A, lowercase i) — this case must be preserved everywhere.

3. The icon is perfectly symmetric. The site should mirror this with centered compositions,
   perfect spacing, and geometric precision — not chaotic asymmetry.

Logo versions required:
  - quionai-white.svg      → nav on dark bg (white icon + white text)
  - quionai-gradient.svg   → premium web version (gradient icon + white text)
  - quionai-dark.svg       → light backgrounds, documents (black icon + black text)

---

## 1. DESIGN TOKENS — THREE-TIER SYSTEM

### Tier 1: Primitive (raw values, no semantic meaning)

COLOR PRIMITIVES
  color.blue.500    #00D4FF   ← Quion Blue (primary action)
  color.blue.400    #22D3EE   ← AI glow midpoint
  color.blue.300    #67E8F9
  color.purple.500  #6D5DFC   ← Quion Purple (secondary/gradients)
  color.purple.400  #8B5CF6   ← gradient terminus
  color.purple.300  #A78BFA
  color.black.900   #050816   ← Midnight Black (canvas)
  color.navy.800    #0F172A   ← Deep Space Navy (cards/sections)
  color.navy.700    #111827   ← Elevated bg
  color.navy.600    #1E293B   ← Borders/dividers
  color.gray.500    #334155
  color.gray.400    #475569   ← Muted text
  color.gray.300    #64748B
  color.gray.200    #94A3B8   ← Silver Gray (body text)
  color.gray.100    #CBD5E1
  color.white       #FFFFFF

SPACING PRIMITIVES (px)
  space.0    0     space.1    4     space.2    8
  space.3    12    space.4    16    space.5    20
  space.6    24    space.8    32    space.10   40
  space.12   48    space.14   56    space.16   64
  space.20   80    space.24   96    space.32   128
  space.40   160   space.48   192   space.64   256

RADIUS PRIMITIVES
  radius.none   0       radius.xs    4px    radius.sm    6px
  radius.md     8px     radius.lg    12px   radius.xl    16px
  radius.2xl    20px    radius.3xl   24px   radius.full  9999px

DURATION PRIMITIVES
  dur.instant   0ms     dur.fastest  100ms  dur.fast     150ms
  dur.normal    250ms   dur.medium   400ms  dur.slow     600ms
  dur.slower    800ms   dur.slowest  1000ms
  dur.ambient   2000ms  dur.pulse    3000ms dur.loop     8000ms
  dur.nebula    20000ms

---

### Tier 2: Semantic (purpose-mapped values)

BACKGROUNDS
  bg.canvas          #050816            page surface (Midnight Black)
  bg.surface         #0F172A            cards, secondary sections
  bg.elevated        #111827            elevated cards/modals
  bg.overlay         rgba(5,8,22,0.92)  nav scrolled, menu backdrop
  bg.glass           rgba(15,23,42,0.60) glassmorphism base
  bg.glass.elevated  rgba(15,23,42,0.80) modals, hero overlay cards

BRAND
  brand.primary      #00D4FF   Quion Blue — CTAs, links, highlights, interactive
  brand.secondary    #6D5DFC   Quion Purple — gradients, hover states, AI vis
  brand.accent       #8B5CF6   gradient terminus
  brand.mid          #22D3EE   glow midpoint

TEXT
  text.primary       #FFFFFF   headlines, key copy
  text.secondary     #94A3B8   body, descriptions
  text.muted         #475569   captions, footnotes, placeholders
  text.inverted      #050816   text ON primary blue buttons
  text.link          #00D4FF   links, interactive labels

BORDERS
  border.default     rgba(255,255,255,0.06)   standard glass border
  border.subtle      rgba(255,255,255,0.04)   section dividers
  border.active      rgba(0,212,255,0.30)     hover, focus, selected
  border.brand       rgba(109,93,252,0.40)    secondary hover
  border.glass       rgba(255,255,255,0.08)   glass card border

GRADIENTS
  grad.hero          linear-gradient(135deg, #00D4FF 0%, #6D5DFC 50%, #8B5CF6 100%)
  grad.glow          linear-gradient(90deg, #00D4FF, #22D3EE, #6D5DFC)
  grad.dark.bg       linear-gradient(180deg, #050816, #0F172A, #111827)
  grad.text          linear-gradient(135deg, #00D4FF, #6D5DFC)   [headline accents]
  grad.radial.blue   radial-gradient(ellipse, rgba(0,212,255,0.15) 0%, transparent 70%)
  grad.radial.purple radial-gradient(ellipse, rgba(109,93,252,0.12) 0%, transparent 70%)

STATUS
  status.success     #10B981
  status.error       #EF4444
  status.warning     #F59E0B

SHADOWS / GLOWS
  shadow.card        0 4px 24px rgba(0,0,0,0.50)
  shadow.elevated    0 20px 60px rgba(0,0,0,0.40)
  glow.blue          0 0 40px rgba(0,212,255,0.45)       [brand-specified CTA hover]
  glow.blue.soft     0 0 80px rgba(0,212,255,0.20)
  glow.purple        0 0 40px rgba(109,93,252,0.40)
  glow.hero          0 0 120px rgba(0,212,255,0.12)

GLASS SYSTEM
  glass.base:
    background: rgba(15,23,42,0.60)
    backdrop-filter: blur(20px)
    border: 1px solid rgba(255,255,255,0.08)
  glass.elevated:
    background: rgba(15,23,42,0.80)
    backdrop-filter: blur(40px)
    border: 1px solid rgba(0,212,255,0.15)

---

### Tier 3: Component Tokens

BUTTON — PRIMARY
  btn.primary.bg         #00D4FF
  btn.primary.text       #050816
  btn.primary.radius     9999px (pill)
  btn.primary.px         32px
  btn.primary.py         16px
  btn.primary.font-size  0.9375rem (15px)
  btn.primary.weight     600
  btn.primary.hover.shadow  0 0 40px rgba(0,212,255,0.5)

BUTTON — SECONDARY
  btn.secondary.border   1px solid #6D5DFC
  btn.secondary.text     #FFFFFF
  btn.secondary.bg       transparent
  btn.secondary.hover.bg rgba(109,93,252,0.10)
  btn.secondary.hover.shadow  0 0 40px rgba(0,212,255,0.3)

CARD — GLASS
  card.bg            rgba(15,23,42,0.60)
  card.blur          20px
  card.border        rgba(255,255,255,0.08)
  card.radius        16px
  card.padding       32px
  card.hover.border  rgba(0,212,255,0.30)
  card.hover.translateY  -6px
  card.hover.shadow  0 20px 60px rgba(0,0,0,0.40)

NAVBAR
  nav.height         72px
  nav.height.scrolled 64px
  nav.bg.default     transparent
  nav.bg.scrolled    rgba(5,8,22,0.92) + blur(24px)
  nav.border.scrolled 1px solid rgba(255,255,255,0.05) [bottom only]
  nav.link.color     #94A3B8
  nav.link.hover     #FFFFFF
  nav.link.active    #00D4FF

INPUT
  input.bg           rgba(15,23,42,0.80)
  input.border       rgba(255,255,255,0.06)
  input.border.focus rgba(0,212,255,0.40)
  input.radius       12px
  input.px           20px
  input.py           16px
  input.text         #FFFFFF
  input.placeholder  #475569

BADGE / TAG
  badge.bg           rgba(0,212,255,0.10)
  badge.border       rgba(0,212,255,0.25)
  badge.text         #00D4FF
  badge.radius       9999px
  badge.px           16px
  badge.py           4px
  badge.size         0.75rem
  badge.weight       500

SECTION
  section.py         160px (desktop) → 80px (mobile)
  section.label.color  #00D4FF
  section.label.size   0.75rem
  section.label.weight 500
  section.label.tracking 0.1em
  section.label.transform uppercase

---

## 2. GLOBAL COLOR VARIABLES (CSS Custom Properties)

All tokens expressed as CSS variables in :root
File: src/styles/tokens.css

:root {
  /* Backgrounds */
  --bg-canvas:         #050816;
  --bg-surface:        #0F172A;
  --bg-elevated:       #111827;
  --bg-overlay:        rgba(5, 8, 22, 0.92);
  --bg-glass:          rgba(15, 23, 42, 0.60);
  --bg-glass-elevated: rgba(15, 23, 42, 0.80);

  /* Brand */
  --brand-blue:        #00D4FF;
  --brand-purple:      #6D5DFC;
  --brand-accent:      #8B5CF6;
  --brand-mid:         #22D3EE;

  /* Text */
  --text-primary:      #FFFFFF;
  --text-secondary:    #94A3B8;
  --text-muted:        #475569;
  --text-inverted:     #050816;
  --text-link:         #00D4FF;

  /* Borders */
  --border-default:    rgba(255, 255, 255, 0.06);
  --border-subtle:     rgba(255, 255, 255, 0.04);
  --border-active:     rgba(0, 212, 255, 0.30);
  --border-brand:      rgba(109, 93, 252, 0.40);
  --border-glass:      rgba(255, 255, 255, 0.08);

  /* Gradients */
  --grad-hero:         linear-gradient(135deg, #00D4FF 0%, #6D5DFC 50%, #8B5CF6 100%);
  --grad-glow:         linear-gradient(90deg, #00D4FF, #22D3EE, #6D5DFC);
  --grad-dark-bg:      linear-gradient(180deg, #050816, #0F172A, #111827);
  --grad-text:         linear-gradient(135deg, #00D4FF, #6D5DFC);
  --grad-radial-blue:  radial-gradient(ellipse at center, rgba(0,212,255,0.15) 0%, transparent 70%);

  /* Shadows */
  --shadow-card:       0 4px 24px rgba(0, 0, 0, 0.50);
  --shadow-elevated:   0 20px 60px rgba(0, 0, 0, 0.40);
  --glow-blue:         0 0 40px rgba(0, 212, 255, 0.45);
  --glow-blue-soft:    0 0 80px rgba(0, 212, 255, 0.20);
  --glow-purple:       0 0 40px rgba(109, 93, 252, 0.40);
  --glow-hero:         0 0 120px rgba(0, 212, 255, 0.12);

  /* Spacing */
  --space-1: 4px;   --space-2: 8px;    --space-3: 12px;
  --space-4: 16px;  --space-5: 20px;   --space-6: 24px;
  --space-8: 32px;  --space-10: 40px;  --space-12: 48px;
  --space-16: 64px; --space-20: 80px;  --space-24: 96px;
  --space-32: 128px; --space-40: 160px;

  /* Radius */
  --radius-sm:   6px;    --radius-md:   8px;
  --radius-lg:   12px;   --radius-xl:   16px;
  --radius-2xl:  20px;   --radius-3xl:  24px;
  --radius-full: 9999px;

  /* Z-index */
  --z-three:    -1;    /* Three.js canvas behind page */
  --z-base:      0;
  --z-raised:    10;
  --z-dropdown:  100;
  --z-sticky:    200;
  --z-navbar:    300;
  --z-overlay:   400;
  --z-modal:     500;
  --z-toast:     600;
  --z-cursor:    700;

  /* Durations */
  --dur-fast:     150ms;  --dur-normal:  250ms;
  --dur-medium:   400ms;  --dur-slow:    600ms;
  --dur-slower:   800ms;
  --dur-ambient:  2000ms; --dur-pulse:   3000ms;
  --dur-loop:     8000ms;

  /* Easings */
  --ease-enter:  cubic-bezier(0.16, 1, 0.3, 1);    /* easeOutExpo */
  --ease-exit:   cubic-bezier(0.7, 0, 1, 1);        /* easeInExpo */
  --ease-inout:  cubic-bezier(0.76, 0, 0.24, 1);    /* easeInOutQuart */
  --ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1); /* easeOutBack */
  --ease-smooth: cubic-bezier(0.37, 0, 0.63, 1);    /* easeInOutSine */
}

---

## 3. TYPOGRAPHY SYSTEM

FONT STACK
  Display / Headlines:  Space Grotesk    (brand-specified)
  Body / UI / Buttons:  Inter            (brand-specified)
  Mono (data/metrics):  JetBrains Mono   (tech credibility accent)

LOADING STRATEGY
  - next/font with variable font mode (single woff2 file)
  - preload: true for above-fold fonts
  - subset: 'latin'
  - display: 'swap'
  - CSS variables: --font-display, --font-body, --font-mono
  - Applied to html element via className

FLUID TYPE SCALE (clamp — mobile min → desktop max)

  --type-display:   clamp(3.5rem, 8vw, 7.5rem)
    weight: 700 / tracking: -0.03em / line-height: 1.05
    use: hero H1 only

  --type-h1:        clamp(2.75rem, 5.5vw, 5rem)
    weight: 700 / tracking: -0.025em / line-height: 1.08
    use: page-level headlines

  --type-h2:        clamp(2rem, 4vw, 3.5rem)
    weight: 600 / tracking: -0.02em / line-height: 1.15
    use: section headings

  --type-h3:        clamp(1.5rem, 2.5vw, 2.25rem)
    weight: 600 / tracking: -0.015em / line-height: 1.25
    use: card titles, sub-section headings

  --type-h4:        clamp(1.25rem, 2vw, 1.625rem)
    weight: 500 / tracking: -0.01em / line-height: 1.35
    use: feature titles

  --type-body-xl:   1.25rem
    weight: 400 / tracking: 0 / line-height: 1.80
    use: hero subtext, lead paragraphs

  --type-body-lg:   1.125rem
    weight: 400 / tracking: 0 / line-height: 1.75
    use: card descriptions, section subtext

  --type-body:      1rem
    weight: 400 / tracking: 0 / line-height: 1.70
    use: body copy, paragraphs

  --type-body-sm:   0.9375rem
    weight: 400 / line-height: 1.65
    use: secondary body

  --type-label:     0.75rem
    weight: 500 / tracking: 0.10em / line-height: 1.5
    transform: uppercase
    use: section labels ("OUR SERVICES"), tags, nav overlines

  --type-micro:     0.6875rem
    weight: 500 / tracking: 0.08em
    use: copyright, footnotes

  --type-mono:      0.875rem
    font: JetBrains Mono / weight: 400 / tracking: 0
    use: metrics (#ROI: 87%), code snippets, data values

HIERARCHY RULES (CRITICAL)

  Rule 1: Gradient text appears ONCE per section — on 2-4 key words max.
          Never apply gradient to full headlines. Gradient is precious.

  Rule 2: Hero H1 always uses --type-display with Space Grotesk 700.
          Key words (e.g., "Scaled." or "Automated.") get <GradientText>.

  Rule 3: Section H2 headings are always full white. No gradient.

  Rule 4: Body text is ALWAYS --text-secondary (#94A3B8).
          Never pure white. The contrast creates visual breathing room.

  Rule 5: Labels above headings: --type-label, --text-link (#00D4FF),
          with a decorative dot or line prefix: "● OUR SERVICES"

  Rule 6: Minimum 16px body text on all viewports (prevents iOS zoom).

  Rule 7: Letter-spacing on headlines is NEGATIVE (-0.02 to -0.03em).
          Tighter = more premium. Never positive on display sizes.

---

## 4. LAYOUT GRID SYSTEM

BREAKPOINTS
  xs:  375px   iPhone SE
  sm:  390px   iPhone 14/15
  md:  768px   iPad portrait
  lg:  1024px  iPad Pro / small laptop
  xl:  1280px  desktop standard
  2xl: 1536px  large desktop

CONTAINER (max-widths + horizontal padding)
  xs/sm:  100% width / 16px side padding
  md:     100% width / 32px side padding
  lg:     100% width / 40px side padding
  xl:     1200px max-width / auto margin / 48px side padding
  2xl:    1400px max-width / auto margin / 80px side padding

COLUMN GRID
  Mobile (xs-sm):  4 columns / 16px gutter
  Tablet (md):     8 columns / 24px gutter
  Desktop (lg+):   12 columns / 32px gutter

SECTION VERTICAL RHYTHM
  Desktop:  padding-top / padding-bottom: 160px (--space-40)
  Tablet:   120px
  Mobile:   80px (--space-20)

Z-INDEX STACK
  Three.js canvas:   -1    (behind everything)
  Page content:       0
  Raised cards:      10
  Dropdowns:        100
  Sticky elements:  200
  Navbar:           300
  Mobile overlay:   400
  Modals:           500
  Toast/alerts:     600
  Custom cursor:    700

SECTION-SPECIFIC LAYOUTS

  Hero:
    Layout: 100vh / relative / overflow-hidden
    Content: max-width 900px / centered / z-index 10
    3D canvas: absolute fill / z-index -1

  Services:
    Desktop: CSS Grid, 4 columns, 24px gap
    Tablet:  2 columns
    Mobile:  horizontal scroll-snap, 1 card visible + peek

  HowItWorks:
    Desktop: 3 equal columns / connected by SVG line
    Mobile:  stacked vertically / line becomes vertical

  Results:
    Desktop: 3-column stat row + full-width case study below
    Mobile:  1 stat per row

  Testimonials:
    Desktop: 2-column grid or single carousel
    Mobile:  single-card carousel with swipe

  FAQ:
    Single column / max-width: 720px / centered

  Footer:
    Desktop: 4 columns (logo+desc | services | company | contact)
    Tablet:  2 columns
    Mobile:  stacked

---

## 5. COMPONENT INVENTORY (56 total)

=== LAYOUT (7) ===

  L01  RootLayout
       Role: html+body wrapper, font vars, metadata, providers
       Props: children

  L02  MarketingLayout
       Role: shared navbar + footer for marketing pages
       Props: children

  L03  Navbar
       Role: sticky header, scroll-aware, mobile trigger
       State: isScrolled (bool), isMobileOpen (bool)
       Variants: transparent (default) / frosted (scrolled)

  L04  MobileMenu
       Role: fullscreen overlay nav for mobile
       Animation: A16 (fullscreen overlay enter)
       Props: isOpen, onClose, items

  L05  Footer
       Role: links, social, copyright, market flags
       Props: none (pulls from navigation.ts data)

  L06  PageTransition
       Role: Framer Motion AnimatePresence wrapper
       Animation: A12 (exit), A13 (enter)

  L07  SectionWrapper
       Role: consistent vertical rhythm + bg variant
       Props: bg: 'canvas'|'surface'|'elevated', py override


=== UI PRIMITIVES (13) ===

  P01  Button
       Variants: primary | secondary | ghost | icon-only
       Sizes: sm | md | lg
       Props: variant, size, href, onClick, loading, icon, iconPos
       Accessibility: proper aria-label, focus ring, role

  P02  Badge
       Variants: brand | neutral | outline | success | error
       Props: variant, children, dot (bool)

  P03  GlassCard
       Props: glow (bool), hoverable (bool), padding override
       CSS: glass.base token, transition on hover

  P04  Input
       Props: label, name, type, error, helperText, icon
       Behavior: floating label animation on focus (A28)

  P05  Textarea
       Props: label, name, rows, error
       Auto-resize: yes

  P06  Select
       Props: label, options, value, onChange
       Style: custom dropdown, matches glass aesthetic

  P07  Accordion
       Props: items (AccordionItem[]), defaultOpen, allowMultiple
       Animation: A15 height expand

  P08  AccordionItem
       Props: question, answer, isOpen, onToggle

  P09  Modal
       Props: isOpen, onClose, title, children, size
       Backdrop: blur + dark overlay
       Animation: scale + fade

  P10  Tooltip
       Props: content, placement, children
       Trigger: hover (desktop) + press (mobile)

  P11  Divider
       Props: label (optional), orientation
       Style: rgba border + optional gradient line

  P12  Avatar
       Props: src, alt, size, ring (bool, adds brand glow ring)

  P13  Spinner
       Props: size, color
       Style: ring spinner matching brand colors


=== SHARED / UTILITY (10) ===

  S01  AnimatedHeadline
       Role: GSAP SplitText character-by-character reveal
       Props: children, delay, stagger, className
       Hook: useGSAP, ref-based
       Trigger: on mount (hero) or ScrollTrigger (sections)

  S02  GradientText
       Role: wraps key words in CSS gradient span
       Props: children, from, to (default brand values)
       Output: <span style="background-clip: text; color: transparent">

  S03  CountUp
       Role: scroll-triggered number animation
       Props: from, to, duration, suffix, prefix, decimals
       Hook: useCountUp + useInView

  S04  SectionLabel
       Role: blue uppercase label above headlines
       Props: children
       Output: "● SECTION TITLE" in brand label style

  S05  SectionWrapper
       (see L07 — same component)

  S06  ScrollReveal
       Role: Framer Motion whileInView wrapper
       Props: children, delay, direction ('up'|'left'|'right'), blur
       Default: fade + translateY(24px) + blur(8px) → clear

  S07  MouseFollowLight
       Role: cursor-tracking radial gradient overlay
       Rendered: desktop only (>1024px), pointer media query check
       Hook: useMousePosition + lerp
       Output: fixed position div with pointer-events-none

  S08  GlowOrb
       Role: CSS animated gradient orb — mobile hero fallback
       Props: size, colors
       No JS: pure CSS keyframe animation

  S09  ParallaxLayer
       Role: GSAP ScrollTrigger parallax wrapper
       Props: children, speed (0-1), direction

  S10  VideoModal
       Role: lightbox for "Watch How It Works"
       Props: videoSrc, trigger, thumbnail
       Uses: P09 Modal + react-player


=== SECTIONS — HOMEPAGE (24) ===

  H01  HeroSection
       Composes: HeroBadge + HeroHeadline + HeroCTA + HeroScene
       bg: gradient dark + particle field
       Height: 100vh

  H02  HeroBadge
       Role: "AI Transformation Company" pill badge above headline
       Animation: A02

  H03  HeroHeadline
       Role: animated display headline with gradient word
       Animation: A03 (SplitText)
       Copy: "Your Business. Automated. [Scaled.]"

  H04  HeroCTA
       Role: primary + secondary CTA button pair
       Animation: A05
       Primary: "Book Strategy Call"
       Secondary: "Watch How It Works ▶" → VideoModal

  H05  HeroScene
       Role: Three.js canvas entry point for hero
       Desktop (>1024px): ThreeCanvas + NeuralGlobe + ParticleField
       Mobile (<1024px): GlowOrb CSS fallback
       Lazy: dynamic import, Suspense

  H06  SocialProofBar
       Role: scrolling trust signals strip
       Content: stat counters + market flags
       Animation: A27 CSS marquee
       bg: bg.surface

  H07  ServicesSection
       Role: 8-card grid of services
       Animation: A08 card stagger
       Includes: SectionLabel + headline + ServiceCard × 8

  H08  ServiceCard
       Props: icon, title, description, href
       Base: GlassCard (hoverable, glow on hover)
       Hover: icon animation A29 + card A18

  H09  HowItWorksSection
       Role: 3-step process with animated connector
       Layout: 3-col desktop, stacked mobile

  H10  ProcessStep
       Props: number, title, description, icon
       Animation: A11 (staggered after connector draws)

  H11  ProcessConnector
       Role: animated SVG line between steps
       Animation: A10 stroke-dashoffset draw

  H12  ResultsSection
       Role: animated stats + mini case study
       Animation: A09 CountUp on scroll

  H13  StatCard
       Props: value, suffix, label, description
       Uses: CountUp + GlassCard

  H14  CaseStudyPreview
       Props: client, country, result, quote, href
       Style: GlassCard with accent border + flag icon

  H15  AIDemoSection
       Role: showcase of AI in action
       Content: animated mock chat or dashboard
       Optional: holographic R3F card overlay

  H16  DemoChat
       Role: animated message sequence (typewriter effect)
       Shows: AI chatbot interaction simulation

  H17  DemoPhone
       Role: stylized phone mockup with glassmorphism UI

  H18  TestimonialsSection
       Role: carousel of client testimonials
       Desktop: 2-up grid or single carousel
       Mobile: swipe carousel

  H19  TestimonialCard
       Props: name, company, country, photo, quote, rating, result
       Features: flag emoji, star rating, result metric badge

  H20  FAQSection
       Role: accordion FAQ, objection-removal
       Uses: Accordion + AccordionItem × 8
       Footer: "Still unsure?" → AI chat CTA

  H21  FinalCTASection
       Role: closing conversion — full-width dark gradient
       Animation: A30 (particle emergence on scroll)
       CTA: single primary "Book Your Free Strategy Call →"

  H22  Container (shared across sections)
       Role: max-width + padding wrapper

  H23  SectionHeading
       Role: SectionLabel + H2 + optional subtext, centered
       Shared: used in all sections for consistent heading rhythm

  H24  MobileStickyCTA
       Role: fixed bottom bar on mobile only
       Content: "Book Free Call" primary button
       Hide: when modal/form is open


=== THREE.JS COMPONENTS (9) ===

  T01  ThreeCanvas
       Role: R3F Canvas wrapper with lazy loading
       Lazy: dynamic import('react-three-fiber'), Suspense
       Fallback: GlowOrb CSS
       Only rendered: window.innerWidth >= 1024
       Cleanup: disposes scene on unmount

  T02  Scene
       Role: camera, lighting, composition root
       Camera: PerspectiveCamera FOV:45, pos:[0,0,5]
       Mouse: lerp-based parallax on camera position

  T03  EnvironmentLighting
       Lights:
         AmbientLight: intensity 0.05
         PointLight 1: color #00D4FF, intensity 2.0, pos [3,3,3]
         PointLight 2: color #6D5DFC, intensity 1.5, pos [-3,-2,2]
         PointLight 3: color #FFFFFF, intensity 0.3, pos [0,5,0]

  T04  NeuralGlobe (composite)
       Composes: Globe + Nodes + Connections
       Rotation: Y-axis 0.003 rad/frame
       Mouse parallax: rotation.x/y += delta * 0.0003 (lerped)

  T05  Globe (wireframe)
       Geometry: IcosahedronGeometry(2, 4) via EdgesGeometry
       Shader: custom — fresnel rim glow
         vert: standard position
         frag: fresnel = dot(vNormal, vViewDir)
               mix(transparent, #00D4FF, fresnel^2)
               gradient shift: #00D4FF → #6D5DFC by Y position
       Uniforms: u_time, u_color1, u_color2, u_glowIntensity

  T06  Nodes (points at vertices)
       Geometry: Points from icosahedron vertices
       Count: ~200
       Shader:
         vert: gl_PointSize varies by distance + index
         frag: circular alpha mask, pulse via sin(u_time + a_offset)
       Color: #00D4FF with alpha 0.4–0.9

  T07  Connections (neural edges)
       Geometry: LineSegments (pre-computed at mount, stable)
       Count: ~120 pairs of nearby vertices
       Material: ShaderMaterial
         frag: pulse travels along line via u_time offset per segment
       Color: gradient #00D4FF → #6D5DFC along segment

  T08  ParticleField
       Geometry: BufferGeometry, 150 points (0 on mobile)
       Shader:
         vert: a_offset per particle, sin/cos drift in u_time
               gl_PointSize perspective-correct
         frag: circular soft point, alpha 0.2–0.6, color mix
       Uniforms: u_time / Attributes: a_offset, a_size, a_colorMix

  T09  PostProcessing
       Library: @react-three/postprocessing
       Effects:
         Bloom: luminanceThreshold:0.15, intensity:0.6, radius:0.8
         ChromaticAberration: offset [0.0008, 0] (very subtle)
       Note: SSR and SSAO are disabled (too expensive)


=== PAGE-SPECIFIC COMPONENTS ===

  Service pages (SP01–SP04):
    SP01 ServiceHero      — hero with service-specific headline + icon
    SP02 ServiceFeatures  — feature list in 2-col grid
    SP03 ServiceProcess   — service-specific process steps
    SP04 ServiceCTA       — inline CTA for service page

  Case Study pages (CS01–CS03):
    CS01 CaseStudyHero    — headline + client + result highlight
    CS02 CaseStudyContent — full article layout, rich text
    CS03 RelatedStudies   — 2-card grid of related cases

  About page (AB01–AB03):
    AB01 AboutHero        — company story headline
    AB02 MissionSection   — mission + values
    AB03 TrustSignals     — logos, awards, market presence

---

## 6. ANIMATION INVENTORY (30 animations)

EASING REFERENCE
  ease-enter:  cubic-bezier(0.16, 1, 0.3, 1)       easeOutExpo   — all reveals
  ease-exit:   cubic-bezier(0.7, 0, 1, 1)           easeInExpo    — things leaving
  ease-inout:  cubic-bezier(0.76, 0, 0.24, 1)       easeInOutQuart
  ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1)    easeOutBack   — buttons, pops
  ease-smooth: cubic-bezier(0.37, 0, 0.63, 1)       easeInOutSine — ambient
  ease-spring: Framer Motion spring, stiffness:260, damping:20

── PAGE LOAD SEQUENCE ──

A01  Navbar Appear
     lib: Framer Motion / trigger: mount, delay 0ms
     from: opacity:0, y:-20  to: opacity:1, y:0
     duration: 600ms / ease-enter

A02  Hero Badge
     lib: Framer Motion / trigger: mount, delay 200ms
     from: opacity:0, y:12, scale:0.95  to: opacity:1, y:0, scale:1
     duration: 500ms / ease-enter

A03  Hero Headline — SplitText Char Reveal
     lib: GSAP SplitText / trigger: mount, delay 400ms
     from: opacity:0, y:30, rotateX:10  to: opacity:1, y:0, rotateX:0
     stagger: 0.018s per character / duration per char: 800ms / ease:power4.out
     NOTE: rotateX requires transformPerspective:500 on parent

A04  Hero Subtext
     lib: Framer Motion / trigger: mount, delay 900ms
     from: opacity:0, y:16  to: opacity:1, y:0
     duration: 600ms / ease-enter

A05  Hero CTA Buttons
     lib: Framer Motion / trigger: mount, delay 1100ms
     from: opacity:0, y:12, scale:0.95  to: opacity:1, y:0, scale:1
     stagger: 0.1s between buttons / ease-bounce

A06  Neural Globe Materialize
     lib: Three.js shader / trigger: canvas mount, delay 300ms
     uniform u_progress: 0→1 over 1200ms (ease-enter)
     vertex: positions lerp from sphere center to surface via u_progress
     opacity of canvas wrapper: 0→1 / 800ms Framer Motion

── SCROLL REVEALS ──

A07  Section Heading Reveal
     lib: GSAP ScrollTrigger / trigger: element 15% in viewport
     from: opacity:0, y:24, filter:blur(8px)  to: opacity:1, y:0, blur:0
     duration: 600ms / ease-enter

A08  Card Grid Stagger
     lib: GSAP ScrollTrigger / trigger: grid container 20% in viewport
     from per card: opacity:0, y:32  to: opacity:1, y:0
     stagger: 0.08s / duration: 500ms / ease-enter

A09  CountUp Number
     lib: custom hook / trigger: element 30% in viewport
     from: 0  to: target  duration: 2000ms
     easing: easeOutCubic (fast start, slows near end)
     end snap: holds final value with brief scale(1.05)→scale(1)

A10  Process Line Draw
     lib: GSAP + SVG / trigger: section enters
     from: strokeDashoffset=pathLength  to: strokeDashoffset=0
     duration: 1200ms / ease-enter

A11  Process Step Stagger (fires after A10)
     lib: Framer Motion / trigger: after A10 complete
     from: opacity:0, scale:0.9  to: opacity:1, scale:1
     stagger: 0.2s / duration: 500ms / ease-bounce

── NAVIGATION ──

A12  Page Exit
     lib: Framer Motion AnimatePresence / trigger: route change start
     from: opacity:1, y:0  to: opacity:0, y:-16
     duration: 300ms / ease-exit

A13  Page Enter
     lib: Framer Motion / trigger: new route mounted
     from: opacity:0, y:20  to: opacity:1, y:0
     duration: 500ms / ease-enter

A16  Mobile Menu Open
     lib: Framer Motion / trigger: hamburger click
     backdrop: opacity:0→1 / 200ms
     panel: x:"-100%"→0 / 400ms / ease-enter
     links: stagger y:16→0 + opacity:0→1 / 0.07s each

── MICRO-INTERACTIONS ──

A14  Testimonial Slide
     lib: Framer Motion / trigger: arrow click or auto-timer
     exit: x:-100%, opacity:0 / 300ms / ease-exit
     enter: from x:100%, opacity:0 → 0, 1 / 400ms / ease-enter

A15  Accordion Open/Close
     lib: Framer Motion / trigger: click AccordionItem
     height: AnimatePresence / 0→auto / 350ms / ease-inout
     opacity: 0→1 / 200ms

A17  Button Hover Glow
     lib: CSS transition / trigger: :hover
     property: box-shadow  from: none  to: var(--glow-blue)
     duration: 200ms / var(--ease-enter) [CSS]

A18  Card Hover Lift
     lib: CSS transition / trigger: :hover
     translateY: 0→-6px / box-shadow: card→elevated / border: default→active
     duration: 250ms / var(--ease-enter) [CSS]

A19  Mouse Follow Light
     lib: vanilla JS rAF / trigger: mousemove (desktop only)
     property: CSS radial-gradient center position
     smoothing: lerp factor 0.08 (8% per frame) — feels magnetic not instant
     opacity: 0.12 (barely visible, creates depth not distraction)

A20  Card Border Pulse (ambient)
     lib: CSS keyframes / trigger: component mount, always-on
     property: border-color opacity oscillates rgba(0,212,255,0.08)→rgba(0,212,255,0.25)
     duration: 3000ms / ease-smooth / infinite alternate
     Applied: selected hero/results cards only (not all cards)

A21  Globe Rotation (ambient)
     lib: Three.js useFrame / trigger: continuous
     rotation.y += 0.003 per frame / mouse parallax lerped

A22  Particle Drift (ambient)
     lib: Three.js shader / trigger: continuous
     u_time uniform increments per frame, drives vertex drift

A23  Background Nebula (ambient)
     lib: CSS keyframes / trigger: :root / continuous
     property: background-position shift on the dark bg gradient
     duration: 20000ms / ease-smooth / infinite alternate
     magnitude: ±30px — barely perceptible, adds life

A24  Logo Gradient Rotate (ambient)
     lib: CSS keyframes / trigger: nav mount / continuous
     property: filter hue-rotate(0deg→360deg) on gradient icon
     duration: 12000ms / linear / infinite

A25  Nav Link Underline
     lib: CSS / trigger: :hover
     ::after pseudo: scaleX(0)→scaleX(1), transform-origin: left
     duration: 180ms / ease-enter [CSS]

A26  Scroll Reset on Route Change
     lib: Next.js router events / trigger: routeChangeStart
     window.scrollTo(0,0) — instant

A27  Proof Bar Marquee
     lib: CSS / trigger: always / pause on hover
     property: translateX: 0→-50% (duplicated content for seamless loop)
     duration: 20000ms / linear / infinite

A28  Input Focus Float Label
     lib: CSS / trigger: :focus or :not(:placeholder-shown)
     label: translateY(0)→translateY(-28px) + scale(0.85) + color shift
     border: default→active + glow
     duration: 200ms / ease-enter [CSS]

A29  Service Icon Hover
     lib: CSS / trigger: .service-card:hover .icon
     transform: scale(1.1) rotate(-5deg)
     duration: 300ms / ease-bounce [CSS]

A30  Final CTA Particles Emerge
     lib: Framer Motion / trigger: ScrollTrigger, section 20% in view
     Three.js particle opacity uniform: 0→1 / 800ms
     Then ambient drift continues (A22 variant)

── PERFORMANCE RULES ──

  ALL animations:
    Only transition opacity and transform properties
    Never trigger layout (no width, height, padding, margin animation)

  prefers-reduced-motion: @media:
    Disable A03, A06, A19, A20, A21, A22, A23, A24, A27, A30
    Keep: A17, A18, A28 (user-triggered, small magnitude)
    Keep: A12, A13 (but reduce to simple opacity only, 150ms)

  Mobile (<1024px):
    Disable: A19 (mouse follow — touch device)
    Disable: A21, A22, A30 (Three.js animations)
    Simplify: A03 (fade only, no rotateX)
    Keep: all scroll reveals, micro-interactions

---

## 7. THREE.JS ARCHITECTURE

TECH STACK
  @react-three/fiber (R3F)  v8+     React renderer for Three.js
  @react-three/drei          latest  Helpers: Stars, Environment, etc.
  @react-three/postprocessing         Bloom, chromatic aberration
  three                      r155+   Core Three.js
  glsl-shader-chunk                   Shader utilities

PERFORMANCE CONSTRAINTS
  Pixel ratio:     Math.min(devicePixelRatio, 2)  — never >2
  Antialias:       true
  Alpha:           true (transparent canvas)
  Tone mapping:    ACESFilmicToneMapping (cinematic)
  Output space:    SRGBColorSpace
  Power pref:      'high-performance'
  Particle max:    150 desktop / 0 mobile (canvas not rendered)
  Post-processing: Bloom only. No SSAO, no SSR, no heavy passes.
  Frame skip:      Page Visibility API — pause RAF when tab hidden
  Dispose:         All geometries, materials, textures disposed on unmount

SCENE GRAPH

  ThreeCanvas.tsx (dynamic import, Suspense)
  └── Canvas (R3F)
      ├── Scene.tsx
      │   ├── PerspectiveCamera
      │   │     FOV: 45 / near: 0.1 / far: 100
      │   │     Position: [0, 0, 5]
      │   │     Mouse parallax: pos.x/y += mouseNorm * 0.3, lerp 0.05
      │   │
      │   ├── EnvironmentLighting.tsx
      │   │     AmbientLight:  color #FFFFFF, intensity 0.05
      │   │     PointLight 1:  color #00D4FF, intensity 2.0, pos [3, 3, 3]
      │   │     PointLight 2:  color #6D5DFC, intensity 1.5, pos [-3,-2, 2]
      │   │     PointLight 3:  color #FFFFFF,  intensity 0.3, pos [0, 5, 0]
      │   │
      │   ├── NeuralGlobe/index.tsx
      │   │   ├── Globe.tsx
      │   │   │     Geometry: IcosahedronGeometry(2, 4) → EdgesGeometry
      │   │   │     Material: Custom ShaderMaterial
      │   │   │     Uniforms: u_time, u_color1(#00D4FF), u_color2(#6D5DFC)
      │   │   │               u_progress (0→1 materialize), u_glowIntensity
      │   │   │     Frag: fresnel rim + Y-based color gradient + alpha
      │   │   │
      │   │   ├── Nodes.tsx
      │   │   │     Geometry: Points (icosahedron vertex positions)
      │   │   │     Count: ~200 nodes
      │   │   │     Attributes: a_offset (per-node time offset), a_size
      │   │   │     Frag: circular billboard, pulse sin(u_time + a_offset)
      │   │   │     Color: #00D4FF / alpha 0.4–0.9
      │   │   │
      │   │   └── Connections.tsx
      │   │         Geometry: LineSegments (pre-computed at useMemo)
      │   │         Count: ~120 pairs of nearby vertices
      │   │         Attributes: a_lineOffset (per-line time seed)
      │   │         Frag: pulse travels along line via fract(u_time * speed + a_lineOffset)
      │   │         Color: mix(#00D4FF, #6D5DFC, vProgress_along_line)
      │   │
      │   ├── ParticleField/index.tsx
      │   │     Geometry: BufferGeometry, Float32Array positions
      │   │     Count: 150 (only rendered if window.innerWidth >= 1024)
      │   │     Attributes: a_offset, a_size, a_colorMix
      │   │     Vert: drift via sin(u_time*0.5 + a_offset), perspective size
      │   │     Frag: soft circular point, alpha 0.2–0.6, color mix
      │   │     Uniforms: u_time
      │   │
      │   └── PostProcessing.tsx
      │         EffectComposer (R3F postprocessing)
      │         ├── Bloom
      │         │     luminanceThreshold: 0.15
      │         │     luminanceSmoothing: 0.9
      │         │     intensity: 0.6
      │         │     radius: 0.8
      │         └── ChromaticAberration
      │               offset: [0.0008, 0]  ← barely visible, adds depth
      │               radialModulation: true

SHADERS DETAIL

  globe.frag.glsl:
    uniform vec3 u_color1;         // #00D4FF
    uniform vec3 u_color2;         // #6D5DFC
    uniform float u_time;
    uniform float u_glowIntensity;
    varying vec3 vNormal;
    varying vec3 vViewPosition;

    float fresnel = dot(normalize(vNormal), normalize(-vViewPosition));
    fresnel = clamp(1.0 - fresnel, 0.0, 1.0);
    float yGradient = (vWorldPosition.y + 2.0) / 4.0;
    vec3 color = mix(u_color1, u_color2, yGradient);
    float alpha = pow(fresnel, 2.0) * u_glowIntensity;
    gl_FragColor = vec4(color, alpha);

  particle.vert.glsl:
    attribute float a_offset;
    attribute float a_size;
    uniform float u_time;

    vec3 pos = position;
    pos.y += sin(u_time * 0.5 + a_offset) * 0.3;
    pos.x += cos(u_time * 0.3 + a_offset * 1.3) * 0.15;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = a_size * (300.0 / gl_Position.w);

  particle.frag.glsl:
    varying float v_colorMix;
    uniform vec3 u_color1;   // #00D4FF
    uniform vec3 u_color2;   // #6D5DFC
    uniform float u_time;

    vec2 uv = gl_PointCoord - 0.5;
    float dist = length(uv);
    if (dist > 0.5) discard;
    float alpha = (1.0 - dist * 2.0) * 0.5;
    alpha *= 0.4 + 0.3 * sin(u_time + v_colorMix * 6.28);
    vec3 color = mix(u_color1, u_color2, v_colorMix);
    gl_FragColor = vec4(color, alpha);

MOBILE FALLBACK — GlowOrb (CSS only, no JS)
  Animated radial gradient that pulses and shifts
  Colors: #00D4FF → #6D5DFC → transparent
  Size: 60vw × 60vw, centered, position absolute
  Animation: scale 0.9→1.1→0.9 + hue-rotate, 4s infinite
  Performance: CSS transforms only, GPU composited

---

## 8. COMPLETE FOLDER STRUCTURE

quionai/
│
├── public/
│   ├── fonts/
│   │   ├── SpaceGrotesk-Variable.woff2
│   │   └── Inter-Variable.woff2
│   ├── images/
│   │   ├── logo/
│   │   │   ├── quionai-white.svg       ← nav default (white icon + white text)
│   │   │   ├── quionai-gradient.svg    ← website premium (gradient icon + white text)
│   │   │   └── quionai-dark.svg        ← docs/light bg (black icon + black text)
│   │   ├── og/
│   │   │   └── og-default.jpg          ← 1200×630, branded
│   │   ├── clients/                    ← client logos as .webp
│   │   └── case-studies/               ← case study imagery
│   ├── favicon.ico
│   ├── icon.png                         ← 32×32
│   └── apple-touch-icon.png             ← 180×180
│
├── src/
│   │
│   ├── app/
│   │   ├── layout.tsx                   ← root: fonts, metadata, providers
│   │   ├── page.tsx                     ← homepage
│   │   ├── not-found.tsx
│   │   ├── error.tsx
│   │   ├── loading.tsx
│   │   ├── sitemap.ts                   ← auto XML sitemap
│   │   ├── robots.ts
│   │   │
│   │   ├── (marketing)/
│   │   │   ├── layout.tsx               ← navbar + footer + page transition
│   │   │   ├── services/
│   │   │   │   ├── page.tsx             ← services overview
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx         ← individual service
│   │   │   ├── about/
│   │   │   │   └── page.tsx
│   │   │   ├── case-studies/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx
│   │   │   ├── blog/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx
│   │   │   └── contact/
│   │   │       └── page.tsx
│   │   │
│   │   ├── book/
│   │   │   └── page.tsx                 ← strategy call (Calendly embed)
│   │   └── thank-you/
│   │       └── page.tsx
│   │
│   ├── components/
│   │   │
│   │   ├── layout/
│   │   │   ├── Navbar.tsx               ← L03
│   │   │   ├── MobileMenu.tsx           ← L04
│   │   │   ├── Footer.tsx               ← L05
│   │   │   └── PageTransition.tsx       ← L06
│   │   │
│   │   ├── ui/
│   │   │   ├── Button.tsx               ← P01
│   │   │   ├── Badge.tsx                ← P02
│   │   │   ├── GlassCard.tsx            ← P03
│   │   │   ├── Input.tsx                ← P04
│   │   │   ├── Textarea.tsx             ← P05
│   │   │   ├── Select.tsx               ← P06
│   │   │   ├── Accordion.tsx            ← P07
│   │   │   ├── AccordionItem.tsx        ← P08
│   │   │   ├── Modal.tsx                ← P09
│   │   │   ├── Tooltip.tsx              ← P10
│   │   │   ├── Divider.tsx              ← P11
│   │   │   ├── Avatar.tsx               ← P12
│   │   │   └── Spinner.tsx              ← P13
│   │   │
│   │   ├── shared/
│   │   │   ├── AnimatedHeadline.tsx     ← S01
│   │   │   ├── GradientText.tsx         ← S02
│   │   │   ├── CountUp.tsx              ← S03
│   │   │   ├── SectionLabel.tsx         ← S04
│   │   │   ├── SectionWrapper.tsx       ← L07/S05
│   │   │   ├── ScrollReveal.tsx         ← S06
│   │   │   ├── MouseFollowLight.tsx     ← S07
│   │   │   ├── GlowOrb.tsx              ← S08
│   │   │   ├── ParallaxLayer.tsx        ← S09
│   │   │   └── VideoModal.tsx           ← S10
│   │   │
│   │   ├── sections/
│   │   │   ├── Hero/
│   │   │   │   ├── index.tsx            ← H01
│   │   │   │   ├── HeroBadge.tsx        ← H02
│   │   │   │   ├── HeroHeadline.tsx     ← H03
│   │   │   │   ├── HeroCTA.tsx          ← H04
│   │   │   │   └── HeroScene.tsx        ← H05
│   │   │   ├── SocialProofBar/
│   │   │   │   └── index.tsx            ← H06
│   │   │   ├── Services/
│   │   │   │   ├── index.tsx            ← H07
│   │   │   │   └── ServiceCard.tsx      ← H08
│   │   │   ├── HowItWorks/
│   │   │   │   ├── index.tsx            ← H09
│   │   │   │   ├── ProcessStep.tsx      ← H10
│   │   │   │   └── ProcessConnector.tsx ← H11
│   │   │   ├── Results/
│   │   │   │   ├── index.tsx            ← H12
│   │   │   │   ├── StatCard.tsx         ← H13
│   │   │   │   └── CaseStudyPreview.tsx ← H14
│   │   │   ├── AIDemo/
│   │   │   │   ├── index.tsx            ← H15
│   │   │   │   ├── DemoChat.tsx         ← H16
│   │   │   │   └── DemoPhone.tsx        ← H17
│   │   │   ├── Testimonials/
│   │   │   │   ├── index.tsx            ← H18
│   │   │   │   └── TestimonialCard.tsx  ← H19
│   │   │   ├── FAQ/
│   │   │   │   └── index.tsx            ← H20
│   │   │   └── FinalCTA/
│   │   │       └── index.tsx            ← H21
│   │   │
│   │   └── three/
│   │       ├── ThreeCanvas.tsx          ← T01
│   │       ├── Scene.tsx                ← T02
│   │       ├── EnvironmentLighting.tsx  ← T03
│   │       ├── PostProcessing.tsx       ← T09
│   │       ├── NeuralGlobe/
│   │       │   ├── index.tsx            ← T04
│   │       │   ├── Globe.tsx            ← T05
│   │       │   ├── Nodes.tsx            ← T06
│   │       │   ├── Connections.tsx      ← T07
│   │       │   └── shaders/
│   │       │       ├── globe.vert.glsl
│   │       │       ├── globe.frag.glsl
│   │       │       ├── nodes.vert.glsl
│   │       │       ├── nodes.frag.glsl
│   │       │       └── connections.frag.glsl
│   │       ├── ParticleField/
│   │       │   ├── index.tsx            ← T08
│   │       │   └── shaders/
│   │       │       ├── particle.vert.glsl
│   │       │       └── particle.frag.glsl
│   │       └── HolographicCard/
│   │           ├── index.tsx
│   │           └── shaders/
│   │               └── holo.frag.glsl
│   │
│   ├── hooks/
│   │   ├── useMousePosition.ts          ← normalized -1 to 1 mouse coords
│   │   ├── useScrollProgress.ts         ← 0–1 page scroll position
│   │   ├── useReducedMotion.ts          ← prefers-reduced-motion hook
│   │   ├── useCountUp.ts                ← counter animation logic
│   │   ├── useInView.ts                 ← Intersection Observer wrapper
│   │   ├── useWindowSize.ts             ← responsive breakpoint checks
│   │   └── useGSAP.ts                   ← GSAP context + ScrollTrigger setup
│   │
│   ├── lib/
│   │   ├── fonts.ts                     ← next/font: Space Grotesk + Inter
│   │   ├── metadata.ts                  ← generateMetadata factory function
│   │   ├── schema.ts                    ← JSON-LD structured data generators
│   │   ├── gsap.ts                      ← GSAP plugin registration (ScrollTrigger, SplitText)
│   │   ├── three.ts                     ← Three.js shared config + math helpers
│   │   ├── utils.ts                     ← cn(), clamp(), lerp(), formatters
│   │   └── constants.ts                 ← site URL, nav items, service slugs
│   │
│   ├── data/
│   │   ├── services.ts                  ← 8 service definitions + metadata
│   │   ├── testimonials.ts              ← client testimonials
│   │   ├── faqs.ts                      ← FAQ Q&A pairs
│   │   ├── stats.ts                     ← proof bar stats, result numbers
│   │   ├── caseStudies.ts               ← case study previews
│   │   └── navigation.ts                ← nav links, footer links
│   │
│   ├── types/
│   │   ├── index.ts                     ← barrel re-exports
│   │   ├── service.ts                   ← Service interface
│   │   ├── testimonial.ts               ← Testimonial interface
│   │   ├── caseStudy.ts                 ← CaseStudy interface
│   │   └── global.d.ts                  ← GLSL module declarations, SVG types
│   │
│   └── styles/
│       ├── globals.css                  ← CSS reset, html/body, base
│       ├── tokens.css                   ← ALL --css-custom-properties
│       └── animations.css               ← @keyframes: pulse, nebula, marquee, orb
│
├── .env.local                           ← CALENDLY_URL, SITE_URL (gitignored)
├── .env.example                         ← template
├── .eslintrc.json
├── .gitignore
├── next.config.ts                       ← image domains, webpack GLSL loader
├── tailwind.config.ts                   ← extends tokens into Tailwind classes
├── tsconfig.json                        ← strict mode, path aliases
├── postcss.config.js
└── package.json

---

## PACKAGE.JSON DEPENDENCIES (planned)

CORE
  next@14                    App Router
  react@18                   Concurrent mode
  react-dom@18
  typescript@5

STYLING
  tailwindcss@3              Utility classes
  postcss
  autoprefixer
  clsx                       className utility
  tailwind-merge             Safe class merging

ANIMATION
  framer-motion@11           React animations + scroll
  gsap@3                     Advanced timelines + ScrollTrigger
  @gsap/react                React context for GSAP

THREE.JS
  three@0.160+               3D engine
  @react-three/fiber@8       R3F renderer
  @react-three/drei          Helpers + abstractions
  @react-three/postprocessing Bloom + effects

UI UTILITIES
  @radix-ui/react-accordion  Accessible accordion primitive
  @radix-ui/react-dialog     Accessible modal primitive
  @radix-ui/react-tooltip    Accessible tooltip
  react-player               Video embed (demo modal)

SEO + FONTS
  next (built-in font, metadata, sitemap support)

TYPE CHECKING
  @types/three
  @types/node
  @types/react
  @types/react-dom

DEV
  eslint
  eslint-config-next
  prettier

---

## KEY ARCHITECTURAL DECISIONS

1. GRADIENT ECONOMY
   The blue→purple gradient is the brand's most valuable visual asset.
   It appears in: logo icon, 1-2 headline words per page, CTA hover glow.
   It NEVER appears in: section backgrounds, card fills, body text.

2. THREE.JS LOADING STRATEGY
   Never blocks page render. Dynamic import + Suspense with CSS fallback.
   Canvas is completely invisible to Lighthouse until after first paint.
   This protects LCP score (target <2.5s).

3. GLASS MORPHISM DISCIPLINE
   Not every card is glass. Glass is used for:
     - Service cards (always)
     - Testimonial cards (always)
     - Hero overlay elements
     - Navbar scrolled state
   Plain surface bg (#0F172A) used for: stats section, process section.
   Too much glass = the brand loses premium gravity.

4. MOBILE THREE.JS POLICY
   Zero Three.js on mobile. Period. The CSS GlowOrb delivers the visual
   emotion at 1% of the compute cost. This is a business site — conversion
   over spectacle on mobile. Battery life matters to prospects.

5. TYPE SCALE — FLUID NOT FIXED
   All headline sizes use clamp(). Zero media query overrides on type.
   This eliminates the jarring jump at breakpoints and feels native.

6. COLOR — BLUE IS EARNED
   #00D4FF only appears where the user CAN or SHOULD interact.
   Overusing it collapses its CTA signal. Muted (#94A3B8) does the heavy
   lifting for all descriptive content.

7. ANIMATION SEQUENCING
   The hero sequence is the most important moment on the site.
   Total time from paint to CTAs visible: <1.5s.
   Each element has a purpose-built delay. Nothing animates "because it can."

8. DATA LAYER
   Services, testimonials, FAQ, and stats are all TypeScript data files.
   No CMS dependency for launch. Can be migrated to Contentful/Sanity later
   by replacing the import with a fetch and matching the same interface.

---
Status: APPROVED — READY FOR IMPLEMENTATION
Next: Initialize Next.js project, install dependencies, build tokens.css + globals.css first.
