// store yt video id in db
// get video id from db and convert to embed url e.g. /embed/{videoId}
import { TransactionBaseService } from "@medusajs/medusa"
import { Repository } from "typeorm"



import { ProductVideo } from '../models/product-video';

export default class VideoService extends TransactionBaseService {
    // ...
    private productVideoRepo: Repository<ProductVideo>

    constructor(container) {
        super(container)
        this.productVideoRepo = container.manager.getRepository(ProductVideo);
        console.log('container.manager', container.manager.find)
    }

    async getVideoByProductId(): Promise<ProductVideo> {
        const found = await this.productVideoRepo.find()
        console.log('found', found);
        return new ProductVideo

    }
}
