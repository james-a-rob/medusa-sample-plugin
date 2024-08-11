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
    const productId = req.params.productId


    if (!productId) {
        return res.status(400).json({ message: "no product id supplied" })
    }
    const productVideoService = req.scope.resolve<ProductVideoService>(
        "productVideoService"
    )
    const productVideo = await productVideoService.getVideoByProductId(productId);

    if (!productVideo) {
        return res.status(200).json(null)
    }

    res.json(productVideo);
}