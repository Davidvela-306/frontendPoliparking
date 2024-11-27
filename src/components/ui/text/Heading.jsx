const Heading = ({ level = 1, children, ...props }) => {
  const Tag = `h${level}`; // Se establece el tipo de etiqueta dinámicamente

  // Estilos comunes para todos los encabezados
  const classNames = "font-black text-azul-10";

  return (
    <Tag {...props} className={`${classNames} text-${level}xl`}>
      {children}
    </Tag>
  );
};

export default Heading;
