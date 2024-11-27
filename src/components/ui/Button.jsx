export const Button = ({ children }) => {
  return (
    <>
      <button className="bg-amarillo-10 text-white rounded-md p-1 text-xl transition delay-150 duration-300 ease-in-out hover:bg-azul-10">
        {children}
      </button>
    </>
  );
};

export default Button;
