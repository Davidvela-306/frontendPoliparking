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

const base = axios.create({
  baseURL: `${URL}`,
});

export { base , baseAdmin, baseGuardias, baseParqueaderos, baseUsuarios };
