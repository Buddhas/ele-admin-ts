/*
 * @Descripttion:商户controller层
 * @version:
 * @Author: 笑佛弥勒
 * @Date: 2019-08-19 16:59:30
 * @LastEditors  : 笑佛弥勒
 * @LastEditTime : 2020-02-11 22:26:07
 */
import { BaseController } from "../core/baseController"
import * as path from "path"

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
      this.fail(500, error)
      return
    }
    try {
      await this.ctx.service.merchants.createMerchants(params)
      this.success(200, '创建商户成功')
    } catch (error) {
      this.ctx.logger.error(`-----创建商户错误------`, error)
      this.ctx.logger.error(`入参params：${params}`)
      this.fail(500, error)
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
      this.fail(500, '商户id错误')
      return
    }

    try {
      let res = await this.ctx.service.merchants.deleteMerchants(
        this.ctx.request.body.id
      )
      if (res[0]) {
        this.success(200, '删除商户成功')
      } else {
        this.fail(500, "商户不存在或者已删除")
      }
    } catch (error) {
      this.ctx.logger.error(`-----删除商户错误------`, error)
      this.ctx.logger.error(`入参params：${this.ctx.request.body}`)
      this.fail(500, "删除商户错误")
    }
  }
  /**
   * @Descripttion: 商户列表分页
   * @Author: 笑佛弥勒
   * @param {type}
   * @return:
   */
  public async findMerchantsByPage() {
    let { page, pageSize } = this.ctx.query
    console.log(page)
    console.log(pageSize)
    try {
      this.ctx.validate({ page: "number" }, { page: Number(page) })
      this.ctx.validate({ pageSize: "number" }, { pageSize: Number(pageSize) })
    } catch (error) {
      this.ctx.body = {
        msg: "参数错误",
        status: 500
      }
      return
    }

    try {
      let data = await this.ctx.service.merchants.findAdminByPage(
        Number(page),
        Number(pageSize)
      )
      this.success(200, '成功', data)
    } catch (error) {
      this.ctx.body = {
        message: "查询出错",
        status: 500
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
      this.ctx.helper.mkdirSync(path.join(uploadBasePath))
      this.ctx.helper.saveImg(stream, target)
      let data = {
        filename: filename,
        attribute: 'shop_avatar'
      }
      this.success(200, '商户头像上传成功', data)
    } catch (error) {
      this.ctx.logger.error(`-----更新商户头像失败------`, error)
      this.fail(500, "更新商户头像失败")
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
      this.ctx.helper.saveImg(stream, target)
      let data = {
        filename: filename,
        attribute: 'shop_environment'
      }
      this.success(200, '商户商家实景图片', data)
    } catch (error) {
      this.ctx.logger.error(`-----更新商家实景图片------`, error)
      this.fail(500, "更新商家实景图片")
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
      this.ctx.helper.saveImg(stream, target)
      let data = {
        filename: filename,
        attribute: 'business_license'
      }
      this.success(200, '商户营业执照上传成功', data)
    } catch (error) {
      this.ctx.logger.error(`-----更新商户营业执照失败------`, error)
      this.fail(500, "更新商户营业执照失败")
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
      this.ctx.helper.saveImg(stream, target)
      let data = {
        filename: filename,
        attribute: 'catering_license'
      }
      this.success(200, '商户餐饮许可证上传成功', data)
    } catch (error) {
      this.ctx.logger.error(`-----更新商户餐饮许可证失败------`, error)
      this.fail(500, "更新商户餐饮许可证失败")
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
      this.fail(500, error)
      return
    }

    try {
      await this.ctx.service.merchants.updateMerchants(params)
      this.success(200, '商铺信息更新成功')
    } catch (error) {
      this.ctx.body = {
        msg: "更新商铺信息失败",
        status: 500
      }
      this.ctx.logger.error(`-----更新商铺信息失败------`, error)
      this.ctx.logger.error(`入参params：${params}`)
      this.fail(500, "更新商铺信息失败")
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

    try {
      this.ctx.validate({ page: "number" }, { page: page })
      this.ctx.validate({ pageSize: "number" }, { pageSize: pageSize })
      this.ctx.validate({ name: "string" }, { name: name })
    } catch (error) {
      this.ctx.body = {
        msg: "参数错误",
        status: 500
      }
      return
    }

    try {
      this.ctx.body = await this.service.merchants.findMerchantsByName(Number(page), Number(pageSize), name)
    } catch (error) {
      this.ctx.body = {
        msg: '查询错误',
        status: 500
      }
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
      this.fail(500, '参数错误')
      return
    }

    try {
      let data = await this.ctx.service.merchants.getMerchantsById(id)
      this.success(200, '成功', data)
    } catch (error) {
      this.fail(500, '查询错误')
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
      this.fail(500, '参数错误')
      return
    }

    try {
      let data = await this.ctx.service.merchants.getFoodByMerId(id)
      this.success(200, '成功', data)
    } catch (error) {
      this.fail(500, '查询错误')
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
      this.fail(500, '参数错误')
      return
    }
    
    try {
      let data = await this.ctx.service.merchants.getMerByCategory(type, id, page, pageSize, orderType)
      this.success(200, '成功', data)
    } catch (error) {
      this.fail(500, '查询错误')
    }
  }
}
