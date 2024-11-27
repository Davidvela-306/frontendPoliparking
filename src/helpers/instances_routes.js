import axios from "axios";
/* importar desde .env y almacenar en constante */
const URL = import.meta.env.VITE_BACKEND_URL;

const baseAdmin = axios.create({
  baseURL: `${URL}/administrador`,
});
const baseGuardias = axios.create({
  baseURL: `${URL}/guardias`,
});
const baseParqueaderos = axios.create({
  baseURL: `${URL}/parqueaderos`,
});
const baseUsuarios = axios.create({
  baseURL: `${URL}/usuarios`,
});

export { baseAdmin, baseGuardias, baseParqueaderos, baseUsuarios };
