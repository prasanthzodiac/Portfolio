import React from "react";

export const GlassFilter = () => (
  <svg style={{ display: "none" }}>
    <filter
      id="glass-distortion"
      x="0%"
      y="0%"
      width="100%"
      height="100%"
      filterUnits="objectBoundingBox"
    >
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.001 0.005"
        numOctaves="1"
        seed="17"
        result="turbulence"
      />
      <feComponentTransfer in="turbulence" result="mapped">
        <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
        <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
        <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
      </feComponentTransfer>
      <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />
      <feSpecularLighting
        in="softMap"
        surfaceScale="5"
        specularConstant="1"
        specularExponent="100"
        lightingColor="white"
        result="specLight"
      >
        <fePointLight x="-200" y="-200" z="300" />
      </feSpecularLighting>
      <feComposite
        in="specLight"
        operator="arithmetic"
        k1="0"
        k2="1"
        k3="1"
        k4="0"
        result="litImage"
      />
      <feDisplacementMap
        in="SourceGraphic"
        in2="softMap"
        scale="60"
        xChannelSelector="R"
        yChannelSelector="G"
      />
    </filter>
  </svg>
);

export const GlassEffect = ({
  children,
  className = "",
  style = {},
  onClick,
  href,
  download,
  target = "_self",
}) => {
  const glassStyle = {
    boxShadow: "0 6px 6px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1)",
    transitionTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 2.2)",
    ...style,
  };

  const content = (
    <div
      onClick={onClick}
      className={`group relative flex items-center justify-center overflow-hidden cursor-pointer transition-all duration-700 ${className}`}
      style={glassStyle}
    >
      {/* Flowing Outline Animation */}
      <div 
        className="absolute inset-0 z-40 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
        style={{
          borderRadius: 'inherit',
          padding: '2px', // Border width
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      >
        <div className="absolute top-1/2 left-1/2 w-[300%] aspect-square bg-[conic-gradient(transparent_70%,#FFFFFF_100%)] origin-center -translate-x-1/2 -translate-y-1/2 animate-[spin_2s_linear_infinite]" />
      </div>

      {/* Glass Layers */}
      <div
        className="absolute inset-0 z-0 overflow-hidden"
        style={{
          backdropFilter: "blur(12px)",
          filter: "url(#glass-distortion)",
          isolation: "isolate",
          borderRadius: "inherit",
        }}
      />
      <div
        className="absolute inset-0 z-10"
        style={{ background: "rgba(255, 255, 255, 0.03)", borderRadius: "inherit" }}
      />
      <div
        className="absolute inset-0 z-20 overflow-hidden"
        style={{
          boxShadow:
            "inset 1px 1px 1px 0 rgba(255, 255, 255, 0.4), inset -1px -1px 1px 0 rgba(255, 255, 255, 0.1)",
          borderRadius: "inherit",
        }}
      />

      {/* Content */}
      <div className="relative z-30">{children}</div>
    </div>
  );

  return href ? (
    <a href={href} download={download} target={target} rel={target === "_blank" ? "noopener noreferrer" : undefined} className="block">
      {content}
    </a>
  ) : (
    content
  );
};
