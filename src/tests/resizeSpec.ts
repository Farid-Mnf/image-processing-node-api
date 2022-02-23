import request from "supertest";
import server from '../index';



it('responds with image', async function () {
    const response = await request(server)
        .get('/api?image=santamonica&width=200&height=200')
        .set('Accept', 'image/jpg')

    expect(response.headers['content-length']).toEqual("6090");
    expect(response.headers["content-type"]).toEqual("image/jpeg");
    expect(response.status).toEqual(200);
});
