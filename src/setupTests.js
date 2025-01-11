import "@testing-library/jest-dom";
const originalWarn = console.warn;

console.warn = (message, ...args) => {
  if (
    message.includes("React Router Future Flag Warning") ||
    message.includes(
      "Relative route resolution within Splat routes is changing in v7",
    )
  ) {
    return;
  }

  originalWarn(message, ...args);
};
