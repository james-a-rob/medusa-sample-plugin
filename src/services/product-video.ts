// store yt video id in db
// get video id from db and convert to embed url e.g. /embed/{videoId}
import { TransactionBaseService } from "@medusajs/medusa"
import { Repository } from "typeorm"



import { ProductVideo } from '../models/product-video';

export default class VideoProductService extends TransactionBaseService {
    // ...
    private productVideoRepo: Repository<ProductVideo>

    constructor(container) {
        super(container)
        this.productVideoRepo = container.manager.getRepository(ProductVideo);
    }

    async getVideoByProductId(productId: string): Promise<Partial<ProductVideo> & { embedUrl: string }> {
        const productVideo = await this.productVideoRepo.findOne({ where: { product_id: productId }, order: { id: 'DESC' } });
        if (productVideo) {
            const response = { ...productVideo, embedUrl: `https://www.youtube.com/embed/${productVideo.video_id}` }
            return response;
        }
    }

    async storeVideo(productId: string, videoId: string) {
        const newProductVideo = new ProductVideo();
        newProductVideo.product_id = productId;
        newProductVideo.video_id = videoId;
        await this.productVideoRepo.save(newProductVideo);

        return newProductVideo;

    }

    // async storeProductVideo(productVideo){} 
}
