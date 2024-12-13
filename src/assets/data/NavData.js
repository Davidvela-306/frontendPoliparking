const GeneralNavData = [
  {
    id: 1,
    title: "Iniciar Sesión",
    path: "/singin",
  },
];
const adminNavData = [
  {
    id: 1,
    title: "Usuarios",
    path: "/administrador/usuarios",
  },
  {
    id: 2,
    title: "Guardias",
    path: "/administrador/guardias",
  },
  {
    id: 3,
    title: "Plazas de estacionamiento",
    path: "/administrador/parqueaderos",
  },
];
const guardiaNavData = [
  {
    id: 1,
    title: "Perfil",
    path: "/guardias/perfil",
  },
  {
    id: 2,
    title: "Usuarios",
    path: "/guardias/usuarios",
  },
  {
    id: 3,
    title: "Plazas de estacionamiento",
    path: "/guardias/parqueaderos",
  },
];
const usuarioNavData = [
  {
    id: 1,
    title: "Perfil",
    path: "/usuarios/perfil",
  },
  {
    id: 2,
    title: "Plazas de estacionamiento",
    path: "/usuarios/parquedero",
  },
];

export { GeneralNavData, adminNavData, guardiaNavData, usuarioNavData };
