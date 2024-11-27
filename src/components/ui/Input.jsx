import { forwardRef } from "react";
export const Input = forwardRef((props, ref) => {
  return <input className="rounded-md w-full p-1 mb-3" ref={ref} {...props} />;
});

export default Input;
