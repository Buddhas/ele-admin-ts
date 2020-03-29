/*
 * @Descripttion: 管理员controller层
 * @version: 
 * @Author: 笑佛弥勒
 * @Date: 2019-08-06 16:46:01
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2020-03-29 16:01:54
 */
import { BaseController } from "../core/baseController"
import * as path from "path"
import { mkdirSync, saveImg } from "../util/util"
import * as utility from 'utility'
import { Status } from "../util/enum"
export default class AdminController extends BaseController {
  /**
   * @Descripttion: 管理员登录 || 注册 接口
   * @Author: 笑佛弥勒
   * @param {type}
   * @return:
   */
  public async login() {
    const { ctx } = this
    let { mobile, password } = this.ctx.request.body
    try {
      ctx.validate({ mobile: "mobile" })
      ctx.validate({ password: { type: "string", min: 1, max: 10 } })
    } catch (error) {
      this.fail(Status.InvalidParams, error)
      return
    }

    let res = await ctx.service.admin.hasUser(mobile)
    // 加密密码
    password = utility.md5(password)
    let token = ''
    if (!res) {
      try {
        await ctx.service.admin.createUser(mobile, password)
        // 生成token
        await this.ctx.helper.loginToken().then((res) => token = res) // 取到生成token
        await this.app.redis.set(mobile, token, 'ex', 7200) // 保存到redis
        ctx.cookies.set('authorization', token, {
          httpOnly: true, // 默认就是 true
          maxAge: 1000 * 60 * 60, // egg中是以毫秒为单位的
          // domain: '120.79.131.113'
          domain: 'localhost'
        }) // 保存到cookie
        this.success(Status.Success, '注册成功')
      } catch (error) {
        ctx.logger.error(`-----用户注册失败------`, error)
        ctx.logger.error(`入参params：mobile:${mobile}、password:${password}`)
        this.fail(Status.SystemError, "用户注册失败")
      }
    } else {
      if (res.password == password) {
        await this.ctx.helper.loginToken({ mobile: mobile, password: password }).then((res) => token = res) // 取到生成token
        await this.app.redis.set(mobile, token, 'ex', 7200) // 保存到redis
        ctx.cookies.set('authorization', token, {
          httpOnly: true, // 默认就是 true
          maxAge: 1000 * 60 * 60, // egg中是以毫秒为单位的
          // domain: '120.79.131.113'
          domain: 'localhost'
        }) // 保存到cookie
        ctx.body = { data: { token, expires: this.config.login_token_time }, code: 1, msg: '登录成功' } // 返回
        this.success(Status.Success, '登录成功')
      } else {
        this.fail(Status.SystemError, "密码错误")
      }
    }
  }
  /**
   * @Descripttion: 退出登录
   * @Author: 笑佛弥勒
   * @param {type} 
   * @return: 
   */
  public async logOut() {
    let authToken = this.ctx.cookies.get('authorization')
    const res = this.ctx.helper.verifyToken(authToken) // 解密获取的Token
    if (res) {
      try {
        await this.app.redis.del(res.mobile)
        this.success(Status.Success, '退出登录成功')
      } catch (error) {
        this.fail(Status.SystemError, '登出错误')
      }
    } else {
      this.fail(Status.SystemError, '登出错误')
    }
  }
  /**
   * @Descripttion: 获取当前管理员信息
   * @Author: 笑佛弥勒
   * @param {type}
   * @return:
   */
  public async getCurrentAdmin() {
    let token = this.ctx.cookies.get('authorization')
    const res = this.ctx.helper.verifyToken(token) // 解密获取的Token
    try {
      let data = await this.service.admin.getUser(res.mobile)
      this.success(Status.Success, '成功', data)
    } catch (error) {
      this.fail(Status.SystemError, '查询出错')
    }
  }
  /**
   * @Descripttion: 修改管理员头像
   * @Author: 笑佛弥勒
   * @param {type}
   * @return:
   */
  public async updateAvatar() {
    const stream = await this.ctx.getFileStream()
    const uplaodBasePath = "app/public/adminAvatar"
    const filename = `${Date.now()}${path
      .extname(stream.filename)
      .toLocaleLowerCase()}`

    try {
      mkdirSync(path.join(uplaodBasePath))
      const target = path.join(uplaodBasePath, filename)
      saveImg(stream, target)
      const authorization = this.ctx.cookies.get('authorization')
      const userMsg = this.ctx.helper.verifyToken(authorization)
      await this.ctx.service.admin.updateAvatar('adminAvatar/' + filename, userMsg.mobile)
      let data = {
        filename: 'adminAvatar/' + filename,
      }
      this.success(Status.Success, '管理员头像保存成功', data)
    } catch (error) {
      this.ctx.logger.error(`-----修改管理员头像失败------`, error)
      this.fail(Status.SystemError, "修改管理员头像失败")
    }
  }
  /**
   * @Descripttion: 获取管理员数量
   * @Author: 笑佛弥勒
   * @param {type}
   * @return:
   */
  public async getAdminCount() {
    return await this.ctx.service.admin.getAdminCount()
  }
  /**
   * @Descripttion: 管理员列表分页
   * @Author: 笑佛弥勒
   * @param {type}
   * @return:
   */
  public async findAdminByPage() {
    let { page, pageSize } = this.ctx.query
    page = Number(page)
    pageSize = Number(pageSize)
    try {
      this.ctx.validate({ page: "number" }, { page: page })
      this.ctx.validate({ pageSize: "number" }, { pageSize: pageSize })
    } catch (error) {
      this.fail(Status.InvalidParams, "参数错误")
      return
    }

    try {
      let data = await this.ctx.service.admin.findAdminByPage(
        page,
        pageSize
      )
      this.success(Status.Success, '成功', data)
    } catch (error) {
      this.fail(Status.SystemError, "查询出错")
    }
  }

  /**
   * @Descripttion: 数据总览
   * @Author: 笑佛弥勒
   * @return: 
   */
  public async totalData() {
    try {
      let currentData = await this.ctx.service.admin.currentData()
      let dateAWeek = await this.ctx.service.admin.dateAWeek()
      let data = {
        currentData: currentData,
        dateAWeek: dateAWeek
      }
      this.success(Status.Success, '查询成功', data)
    } catch (error) {
      this.fail(Status.SystemError, "获取数据出错")
    }
  }
  /**
   * @Descripttion: 获取商铺分类
   * @Author: 笑佛弥勒
   * @param {type} 
   * @return: 
   */
  public async getShopCategory() {
    try {
      let category = await this.ctx.service.shopCategory.getAllCategory()
      this.success(Status.Success, '查询成功', category)
    } catch (error) {
      this.fail(Status.SystemError, "获取数据出错")
    }
  }

  /**
   * @Descripttion: 验证管理员是否登录
   * @Author: 笑佛弥勒
   * @param {type} 
   * @return: 
   */
  public async isLogin() {
    let authToken = this.ctx.cookies.get('authorization')
    if (!authToken) {
      this.success(Status.Success, '未登录', '')
      return
    }
    const res = this.ctx.helper.verifyToken(authToken)
    try {
      let data = await this.ctx.service.admin.getUser(res.mobile)
      this.success(Status.Success, '已登录', data)
    } catch (error) {
      this.fail(Status.SystemError, '系统错误')
    }
  }
}
