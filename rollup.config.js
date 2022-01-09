import babel from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import typescript from "rollup-plugin-typescript2";
import pkg from "./package.json";
const config = {
  input: "./index.ts",
  output: {
    dir: pkg.main,
    format: "cjs",
  },
  plugins: [
    typescript(),
    babel({ babelHelpers: "bundled" }),
    nodeResolve(),
    commonjs(),
    terser(),
  ],
};

export default config;
