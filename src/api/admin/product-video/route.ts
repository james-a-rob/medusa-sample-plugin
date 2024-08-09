import type {
    MedusaRequest,
    MedusaResponse,
} from "@medusajs/medusa"

import ProductVideoService from "../../../services/product-video"

// get video id by product id
// create video. passing in product id

export const GET = async (
    req: MedusaRequest,
    res: MedusaResponse
) => {
    console.log('here in video embed')
    const videoService = req.scope.resolve<ProductVideoService>(
        "productVideoService"
    )
    await videoService.getVideoByProductId()
    // take input product id and url
    // validate url
    // call video-embed-service
    // service saves 
    res.json({
        videoId: null,
    })
}

export const POST = (
    req: MedusaRequest,
    res: MedusaResponse
) => {
    res.json({
        message: "[POST] Hello world!",
    })

}
