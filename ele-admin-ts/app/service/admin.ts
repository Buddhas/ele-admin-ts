import { Service } from 'egg';

class Admin extends Service {

    public async login() {
        //const { mobile } = ctx.params
        let mobile = '17688702092' 
        // this.ctx.model.Admin.findByPk(mobile)
        if (this.ctx.model.Admin.findByIdMobile(mobile)) {
            return this.ctx.model.Admin.findByIdMobile(mobile)
        } 
        
    }
}

module.exports = Admin;