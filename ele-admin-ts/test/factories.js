'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const factory_girl_1 = require("factory-girl");
function default_1(app) {
    app.factory = factory_girl_1.factory;
    factory_girl_1.factory.define('user', app.model.User, {
        name: factory_girl_1.factory.sequence('User.name', n => `name_${n}`),
        age: 18,
    });
    factory_girl_1.factory.define('post', app.model.Post, {
        title: factory_girl_1.factory.sequence('Post.title', n => `title_${n}`),
        content: factory_girl_1.factory.chance('sentence', { word: 5 }),
        user_id: factory_girl_1.factory.assoc('user', 'id'),
    });
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjdG9yaWVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmFjdG9yaWVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQzs7QUFHYiwrQ0FBdUM7QUFFdkMsbUJBQXdCLEdBQW9CO0lBQzFDLEdBQUcsQ0FBQyxPQUFPLEdBQUcsc0JBQU8sQ0FBQztJQUN0QixzQkFBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUU7UUFDckMsSUFBSSxFQUFFLHNCQUFPLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUM7UUFDckQsR0FBRyxFQUFFLEVBQUU7S0FDUixDQUFDLENBQUM7SUFFSCxzQkFBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUU7UUFDckMsS0FBSyxFQUFFLHNCQUFPLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUM7UUFDeEQsT0FBTyxFQUFFLHNCQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQztRQUNoRCxPQUFPLEVBQUUsc0JBQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQztLQUNyQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBWkQsNEJBWUMifQ==