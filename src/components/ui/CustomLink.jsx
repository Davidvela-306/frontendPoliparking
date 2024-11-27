import { Link } from "react-router-dom";
export const CustomLink = ({ route, text, className }) => {
  return (
    <Link
      to={route}
      className={`${className} text-azul-10 flex justify-end underline underline-offset-4 hover:text-azul-20`}
    >
      {text}
    </Link>
  );
};

export default CustomLink;
