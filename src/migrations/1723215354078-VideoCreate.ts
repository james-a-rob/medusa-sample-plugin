import { MigrationInterface, QueryRunner } from "typeorm"

export class VideoCreate1723215354078 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "video" ("id" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "video_id" character varying NOT NULL, "product_id" character varying NOT NULL, PRIMARY KEY ("id"))`)

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "video"`)

    }

}
