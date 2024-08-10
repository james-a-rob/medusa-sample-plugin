
import ProductVideoService from '../product-video';


const mockVideoId = "sdiufhs8";
const mockProductId = "1234"


// manual mocking. Replace with Medusa test tooling once officially available. Currently installing "medusa-test-utils" fails because of peer dep incompatability
const mockRepo = {
    findOne: () => {
        return { video_id: mockVideoId, product_id: mockProductId }
    },
    save: () => {

    }
}
const mockManager = {
    getRepository: () => {
        return mockRepo;
    }
}

describe('video plugin service', () => {
    it('stores video', async () => {
        const productVideoService = new ProductVideoService({
            manager: mockManager
        });
        const newProductVideo = await productVideoService.storeVideo(mockProductId, mockVideoId);
        expect(newProductVideo.video_id).toEqual(mockVideoId);
        expect(newProductVideo.product_id).toEqual(mockProductId);


    });

    it('retrieves a video', async () => {
        const productVideoService = new ProductVideoService({
            manager: mockManager
        });
        const productVideo = await productVideoService.getVideoByProductId(mockProductId);
        expect(productVideo.video_id).toBe(mockVideoId);
        expect(productVideo.product_id).toBe(mockProductId);

        expect(productVideo.embedUrl).toBe(`https://www.youtube.com/embed/${mockVideoId}`);
    });
});