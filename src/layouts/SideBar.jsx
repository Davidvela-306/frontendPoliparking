import "../styles/sideBar.css";
import { Link } from "react-router-dom";
import logoEsfotBuho from "@assets/images/logo_esfot_buho.png";

import Header from "../components/Header";
import LeftSideMenu from "../components/LeftSideMenu";
import {
  adminNavData,
  GeneralNavData,
  guardiaNavData,
  usuarioNavData,
} from "../assets/data/NavData";
import { Card } from "../components/ui";

export const SideBar = ({ header, leftSide, children }) => {
  return (
    <section className="layout">
      <section className="header">
        {header || <div>Default Header</div>}
      </section>
      <section className="leftSide">
        {leftSide || <div>Default Left Side</div>}
      </section>
      <section className="body">
        <Card>{children || <div>Default Body Content</div>}</Card>
      </section>
    </section>
  );
};

export const MainLayout = ({ header, children }) => {
  return (
    <section className="w-full h-screen">
      <section className="sticky top-0 z-50">
        {header || <div>Default Header</div>}
      </section>
      <section className="body flex-1 overflow-y-auto">
        {children || <div>Default body content</div>}
      </section>
    </section>
  );
};

export const NewHeader = ({ logo, navItems, isAuth, location }) => {
  const showMenu = !isAuth && location.pathname !== "/singin";

  return (
    <nav className="flex justify-between items-center w-full bg-blue-900 py-2 px-10 gap-10">
      <div className="flex flex-1 items-center justify-between">
        <Link to={"/"} className="hover:underline ">
          <img
            src={logo}
            alt="PoliParking EPN"
            className="w-[50%] md:w-[20%] lg:w-[15%]"
          />
        </Link>
      </div>
      {showMenu && (
        <div className="flex flex-1 items-center justify-end">
          {navItems.map((item) => {
            return (
              <Link
                key={item.id}
                to={item.path}
                className="bg-azul-20 p-2 rounded-lg"
              >
                <p className="text-amarillo-10">{item.title}</p>
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
};
export const DefaultLayout = ({ children, isAuth, location }) => {
  return (
    <MainLayout
      header={
        <NewHeader
          logo={logoEsfotBuho}
          navItems={GeneralNavData}
          isAuth={isAuth}
          location={location}
        />
      }
    >
      {children}
    </MainLayout>
  );
};

export const AdminLayout = ({ children }) => {
  return (
    <SideBar
      header={<Header />}
      leftSide={<LeftSideMenu data={adminNavData} />}
    >
      {children}
    </SideBar>
  );
};
export const GuardiaLayout = ({ children }) => {
  return (
    <SideBar
      header={<Header />}
      leftSide={<LeftSideMenu data={guardiaNavData} />}
    >
      {children}
    </SideBar>
  );
};
export const UsuarioLayout = ({ children }) => {
  return (
    <SideBar
      header={<Header />}
      leftSide={<LeftSideMenu data={usuarioNavData} />}
    >
      {children}
    </SideBar>
  );
};

export default SideBar;
