export default class NotifyPlugin {
  constructor(afterFECompileCb) {
    this.afterFECompileCb = afterFECompileCb;
  }

  apply = (compiler) => {
    compiler.plugin('compilation', (compilation) => {
      compilation.plugin('seal', () => {
        this.afterFECompileCb();
      });
    });
  };
}
