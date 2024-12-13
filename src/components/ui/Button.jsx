export const Button = ({ children }) => {
  return (
    <>
      <button className="bg-amarillo-10 text-azul-10 rounded-md p-1 text-xl transition delay-150 duration-300 ease-in-out hover:bg-yellow-600 ">
        {children}
      </button>
    </>
  );
};

export default Button;
