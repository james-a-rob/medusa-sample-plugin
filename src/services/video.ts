// store yt video id in db
// get video id from db and convert to embed url e.g. /embed/{videoId}
import { TransactionBaseService } from "@medusajs/medusa"
import { Repository } from "typeorm"



import { Video } from '../models/video';

export default class VideoService extends TransactionBaseService {
    // ...
    private videoRepo: Repository<Video>

    constructor(container) {
        super(container)
        this.videoRepo = container.manager.getRepository(Video);
        console.log('container.manager', container.manager.find)
    }

    async getVideoByProductId(): Promise<Video> {
        const found = await this.videoRepo.find()
        console.log('found', found);
        return new Video

    }
}
