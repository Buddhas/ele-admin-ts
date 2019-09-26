/*
 * @Descripttion: 管理员controller层
 * @version: 
 * @Author: 笑佛弥勒
 * @Date: 2019-08-06 16:46:01
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2019-09-26 17:09:13
 */
import { BaseController } from "../core/baseController"
import * as path from "path"
import { mkdirSync, saveImg } from "../util/util"
import * as utility from 'utility'

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
      this.fail(500, error)
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
          encrypt: true, // 加密传输
        }) // 保存到cookie
        this.success(200, '注册成功')
      } catch (error) {
        ctx.logger.error(`-----用户注册失败------`, error)
        ctx.logger.error(`入参params：mobile:${mobile}、password:${password}`)
        this.fail(500, "用户注册失败")
      }
    } else {
      if (res.password == password) {
        await this.ctx.helper.loginToken({ mobile: mobile, password: password }).then((res) => token = res) // 取到生成token
        await this.app.redis.set(mobile, token, 'ex', 7200) // 保存到redis
        ctx.cookies.set('authorization', token, {
          httpOnly: true, // 默认就是 true
          encrypt: true, // 加密传输
          maxAge: 7200
        }) // 保存到cookie
        ctx.body = { data: { token, expires: this.config.login_token_time }, code: 1, msg: '登录成功' } // 返回
        this.success(200, '登录成功')
      } else {
        this.fail(500, "密码错误")
      }
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
      await this.ctx.service.admin.updateAvatar(filename, "17688702092")
      this.success(200, '管理员头像保存成功', filename)
    } catch (error) {
      this.ctx.logger.error(`-----修改管理员头像失败------`, error)
      this.fail(500, "修改管理员头像失败")
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
    let { page, pageSize } = this.ctx.request.body
    try {
      this.ctx.validate({ page: "number" }, { page: page })
      this.ctx.validate({ pageSize: "number" }, { pageSize: pageSize })
    } catch (error) {
      this.fail(500, "参数错误")
      return
    }

    try {
      this.ctx.body = await this.ctx.service.admin.findAdminByPage(
        page,
        pageSize
      )
    } catch (error) {
      this.fail(500, "查询出错")
    }
  }

  /**
   * @Descripttion: 数据总览
   * @Author: 笑佛弥勒
   * @return: 
   */
  public async totalData() {
    try {
      let currentData =  await this.ctx.service.admin.currentData()
      let dateAWeek = await this.ctx.service.admin.dateAWeek()
      let data = {
        currentData: currentData,
        dateAWeek: dateAWeek
      }
      this.success(200, '查询成功', data)
    } catch (error) {
      this.fail(500, "获取数据出错")
    }
  }
  public async getShopCategory() {
    try {
      let category = await this.ctx.service.shopCategory.getAllCategory()
      this.success(200, '查询成功', category)
    } catch (error) {
      this.fail(500, "获取数据出错")
    }
  }
}
