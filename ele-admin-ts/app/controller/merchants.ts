/*
 * @Descripttion:商户controller层
 * @version:
 * @Author: 笑佛弥勒
 * @Date: 2019-08-19 16:59:30
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2020-03-28 00:33:06
 */
import { BaseController } from "../core/baseController"
import * as path from "path"
import { Status } from "../util/enum"

export default class Merchants extends BaseController {

  /**
   * @Descripttion: 创建商户
   * @Author: 笑佛弥勒
   * @param {type}
   * @return:
   */
  public async createMerchants() {
    let params = this.ctx.request.body
    console.log(params)
    try {
      this.ctx.validate({ params: "addMerchants" }, { params: params })
    } catch (error) {
      this.fail(Status.InvalidParams, error)
      return
    }
    try {
      await this.ctx.service.merchants.createMerchants(params)
      this.success(Status.Success, '创建商户成功')
    } catch (error) {
      this.ctx.logger.error(`-----创建商户错误------`, error)
      this.ctx.logger.error(`入参params：${params}`)
      this.fail(Status.SystemError, error)
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
      this.ctx.validate({ id: "number" }, this.ctx.request.body)
    } catch (error) {
      this.fail(Status.InvalidParams, '商户id错误')
      return
    }

    try {
      let res = await this.ctx.service.merchants.deleteMerchants(
        this.ctx.request.body.id
      )
      if (res[0]) {
        this.success(Status.Success, '删除商户成功')
      } else {
        this.fail(Status.SystemError, "商户不存在或者已删除")
      }
    } catch (error) {
      this.ctx.logger.error(`-----删除商户错误------`, error)
      this.ctx.logger.error(`入参params：${this.ctx.request.body}`)
      this.fail(Status.SystemError, "删除商户错误")
    }
  }
  /**
   * @Descripttion: 商户列表分页
   * @Author: 笑佛弥勒
   * @param {type}
   * @return:
   */
  public async getMerchantsByPage() {
    let { page, pageSize, orderType } = this.ctx.query
    try {
      this.ctx.validate({ page: "number" }, { page: Number(page) })
      this.ctx.validate({ pageSize: "number" }, { pageSize: Number(pageSize) })
      this.ctx.validate({ orderType: "number" }, { orderType: Number(orderType) })
    } catch (error) {
      this.fail(Status.InvalidParams, '参数错误')
      return
    }

    try {
      let data = await this.ctx.service.merchants.getMerchantsByPage(
        Number(page),
        Number(pageSize),
        Number(orderType)
      )
      this.success(Status.Success, '成功', data)
    } catch (error) {
      this.fail(Status.SystemError, '查询出错')
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
      this.ctx.helper.mkdirSync(path.join(uploadBasePath))
      await this.ctx.helper.saveImg(stream, target)
      let data = {
        filename:'shopAvatar/' + filename,
        attribute: 'shop_avatar'
      }
      this.success(Status.Success, '商户头像上传成功', data)
    } catch (error) {
      this.ctx.logger.error(`-----更新商户头像失败------`, error)
      this.fail(Status.SystemError, "更新商户头像失败")
    }
  }

  /**
   * @Descripttion: 更新商家实景图片
   * @Author: 笑佛弥勒
   * @param {type}
   * @return:
   */
  public async updateShopEnv() {
    const stream = await this.ctx.getFileStream()
    const uploadBasePath = "app/public/environment"
    const filename = `${Date.now()}${path
      .extname(stream.filename)
      .toLocaleLowerCase()}`
    const target = path.join(uploadBasePath, filename)
    try {
      this.ctx.helper.mkdirSync(path.join(uploadBasePath))
      await this.ctx.helper.saveImg(stream, target)
      let data = {
        filename: 'environment/' + filename,
        attribute: 'shop_environment'
      }
      this.success(Status.Success, '商户商家实景图片', data)
    } catch (error) {
      this.ctx.logger.error(`-----更新商家实景图片------`, error)
      this.fail(Status.SystemError, "更新商家实景图片")
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
      this.ctx.helper.mkdirSync(path.join(uploadBasePath))
      await this.ctx.helper.saveImg(stream, target)
      let data = {
        filename: 'businessLicense/' + filename,
        attribute: 'business_license'
      }
      this.success(Status.Success, '商户营业执照上传成功', data)
    } catch (error) {
      this.ctx.logger.error(`-----更新商户营业执照失败------`, error)
      this.fail(Status.SystemError, "更新商户营业执照失败")
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
      this.ctx.helper.mkdirSync(path.join(uploadBasePath))
      await this.ctx.helper.saveImg(stream, target)
      let data = {
        filename: 'cateringLicense/' + filename,
        attribute: 'catering_license'
      }
      this.success(Status.Success, '商户餐饮许可证上传成功', data)
    } catch (error) {
      this.ctx.logger.error(`-----更新商户餐饮许可证失败------`, error)
      this.fail(Status.SystemError, "更新商户餐饮许可证失败")
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
      this.ctx.validate({ params: "addMerchants" }, { params: params })
    } catch (error) {
      this.fail(Status.SystemError, error)
      return
    }

    try {
      await this.ctx.service.merchants.updateMerchants(params)
      this.success(Status.Success, '商铺信息更新成功')
    } catch (error) {
      this.ctx.body = {
        msg: "更新商铺信息失败",
        status: Status.SystemError
      }
      this.ctx.logger.error(`-----更新商铺信息失败------`, error)
      this.ctx.logger.error(`入参params：${params}`)
      this.fail(Status.SystemError, "更新商铺信息失败")
    }
  }

  /**
   * @Descripttion: 根据id获取单个商户
   * @Author: 笑佛弥勒
   * @param {type} 
   * @return: 
   */
  public async getMerchantsById() {
    let { id } = this.ctx.query
    id = Number(id)
    try {
      this.ctx.validate({ id: "number" }, { id: id })
    } catch (error) {
      this.fail(Status.InvalidParams, '参数错误')
      return
    }

    try {
      let data = await this.ctx.service.merchants.getMerchantsById(id)
      this.success(Status.Success, '成功', data)
    } catch (error) {
      this.fail(Status.SystemError, '查询错误')
    }
  }

  /**
   * @Descripttion: 获取商铺下食品
   * @Author: 笑佛弥勒
   * @param {type} 
   * @return: 
   */
  public async getFoodByMerId() {
    let { id } = this.ctx.query
    id = Number(id)
    
    try {
      this.ctx.validate({ id: "number" }, { id: id })
    } catch (error) {
      this.fail(Status.InvalidParams, '参数错误')
      return
    }

    try {
      let data = await this.ctx.service.merchants.getFoodByMerId(id)
      this.success(Status.Success, '成功', data)
    } catch (error) {
      this.fail(Status.SystemError, '查询错误')
    }

  }

  public async getMerByCategory() {
    let { type, id, page, pageSize, orderType} = this.ctx.query
    id = Number(id)
    type = Number(type)
    page = Number(page)
    pageSize = Number(pageSize)
    orderType = Number(orderType)
    try {
      this.ctx.validate({ id: "number" }, { id: id })
      this.ctx.validate({ type: "number" }, { type: type })
      this.ctx.validate({ page: "number" }, { page: page })
      this.ctx.validate({ pageSize: "number" }, { pageSize: pageSize })
      this.ctx.validate({ orderType: "number" }, { orderType: orderType })
    } catch (error) {
      this.fail(Status.InvalidParams, '参数错误')
      return
    }
    
    try {
      let data = await this.ctx.service.merchants.getMerByCategory(type, id, page, pageSize, orderType)
      this.success(Status.Success, '成功', data)
    } catch (error) {
      this.fail(Status.SystemError, '查询错误')
    }
  }
  /**
   * @Descripttion: 根据名称模糊查询商户
   * @Author: 笑佛弥勒
   * @param {type} 
   * @return: 
   */
  public async getMerByKeyword() {
    let { page, pageSize, keyword } = this.ctx.query
    page = Number(page)
    pageSize = Number(pageSize)
    try {
      this.ctx.validate({ page: "number" }, { page: page })
      this.ctx.validate({ pageSize: "number" }, { pageSize: pageSize })
    } catch (error) {
      this.ctx.body = {
        msg: "参数错误",
        status: Status.InvalidParams
      }
      return
    }

    try {
      let data = await this.ctx.service.merchants.getMerByKeyword(page, pageSize, keyword)
      this.success(Status.Success, '成功', data)
    } catch (error) {
      this.fail(Status.SystemError, '查询错误')
    }
  }
}
