import {
  Hero,
  SafetyBanner,
  Services,
  Footer,
} from "@components/landing/index";
const footerLinks = [
  { text: "", href: "/" },
  { text: "", href: "/" },
  { text: "", href: "/" },
  { text: "", href: "/" },
];

/**
 * Component that renders the landing page of the application.
 *
 * This component renders the application's home screen,
 * where the home section (hero), the services section, the security section and the footer are shown,
 * the security section and the footer.
 *
 * @returns {JSX.Element} A JSX element representing the home screen.
 */
const LandingPage = () => {
  return (
    <div className="bg-fixed bg-celeste-10 bg-blur-md bg-opacity-50 overflow-y-hidden">
      <Hero />
      <div className="p-5">
        <Services />
        <SafetyBanner
          badge=""
          title="Estacionarse ya no será un problema"
          description="Rápido, seguro y eficiente"
          srcImage={"https://i.ytimg.com/vi/dQjntXvMVTE/maxresdefault.jpg"}
          altImage="Car"
        />
      </div>
      <Footer
        logoSrc="/src/assets/images/logo_esfot_buho.png"
        logoAlt="Logo del parqueadero"
        links={footerLinks}
      />
    </div>
  );
};

export default LandingPage;
