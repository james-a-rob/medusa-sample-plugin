import {
    BeforeInsert,
    Column,
    Entity,
    PrimaryColumn,
} from "typeorm"
import { BaseEntity } from "@medusajs/medusa"
import { generateEntityId } from "@medusajs/medusa/dist/utils"

@Entity()
export class Video extends BaseEntity {
    @Column({ type: "varchar" })
    video_id: string | null
    @Column({ type: "varchar" })
    product_id: string | null

    @BeforeInsert()
    private beforeInsert(): void {
        this.id = generateEntityId(this.id, "video")
    }
}