// Allow Importing SCSS Modules
declare module "*.scss" {
  const content: { [className: string]: string };
  export default content;
}

// Allow Importing Image Assets
declare module "*.png" {
  const value: string;
  export default value;
}

declare module "*.jpg" {
  const value: string;
  export default value;
}

declare module "*.jpeg" {
  const value: string;
  export default value;
}

declare module "*.gif" {
  const value: string;
  export default value;
}

declare module "*.svg" {
  const value: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default value;
}

// declare module "*.svg" {
//   import React from "react";
//   const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
//   const src: string;
//   export { ReactComponent };
//   export default src;
// }

// Global Type for Theme Mode
declare type ThemeMode = "light" | "dark";
