import type {
    MedusaRequest,
    MedusaResponse,
} from "@medusajs/medusa"
import ProductVideoService from "../../../../services/product-video"

// get video id by product id
// create video. passing in product id 
export const GET = async (
    req: MedusaRequest,
    res: MedusaResponse
) => {
    console.log('here in video embed', req.query);
    const productId = req.params.productId


    if (!productId) {
        return res.status(400).json({ message: "no product id supplied" })
    }
    const productVideoService = req.scope.resolve<ProductVideoService>(
        "productVideoService"
    )
    const productVideo = await productVideoService.getVideoByProductId(productId);

    if (!productVideo) {
        return res.status(404).json({ message: "no product video found" })
    }

    res.json(productVideo);
}

export const POST = async (
    req: MedusaRequest<{ productId: string, videoId: string }>,
    res: MedusaResponse
) => {
    const productId = req.params.productId
    const videoId = req.body.videoId
    console.log('productId', productId)
    console.log('videoId', videoId)

    const productVideoService = req.scope.resolve<ProductVideoService>(
        "productVideoService"
    )
    const newProductVideo = await productVideoService.storeVideo(productId, videoId);
    if (!newProductVideo) {
        return res.status(404).json({ message: "failed to create product video" });
    }
    res.json(newProductVideo)

}
