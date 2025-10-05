/** @type {import('next').NextConfig} */
module.exports = {
  outputFileTracingRoot: __dirname,
  webpack: (cfg) => {
    cfg.output = cfg.output || {};
    cfg.output.uniqueName = 'projeto-delfos';
    return cfg;
  }
};