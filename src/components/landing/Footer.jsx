const Footer = ({ logoSrc, logoAlt, links }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo y copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            {logoSrc && (
              <img src={logoSrc} alt={logoAlt || "Logo"} className="h-12" />
            )}
            <span className="text-xl sm:text-2xl font-bold">PoliParking</span>
          </div>

          {/* Copyright */}
          <p className="text-center text-sm text-gray-400">
            &copy; {currentYear} Parqueadero System. Todos los derechos
            reservados.
          </p>
        </div>

        {/* Enlaces */}
        {links && links.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
            <ul className="flex flex-wrap justify-center gap-6 text-sm">
              {links.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="hover:text-white transition-colors"
                    target={link.target || "_self"}
                    rel={link.target === "_blank" ? "noopener noreferrer" : ""}
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;
