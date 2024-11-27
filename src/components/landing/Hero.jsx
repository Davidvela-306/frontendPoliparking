/**
 * Hero component renders a full-screen section with a fixed background
 * pattern, containing a centered and styled title "Poli Parking".
 * It includes a semi-transparent blurred overlay and text with a stroke
 * effect for enhanced readability.
 */
const Hero = () => {
  return (
    <section className="hero w-full min-h-screen bg-hero-pattern bg-fixed bg-no-repeat bg-center bg-cover flex items-center">
      <div className="w-full h-full flex justify-center items-center">
        <div className="rounded-md p-5 relative overflow-hidden">
          {/* Fondo interno con desenfoque */}
          <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-filter backdrop-blur-md"></div>
          {/* Título */}
          <h1
            className="relative z-10 text-transparent uppercase tracking-widest text-center"
            style={{
              fontSize: "clamp(2rem, 6vw, 8rem)",
              WebkitTextStroke: "1px #ffffff",
              wordBreak: "break-word",
              letterSpacing: "0.2em",
            }}
          >
            <span className="block sm:inline">Poli</span>{" "}
            <span className="block sm:inline">Parking</span>
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Hero;
