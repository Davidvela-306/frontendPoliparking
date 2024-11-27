import { Link, useLocation } from "react-router-dom";

export const ButtonMenu = ({ item }) => {
  const location = useLocation();
  const isActive = location.pathname === item.path;

  return (
    <li
      className={`w-auto flex justify-center py- px-2 mx-2 my-1 rounded-md font-medium text-lg text-white bg-celeste-10 cursor-pointer hover:bg-celeste-10 hover:text-azul-10 ${
        isActive ? "" : ""
      }`}
    >
      <Link
        to={item.path}
        className="w-full h-full flex items-center justify-center"
      >
        {item.title}
      </Link>
    </li>
  );
};

export default ButtonMenu;
