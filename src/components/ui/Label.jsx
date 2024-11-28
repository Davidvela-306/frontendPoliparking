export const Label = ({ text, ...props }) => {
  return (
    <>
      <label className="text-black font-bold text-sm " {...props}>
        {text}
      </label>
    </>
  );
};

export default Label;
