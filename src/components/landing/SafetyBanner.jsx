
/**
 * A banner component to highlight the safety features of the parking system.
 *
 * @param {{badge: string, title: string, srcImage: string, altImage?: string, description: string, note?: string}} props
 * @prop {string} badge A badge to highlight the safety feature
 * @prop {string} title The title of the safety feature
 * @prop {string} srcImage The source of the image to be displayed
 * @prop {string} [altImage="Image description"] The alt text of the image
 * @prop {string} description A short description of the safety feature
 * @prop {string} [note] An optional note to be displayed below the description
 * @returns {ReactElement} A React element representing the safety banner
 */
const SafetyBanner = ({
  badge,
  title,
  srcImage,
  altImage = "Image description",
  description,
  note,
}) => {
  return (
    <div className="flex flex-col items-center bg-azul-10 py-8 px-6 sm:px-10 lg:px-28 rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <h2 className="text-xs font-semibold text-indigo-600 uppercase tracking-widest">
          {badge}
        </h2>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4">
          {title}
        </h1>
        <p className="text-gray-400 mt-4 text-sm sm:text-lg">{description}</p>
      </div>

      <div className="relative mt-8 md:w-1/2 flex justify-center">
        <img
          src={srcImage}
          alt={altImage}
          className="z-10 shadow-md max-w-full rounded-md"
        />
      </div>

      {note && (
        <p className="text-xs text-gray-500 mt-5 italic text-center">{note}</p>
      )}
    </div>
  );
};

export default SafetyBanner;
