import * as React from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

/**
 * @typedef {Object} FloatingIconData
 * @property {number} id
 * @property {React.FC<React.SVGProps<SVGSVGElement>>} icon
 * @property {string} className
 * @property {number} [floatDuration]
 */

export function FloatingIcon({
  mouseX,
  mouseY,
  iconData,
  index,
  cardClassName,
  iconClassName,
}) {
  const ref = React.useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });
  const IconComponent = iconData.icon;
  const floatDuration = iconData.floatDuration ?? 5 + (index % 7) * 0.85;

  React.useEffect(() => {
    const handleMouseMove = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const distance = Math.hypot(mouseX.current - cx, mouseY.current - cy);

      if (distance < 150) {
        const angle = Math.atan2(mouseY.current - cy, mouseX.current - cx);
        const force = (1 - distance / 150) * 50;
        x.set(-Math.cos(angle) * force);
        y.set(-Math.sin(angle) * force);
      } else {
        x.set(0);
        y.set(0);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [x, y, mouseX, mouseY]);

  return (
    <motion.div
      ref={ref}
      key={iconData.id}
      style={{ x: springX, y: springY }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: index * 0.06,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn('absolute', iconData.className)}
    >
      <motion.div
        className={cn(
          'flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 p-2.5 md:p-3 rounded-2xl md:rounded-3xl',
          'shadow-xl backdrop-blur-md border',
          'bg-card/80 border-border/10',
          cardClassName,
        )}
        animate={{
          y: [0, -8, 0, 8, 0],
          x: [0, 6, 0, -6, 0],
          rotate: [0, 5, 0, -5, 0],
        }}
        transition={{
          duration: floatDuration,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut',
        }}
      >
        <IconComponent
          className={cn('w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 text-foreground', iconClassName)}
        />
      </motion.div>
    </motion.div>
  );
}

/** Icons-only layer for sections (e.g. editor portfolio between Featured Work and Contact). */
export function FloatingIconsLayer({
  icons,
  className,
  cardClassName,
  iconClassName,
}) {
  const mouseX = React.useRef(0);
  const mouseY = React.useRef(0);

  const handleMouseMove = (event) => {
    mouseX.current = event.clientX;
    mouseY.current = event.clientY;
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className={cn('absolute inset-0 w-full h-full overflow-hidden pointer-events-none', className)}
      aria-hidden
    >
      <div className="absolute inset-0 w-full h-full">
        {icons.map((iconData, index) => (
          <FloatingIcon
            key={iconData.id}
            mouseX={mouseX}
            mouseY={mouseY}
            iconData={iconData}
            index={index}
            cardClassName={cardClassName}
            iconClassName={iconClassName}
          />
        ))}
      </div>
    </div>
  );
}

const FloatingIconsHero = React.forwardRef(
  (
    {
      className,
      title,
      subtitle,
      ctaText,
      ctaHref,
      icons,
      cardClassName,
      iconClassName,
      ...props
    },
    ref,
  ) => {
    const mouseX = React.useRef(0);
    const mouseY = React.useRef(0);

    const handleMouseMove = (event) => {
      mouseX.current = event.clientX;
      mouseY.current = event.clientY;
    };

    return (
      <section
        ref={ref}
        onMouseMove={handleMouseMove}
        className={cn(
          'relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-background',
          className,
        )}
        {...props}
      >
        <div className="absolute inset-0 w-full h-full">
          {icons.map((iconData, index) => (
            <FloatingIcon
              key={iconData.id}
              mouseX={mouseX}
              mouseY={mouseY}
              iconData={iconData}
              index={index}
              cardClassName={cardClassName}
              iconClassName={iconClassName}
            />
          ))}
        </div>

        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-b from-foreground to-foreground/70 text-transparent bg-clip-text">
            {title}
          </h1>
          <p className="mt-6 max-w-xl mx-auto text-lg text-muted-foreground">{subtitle}</p>
          <div className="mt-10">
            <Button asChild size="lg" className="px-8 py-6 text-base font-semibold">
              <a href={ctaHref}>{ctaText}</a>
            </Button>
          </div>
        </div>
      </section>
    );
  },
);
FloatingIconsHero.displayName = 'FloatingIconsHero';

export { FloatingIconsHero };
