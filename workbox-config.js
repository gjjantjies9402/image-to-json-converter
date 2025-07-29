module.exports = {
  globDirectory: 'build/',
  globPatterns: [
    '**/*.{html,js,css,png,svg,ico,json}'
  ],
  swSrc: 'src/service-worker.js',
  swDest: 'build/service-worker.js',
  injectionPoint: 'self.__WB_MANIFEST'
};