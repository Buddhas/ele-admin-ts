'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const bootstrap_1 = require("egg-mock/bootstrap");
const assert = require("assert");
describe('test/app/service/post.test.js', () => {
    describe('GET /posts', () => {
        it('should work', async () => {
            await bootstrap_1.app.factory.createMany('post', 3);
            const res = await bootstrap_1.app.httpRequest().get('/posts?limit=2');
            assert(res.status === 200);
            assert(res.body.count === 3);
            assert(res.body.rows.length === 2);
            assert(res.body.rows[0].title);
            assert(!res.body.rows[0].content);
        });
    });
    describe('GET /posts/:id', () => {
        it('should work', async () => {
            const post = await bootstrap_1.app.factory.create('post');
            const res = await bootstrap_1.app.httpRequest().get(`/posts/${post.id}`);
            assert(res.status === 200);
            assert(res.body.title === post.title);
            assert(res.body.content === post.content);
        });
    });
    describe('POST /posts', () => {
        it('should work', async () => {
            bootstrap_1.app.mockCsrf();
            let res = await bootstrap_1.app.httpRequest().post('/posts')
                .send({
                title: 'title',
                content: 'content',
                user_id: 1,
            });
            assert(res.status === 201);
            assert(res.body.id);
            res = await bootstrap_1.app.httpRequest().get(`/posts/${res.body.id}`);
            assert(res.status === 200);
            assert(res.body.title === 'title');
        });
    });
    describe('DELETE /posts/:id', () => {
        it('should work', async () => {
            const post = await bootstrap_1.app.factory.create('post');
            bootstrap_1.app.mockCsrf();
            const res = await bootstrap_1.app.httpRequest().delete(`/posts/${post.id}`)
                .send({ user_id: post.user_id });
            assert(res.status === 200);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdC50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicG9zdC50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQzs7QUFFYixrREFBeUM7QUFDekMsaUNBQWtDO0FBRWxDLFFBQVEsQ0FBQywrQkFBK0IsRUFBRSxHQUFHLEVBQUU7SUFDN0MsUUFBUSxDQUFDLFlBQVksRUFBRSxHQUFHLEVBQUU7UUFDMUIsRUFBRSxDQUFDLGFBQWEsRUFBRSxLQUFLLElBQUksRUFBRTtZQUMzQixNQUFNLGVBQUcsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN4QyxNQUFNLEdBQUcsR0FBRyxNQUFNLGVBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUMxRCxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sS0FBSyxHQUFHLENBQUMsQ0FBQztZQUMzQixNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDN0IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNuQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDL0IsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDcEMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxHQUFHLEVBQUU7UUFDOUIsRUFBRSxDQUFDLGFBQWEsRUFBRSxLQUFLLElBQUksRUFBRTtZQUMzQixNQUFNLElBQUksR0FBRyxNQUFNLGVBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzlDLE1BQU0sR0FBRyxHQUFHLE1BQU0sZUFBRyxDQUFDLFdBQVcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxVQUFVLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzdELE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBQzNCLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxLQUFLLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM1QyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLGFBQWEsRUFBRSxHQUFHLEVBQUU7UUFDM0IsRUFBRSxDQUFDLGFBQWEsRUFBRSxLQUFLLElBQUksRUFBRTtZQUMzQixlQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDZixJQUFJLEdBQUcsR0FBRyxNQUFNLGVBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO2lCQUM3QyxJQUFJLENBQUM7Z0JBQ0osS0FBSyxFQUFFLE9BQU87Z0JBQ2QsT0FBTyxFQUFFLFNBQVM7Z0JBQ2xCLE9BQU8sRUFBRSxDQUFDO2FBQ1gsQ0FBQyxDQUFDO1lBQ0wsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEtBQUssR0FBRyxDQUFDLENBQUM7WUFDM0IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7WUFFcEIsR0FBRyxHQUFHLE1BQU0sZUFBRyxDQUFDLFdBQVcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUMzRCxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sS0FBSyxHQUFHLENBQUMsQ0FBQztZQUMzQixNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssT0FBTyxDQUFDLENBQUM7UUFDckMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQyxtQkFBbUIsRUFBRSxHQUFHLEVBQUU7UUFDakMsRUFBRSxDQUFDLGFBQWEsRUFBRSxLQUFLLElBQUksRUFBRTtZQUMzQixNQUFNLElBQUksR0FBRyxNQUFNLGVBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRTlDLGVBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNmLE1BQU0sR0FBRyxHQUFHLE1BQU0sZUFBRyxDQUFDLFdBQVcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFVLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQztpQkFDNUQsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1lBQ25DLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQzdCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9