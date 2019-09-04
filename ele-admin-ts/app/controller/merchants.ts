/*
 * @Descripttion:商户controller层
 * @version:
 * @Author: 笑佛弥勒
 * @Date: 2019-08-19 16:59:30
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2019-09-03 21:13:13
 */
import { Controller } from "egg"
import * as path from "path"

export default class Merchants extends Controller {

  /**
   * @Descripttion: 创建商户
   * @Author: 笑佛弥勒
   * @param {type}
   * @return:
   */
  public async createMerchants() {
    let params = this.ctx.request.body
    try {
      this.ctx.validate({ params: "addMerchants" })
    } catch (error) {
      this.ctx.body = {
        msg: error,
        status: 500
      }
      return
    }
    try {
      this.ctx.body = await this.ctx.service.merchants.createMerchants(params)
    } catch (error) {
      this.ctx.body = {
        msg: "创建商户错误",
        status: 500
      }
    }
    
  }

  /**
   * @Descripttion: 删除商户
   * @Author: 笑佛弥勒
   * @param {type}
   * @return:
   */
  public async deleteMerchants() {
    try {
      this.ctx.validate({ id: "string" }, this.ctx.request.body)
    } catch (error) {
      this.ctx.body = {
        msg: "商户id错误",
        status: "-1"
      }
      return
    }

    try {
      this.ctx.body = await this.ctx.service.merchants.deleteMerchants(
        Number(this.ctx.request.body.id)
      )
    } catch (error) {
      this.ctx.body = {
        msg: "删除商户错误",
        status: "-1"
      }
    }
  }
  /**
   * @Descripttion: 商户列表分页
   * @Author: 笑佛弥勒
   * @param {type}
   * @return:
   */
  public async findMerchantsByPage() {
    let { page, pageSize } = this.ctx.request.body
    page = Number(page)
    pageSize = Number(pageSize)
    try {
      this.ctx.validate({ page: "number" }, { page: page })
      this.ctx.validate({ pageSize: "number" }, { pageSize: pageSize })
    } catch (error) {
      this.ctx.body = {
        msg: "参数错误",
        status: "-1"
      }
      return
    }

    try {
      this.ctx.body = await this.ctx.service.merchants.findAdminByPage(
        page,
        pageSize
      )
    } catch (error) {
      throw {
        message: "查询出错",
        status: 400
      }
    }
  }

  /**
   * @Descripttion: 更新商户头像
   * @Author: 笑佛弥勒
   * @param {type}
   * @return:
   */
  public async updateShopAvatar() {
    const stream = await this.ctx.getFileStream()
    const uploadBasePath = "app/public/shopAvatar"
    const filename = `${Date.now()}${path
      .extname(stream.filename)
      .toLocaleLowerCase()}`
    const target = path.join(uploadBasePath, filename)
    try {
      this.ctx.header.mkdirSync(path.join(uploadBasePath))
      this.ctx.header.saveImg(stream, target)
      this.ctx.body = {
        url: filename,
        status: 200
      }
    } catch (error) {
      this.ctx.body = {
        status: -1,
        msg: "图片保存失败"
      }
    }
  }

  /**
   * @Descripttion: 更新商户营业执照
   * @Author: 笑佛弥勒
   * @param {type}
   * @return:
   */
  public async updateBusinessLicense() {
    const stream = await this.ctx.getFileStream()
    const uploadBasePath = "app/public/businessLicense"
    const filename = `${Date.now()}${path
      .extname(stream.filename)
      .toLocaleLowerCase()}`
    const target = path.join(uploadBasePath, filename)
    try {
      this.ctx.header.mkdirSync(path.join(uploadBasePath))
      this.ctx.header.saveImg(stream, target)
      this.ctx.body = {
        url: filename,
        status: 200
      }
    } catch (error) {
      this.ctx.body = {
        status: -1,
        msg: "图片保存失败"
      }
    }
  }

  /**
   * @Descripttion: 更新商户餐饮许可证
   * @Author: 笑佛弥勒
   * @param {type}
   * @return:
   */
  public async updateCateringLicense() {
    const stream = await this.ctx.getFileStream()
    const uploadBasePath = "app/public/cateringLicense"
    const filename = `${Date.now()}${path
      .extname(stream.filename)
      .toLocaleLowerCase()}`
    const target = path.join(uploadBasePath, filename)
    try {
      this.ctx.header.mkdirSync(path.join(uploadBasePath))
      this.ctx.header.saveImg(stream, target)
      this.ctx.body = {
        url: filename,
        status: 200
      }
    } catch (error) {
      this.ctx.body = {
        status: -1,
        msg: "图片保存失败"
      }
    }
  }
  /**
   * @Descripttion: 更新商户信息
   * @Author: 笑佛弥勒
   * @param {type} 
   * @return: 
   */
  public async updateMerchants() {
    let params = this.ctx.request.body
    try {
      this.ctx.validate({ params: "updateMerchants" })
    } catch (error) {
      this.ctx.body = {
        msg: error,
        status: "-1"
      }
      return
    }

    try {
      this.ctx.service.merchants.updateMerchants(params)
    } catch (error) {
      this.ctx.body = {
        msg: "更新商铺信息失败",
        status: "-1"
      }
    }
  }

  /**
   * @Descripttion: 根据商铺名称模糊查询商铺
   * @Author: 笑佛弥勒
   * @param {type} 
   * @return: 
   */
  public async findMerchantsByName() {
    let { page, pageSize, name } = this.ctx.request.body
    page = Number(page)
    pageSize = Number(pageSize)

    try {
      this.ctx.validate({ page: "number" }, { page: page })
      this.ctx.validate({ pageSize: "number" }, { pageSize: pageSize })
      this.ctx.validate({ name: "string" }, { name: name })
    } catch (error) {
      this.ctx.body = {
        msg: "参数错误",
        status: "-1"
      }
      return
    }

    try {
      this.ctx.body = await this.service.merchants.findMerchantsByName(Number(page), Number(pageSize), name)
    } catch (error) {
      this.ctx.body = {
        msg: '查询错误',
        status: '-1'
      }
    }

  }
}
