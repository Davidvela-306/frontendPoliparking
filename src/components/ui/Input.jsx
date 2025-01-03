import { forwardRef } from "react";
const Input = forwardRef((props, ref) => {
  return <input className="rounded-md w-full p-1 mb-3 border-b border-gray-300" ref={ref} {...props} />;
});
Input.displayName = "Input";
export { Input };

export default Input;
