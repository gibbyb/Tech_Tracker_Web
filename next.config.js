/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import './src/env.js';

/** @type {import("next").NextConfig} */
const config = {
  output: 'standalone',
};

export default config;
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
//await import("./src/env.js");

//const cspHeader = `
//default-src 'self';
//script-src 'self' 'unsafe-eval' 'unsafe-inline';
//style-src 'self' 'unsafe-inline';
//img-src 'self' blob: data:;
//font-src 'self';
//object-src 'none';
//base-uri 'self';
//form-action 'self';
//frame-ancestors 'none';
//upgrade-insecure-requests;
//`

//[>* @type {import("next").NextConfig} <]
//const config = {
//async headers() {
//return [
//{
//source: "/(.*)",
//headers: [
//{
//key: "Content-Security-Policy",
//value: cspHeader.replace(/\n/g, ''),
//},
//],
//},
//];
//},
//};

//export default config;
