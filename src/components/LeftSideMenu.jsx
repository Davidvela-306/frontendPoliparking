import ButtonMenu from "./ui/ButtonMenu.jsx";

function LeftSideMenu({ data }) {
  return (
    <nav>
      <ul>
        {data.map((item) => (
          <ButtonMenu key={item.id} item={item} />
        ))}
      </ul>
    </nav>
  );
}

export default LeftSideMenu;
