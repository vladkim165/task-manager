/** @type {import('next').NextConfig} */

const withPlugins = require('next-compose-plugins');
const withAssetManifest = require('next-assets-manifest');

module.exports = withPlugins([
  withAssetManifest,
]);


