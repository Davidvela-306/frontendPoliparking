const ClockIcon = ({
  size = "size-6", // tamaño por defecto
  strokeColor = "currentColor", // color de trazo por defecto
  strokeWidth = 1.5, // grosor de trazo por defecto
  fill = "none", // relleno por defecto
  viewBox = "0 0 24 24", // vista por defecto
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={fill}
      viewBox={viewBox}
      strokeWidth={strokeWidth}
      stroke={strokeColor}
      className={size}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  );
};

export default ClockIcon;
