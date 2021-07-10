import {MigrationInterface, QueryRunner} from "typeorm";

export class init1625957479138 implements MigrationInterface {
    name = 'init1625957479138'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying(128) NOT NULL, "email" character varying(128) NOT NULL, "password" character varying(128) NOT NULL, "image" character varying(128) NOT NULL, "role" character varying(128) NOT NULL DEFAULT 'USER_ROLE', "google" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
