import {MigrationInterface, QueryRunner} from "typeorm";

export class createOpportunitySchema1616856368263 implements MigrationInterface {
    name = 'createOpportunitySchema1616856368263'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "opportunities" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "imageUrl" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "contactEmail" character varying NOT NULL, CONSTRAINT "PK_4bd9cd12ddc0ff48a5a97ddebce" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "opportunities"`);
    }

}
