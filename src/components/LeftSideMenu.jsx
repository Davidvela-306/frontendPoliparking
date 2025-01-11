import ButtonMenu from "./ui/ButtonMenu.jsx";
import { useAuth } from "@/context/AuthContext.jsx";
// import Avatar from "./ui/Avatar.jsx";
const Avatar = ({ src, alt, size = 40 }) => {
  return (
    <div className="flex justify-center items-center">
      <img src={src} alt={alt} className={`rounded-full w-${size} h-${size}`} />
    </div>
  );
};

function LeftSideMenu({ data }) {
  const { user } = useAuth();
  if (!user) return <p>No hay usuario</p>;
  if (!data) return <p>No hay datos</p>;
  return (
    <nav>
      <div className="flex flex-col items-center m-5">
        <Avatar
          src="https://cdn-icons-png.flaticon.com/128/2698/2698175.png"
          alt={user.nombre}
          size={16}
        />
        <br />
        <div className="flex flex-row items-center">
          <h3 className="text-center text-white">{user.nombre}</h3>
          <h3 className="text-center text-amarillo-10">&#160;-&#160;</h3>
          <h3 className="text-center text-white">{user.rol}</h3>
        </div>
      </div>
      <ul>
        {data.map((item) => (
          <ButtonMenu key={item.id} item={item} />
        ))}
      </ul>
    </nav>
  );
}

export default LeftSideMenu;
