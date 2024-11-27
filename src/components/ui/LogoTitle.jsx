export const LogoTitle = ({ imgSrc, imgAlt, text }) => {
  return (
    <div className="flex items-center">
      <img src={imgSrc} alt={imgAlt} className="w-16" />
      <p className="text-3xl font-bold text-white">{text}</p>
    </div>
  );
};

export default LogoTitle;
