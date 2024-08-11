import { useState } from 'react';
import type { ProductDetailsWidgetProps, WidgetConfig } from "@medusajs/admin"
import { useAdminCustomQuery, useAdminCustomPost } from "medusa-react"

const ProductVideoWidget = ({ product }: ProductDetailsWidgetProps) => {
    const [inputValue, setInputValue] = useState<string>("")

    const { data, isLoading, error } = useAdminCustomQuery(
        `/product-video/${product.id}`,
        [""],
        () => {
            setInputValue(data.video_id)

        }
    )


    const { mutate, } = useAdminCustomPost(
        `/product-video/${product.id}`,
        [""],
    )

    const onInputChange = (event) => {
        setInputValue(event.target.value)

    }

    const addVideo = async () => {
        console.log('trying to add video')
        await mutate({
            videoId: inputValue,
            productId: product.id
        })
    }

    if (isLoading) {
        return;
    }



    return (
        <div className="px-xlarge pt-large pb-xlarge rounded-rounded bg-grey-0 border-grey-20 border">
            <h1 className="text-grey-90 inter-xlarge-semibold" data-testid="product-video-header">Product Video</h1>
            <h2 className='inter-base-semibold'>Video Id</h2>
            <div>
                <div className="bg-grey-5 border-gray-20 px-small py-xsmall rounded-rounded focus-within:shadow-input focus-within:border-violet-60 flex w-full items-center border h-10">
                    <input
                        className="remove-number-spinner leading-base text-grey-90 caret-violet-60 placeholder-grey-40 w-full bg-transparent font-normal outline-none outline-0"
                        onChange={onInputChange}
                        placeholder="Enter video ID" type="text" value={inputValue} />
                </div>
                <button className="btn btn-secondary btn-small flex items-center" type="button" onClick={addVideo}>Add Video</button>
            </div>
            {data?.video_id && <iframe data-testid="product-video-iframe" width="420" height="315"
                src={`https://www.youtube.com/embed/${data.video_id}`}>
            </iframe>}

        </div>
    )
}

export const config: WidgetConfig = {
    zone: "product.details.after",
}

export default ProductVideoWidget