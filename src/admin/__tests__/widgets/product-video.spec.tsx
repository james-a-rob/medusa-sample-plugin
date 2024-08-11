/**
 * @jest-environment jsdom
 */

import type {
    ProductTag,
} from "@medusajs/medusa";

import type { ProductDetailsWidgetProps } from "@medusajs/admin"
import { render, screen, cleanup, waitFor, fireEvent } from "@testing-library/react";
import userEvent from '@testing-library/user-event';

import '@testing-library/jest-dom'
import { mock } from 'jest-mock-extended';
import nock from 'nock';
import { MedusaProvider as Provider } from "medusa-react"
import { QueryClient } from "@tanstack/react-query"

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            staleTime: 90000,
            retry: 1,
        },
    },
})

import ProductVideo from '../../widgets/product-video';


describe('product video admin widget', () => {

    afterEach(() => {
        nock.cleanAll();
        queryClient.clear();
    });


    it('renders preview if product has video', async () => {
        nock("http://localhost/test")
            .defaultReplyHeaders({
                "access-control-allow-origin": "*",
            })
            .get("/admin/product-video/1234")
            .reply(200, {
                "id": "product-video_01J4YJCAZ5J20K1ZSPDFAV675A",
                "created_at": "2024-08-10T16:36:37.477Z",
                "updated_at": "2024-08-10T16:36:37.477Z",
                "video_id": "abc",
                "product_id": "1234",
                "embedUrl": "https://www.youtube.com/embed/blah"
            });

        const mockProductDetails = mock<ProductDetailsWidgetProps>()
        mockProductDetails.product.id = "1234"


        render(
            <Provider baseUrl="test" queryClientProviderProps={{ client: queryClient }}>
                <ProductVideo {...mockProductDetails} />
            </Provider>
        );
        await (waitFor(() => screen.getByText('Product Video'), { timeout: 3000 }));

        const header = screen.getByTestId("product-video-header");
        const videoIframe = screen.getByTestId("product-video-iframe");
        expect(videoIframe).toHaveAttribute('src', 'https://www.youtube.com/embed/abc')

        expect(header).toHaveTextContent("Product Video")
    });

    it('supports adding a new video', async () => {
        const mockVideoId = "def1";
        nock("http://localhost/test")
            .defaultReplyHeaders({
                "access-control-allow-origin": "*",
            })
            .get("/admin/product-video/1234")
            .reply(200, null)
            .post("/admin/product-video/1234")
            .reply(200, {
                "id": "product-video_01J4YJCAZ5J20K1ZSPDFAV675A",
                "created_at": "2024-08-10T16:36:37.477Z",
                "updated_at": "2024-08-10T16:36:37.477Z",
                "video_id": mockVideoId,
                "product_id": "1234",
                "embedUrl": "https://www.youtube.com/embed/blah"
            })
            .get("/admin/product-video/1234")
            .reply(200, {
                "id": "product-video_01J4YJCAZ5J20K1ZSPDFAV675A",
                "created_at": "2024-08-10T16:36:37.477Z",
                "updated_at": "2024-08-10T16:36:37.477Z",
                "video_id": mockVideoId,
                "product_id": "1234",
                "embedUrl": "https://www.youtube.com/embed/blah"
            })




        const mockProductDetails = mock<ProductDetailsWidgetProps>()
        mockProductDetails.product.id = "1234"


        render(
            <Provider baseUrl="test" queryClientProviderProps={{ client: queryClient }}>
                <ProductVideo {...mockProductDetails} />
            </Provider>
        );
        await (waitFor(() => screen.getByText('Product Video'), { timeout: 3000 }));


        const input = screen.getByPlaceholderText('Enter video ID');

        // Simulate typing into the input
        fireEvent.change(input, { target: { value: mockVideoId } });
        const button = screen.getByText('Add Video');
        await userEvent.click(button);
        await (waitFor(() => screen.getByTestId("product-video-iframe"), { timeout: 3000 }));
        const videoIframe = screen.getByTestId("product-video-iframe");

        expect(videoIframe).toHaveAttribute('src', `https://www.youtube.com/embed/${mockVideoId}`)
    });

});
