/*
 * @Descripttion: 枚举类
 * @version: 1.0
 * @Author: 笑佛弥勒
 * @Date: 2020-03-14 10:07:36
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2020-03-28 23:02:47
 */
export enum Status {
  Success = 200, // 成功
  SystemError = 500, // 系统错误
  InvalidParams = 1001, // 参数错误
  LoginOut = 1003, // 未登录
  LoginFail = 1004, // 登录失效
  CodeError = 1005, // 验证码错误
  InvalidRequest = 1006 // 无效请求
}