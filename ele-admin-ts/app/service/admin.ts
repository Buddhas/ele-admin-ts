import { Service } from 'egg';

class Admin extends Service {
    // 检测时候有这个用户
    public async hasUser() {
        let mobile = this.ctx.request.body.mobile
        return await this.ctx.model.Admin.findByIdMobile(mobile)
    }
    // 创建用户
    public async createUser(mobile, password) {
        return await this.ctx.model.Admin.create({
            mobile: mobile,
            password: password,
            user_name: mobile,
            registe_time: new Date(),
            permissions: 1,
            created_at: new Date(),
            updated_at: new Date(),
        })
    }
}

module.exports = Admin;