'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const bootstrap_1 = require("egg-mock/bootstrap");
const factories_1 = require("./factories");
before(() => {
    // defined app.factory for build test data
    factories_1.default(bootstrap_1.app);
});
afterEach(async () => {
    // clear database after each test case
    await Promise.all([
        bootstrap_1.app.model.User.destroy({ truncate: true, force: true }),
        bootstrap_1.app.model.Post.destroy({ truncate: true, force: true }),
    ]);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzZXR1cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7O0FBRWIsa0RBQXlDO0FBQ3pDLDJDQUFvQztBQUVwQyxNQUFNLENBQUMsR0FBRyxFQUFFO0lBQ1YsMENBQTBDO0lBQzFDLG1CQUFTLENBQUMsZUFBRyxDQUFDLENBQUM7QUFDakIsQ0FBQyxDQUFDLENBQUM7QUFFSCxTQUFTLENBQUMsS0FBSyxJQUFJLEVBQUU7SUFDbkIsc0NBQXNDO0lBQ3RDLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUNoQixlQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQztRQUN2RCxlQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQztLQUN4RCxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9