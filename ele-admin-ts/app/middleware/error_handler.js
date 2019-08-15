/*
 * @Descripttion: 
 * @version: 
 * @Author: 笑佛弥勒
 * @Date: 2019-08-12 16:22:42
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2019-08-14 14:09:27
 */
module.exports = () => {
  // 中间件的配置项，框架会将 app.config[${middlewareName}] 传递进来
  return async function(ctx, next) {
    try {
      await next();
    } catch (err) {
      // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
      ctx.app.emit('error', err, this);
      const status = err.status || 500;
      // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
      const error_msg = status === 500 && ctx.app.config.env === 'prod'
        ? 'Internal Server Error'
        : err.message;
      // 从 error 对象上读出各个属性，设置到响应中
      ctx.body = { error_msg };
      ctx.body.success = false;
      ctx.body.status = err.status
      if (status === 422) {
        ctx.body.detail = err.errors;
      }
      ctx.status = status;
    }
  };
};
