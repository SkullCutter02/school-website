import {MigrationInterface, QueryRunner} from "typeorm";

export class addImagesColumnToPosts1616925316450 implements MigrationInterface {
    name = 'addImagesColumnToPosts1616925316450'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" ADD "images" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "images"`);
    }

}
