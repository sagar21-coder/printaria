---
name: Digital Streetwear Underground
colors:
  surface: '#141218'
  surface-dim: '#141218'
  surface-bright: '#3b383e'
  surface-container-lowest: '#0f0d13'
  surface-container-low: '#1d1b20'
  surface-container: '#211f24'
  surface-container-high: '#2b292f'
  surface-container-highest: '#36343a'
  on-surface: '#e6e0e9'
  on-surface-variant: '#cbc4d2'
  inverse-surface: '#e6e0e9'
  inverse-on-surface: '#322f35'
  outline: '#948e9c'
  outline-variant: '#494551'
  surface-tint: '#cfbcff'
  primary: '#cfbcff'
  on-primary: '#381e72'
  primary-container: '#6750a4'
  on-primary-container: '#e0d2ff'
  inverse-primary: '#6750a4'
  secondary: '#cdc0e9'
  on-secondary: '#342b4b'
  secondary-container: '#4d4465'
  on-secondary-container: '#bfb2da'
  tertiary: '#e7c365'
  on-tertiary: '#3e2e00'
  tertiary-container: '#c9a74d'
  on-tertiary-container: '#503d00'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e9ddff'
  primary-fixed-dim: '#cfbcff'
  on-primary-fixed: '#22005d'
  on-primary-fixed-variant: '#4f378a'
  secondary-fixed: '#e9ddff'
  secondary-fixed-dim: '#cdc0e9'
  on-secondary-fixed: '#1f1635'
  on-secondary-fixed-variant: '#4b4263'
  tertiary-fixed: '#ffdf93'
  tertiary-fixed-dim: '#e7c365'
  on-tertiary-fixed: '#241a00'
  on-tertiary-fixed-variant: '#594400'
  background: '#141218'
  on-background: '#e6e0e9'
  surface-variant: '#36343a'
typography:
  display-xl:
    fontFamily: Bebas Neue
    fontSize: 120px
    fontWeight: '400'
    lineHeight: 100px
    letterSpacing: -0.02em
  display-lg:
    fontFamily: Bebas Neue
    fontSize: 80px
    fontWeight: '400'
    lineHeight: 72px
  display-lg-mobile:
    fontFamily: Bebas Neue
    fontSize: 48px
    fontWeight: '400'
    lineHeight: 44px
  headline-md:
    fontFamily: Bebas Neue
    fontSize: 40px
    fontWeight: '400'
    lineHeight: 40px
  body-lg:
    fontFamily: Syne
    fontSize: 20px
    fontWeight: '700'
    lineHeight: '1.4'
  body-md:
    fontFamily: Syne
    fontSize: 16px
    fontWeight: '500'
    lineHeight: '1.5'
  label-mono:
    fontFamily: Space Mono
    fontSize: 12px
    fontWeight: '400'
    lineHeight: '1.2'
    letterSpacing: 0.1em
  label-mono-bold:
    fontFamily: Space Mono
    fontSize: 14px
    fontWeight: '700'
    lineHeight: '1.2'
spacing:
  unit: 4px
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 40px
  stack-sm: 8px
  stack-md: 24px
  stack-lg: 64px
---

## Brand & Style
This design system embodies the raw energy of underground zine culture translated into a digital interface. The personality is aggressive, unapologetic, and fast-paced. It targets a subculture of creators and collectors who value authenticity over polish. 

The aesthetic is built on **Kinetic Brutalism**: a high-contrast framework where elements feel like they were pasted onto the screen. It utilizes intentional grid breaks, overlapping layers, and a total absence of gradients or soft shadows to maintain a sharp, digital edge. The UI should evoke the feeling of a xeroxed flyer brought to life with neon signals.

## Colors
The palette is rooted in a "Near-black" abyss to allow the neon accents to vibrate against the screen. 
- **Acid Yellow (#E8FF00)** is the primary disruptor, used for critical actions and "loud" information.
- **Saturated Violet (#7B2FFF)** provides depth and acts as a secondary structural color.
- **Icy Mint (#B8FFD9)** is used for success states or subtle technical highlights.
- **Chalk White (#FFFFFF)** is used for high-impact text and thick, structural borders.

Do not use transparency or gradients. Colors must remain flat and saturated to preserve the "printed" streetwear feel.

## Typography
Typography is the primary visual driver. 
- **Bebas Neue** is the "Display" voice. It must be massive and condensed. Use it for headers that demand attention, often breaking the container or bleeding off the edge.
- **Syne** provides a modern, artistic weight for body copy. Its unique letterforms maintain the "street" character without sacrificing legibility.
- **Space Mono** handles all technical data, labels, and small metadata. It reinforces the "digital" aspect of the brand.

Avoid standard sentence case for headlines; prefer all-caps for everything except body paragraphs.

## Layout & Spacing
The layout follows a **Fixed Grid with Intentional Breaks**. Use a 12-column grid for desktop, but allow specific "hero" elements to ignore the grid entirely—overlapping other components or shifting -20px to +40px off the vertical axis to create a "pasted" look.

Margins are tight and aggressive. Gutters should be visible through the use of vertical and horizontal rules (1px white lines) to give the interface a blueprint/zine structure. Elements should be stacked with varying spacing units to avoid a "clean" or "corporate" rhythm.

## Elevation & Depth
Depth is created through **Layered Stacking**, not shadows. 
- **Tier 1:** Base background (#0A0A0A).
- **Tier 2:** Component containers with a 2px solid white or Acid Yellow border.
- **Tier 3:** High-priority pop-ups or "stickers" that overlap other content.

To simulate elevation, use a **Hard Offset Shadow**: a solid block of Secondary Violet or Primary Acid Yellow shifted 4px down and 4px right behind the element. Never use blur.

## Shapes
The shape language is strictly **Sharp (0px)**. Roundness is forbidden as it softens the brand's aggressive edge. 

All containers, buttons, and input fields must have 90-degree corners. For specific "Streetwear" accents, use diagonal clipped corners (45-degree cuts) on decorative elements or image frames to create a sense of motion and raw cutting.

## Components
- **Buttons:** Rectangular with 2px solid borders. Default state is white border/text; Hover state is a solid Acid Yellow fill with black text. Hard-offset "shadow" blocks (solid Violet) appear on active click.
- **Input Fields:** Bottom-border only, 2px white. Labels use Space Mono and sit above the line. Error states change the border and text to Acid Yellow.
- **Cards:** No background fill. Defined by a 1px white border. Titles should bleed outside the card border slightly (negative margin).
- **Chips/Labels:** Solid Acid Yellow background with Black Space Mono text. These should look like price tags or stickers slapped onto the UI.
- **Lists:** Separated by 1px white horizontal rules. Hovering over a list item triggers a rapid "glitch" color shift or a solid Violet background.
- **Images:** Always use a high-contrast filter. Images should be framed in containers that appear slightly tilted (1-2 degrees) to mimic physical zine cutouts.