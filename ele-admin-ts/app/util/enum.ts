export enum Status {
  Success = 200, // 成功
  SystemError = 500, // 系统错误
  InvalidParams = 1001, // 参数错误
  LoginOut = 1003, // 未登录
  LoginFail = 1004, // 登录失效
  CodeError = 1005, // 验证码错误
  InvalidRequest = 1006 // 无效请求
}