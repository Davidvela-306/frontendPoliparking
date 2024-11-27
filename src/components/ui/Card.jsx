export const Card = ({ children, ...rest }) => {
  return (
    <div className={`px-10 py-2 bg-transparent rounded-3xl `} {...rest}>
      {children}
    </div>
  );
};

export default Card;
