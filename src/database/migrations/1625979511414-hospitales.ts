import {MigrationInterface, QueryRunner} from "typeorm";

export class hospitales1625979511414 implements MigrationInterface {
    name = 'hospitales1625979511414'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "hospitales" ("id" SERIAL NOT NULL, "name" character varying(128) NOT NULL, "image" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_2170243d42467fc96e4e9256812" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "hospitales" ADD CONSTRAINT "FK_1b8349cd87ae02143b437b20c00" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hospitales" DROP CONSTRAINT "FK_1b8349cd87ae02143b437b20c00"`);
        await queryRunner.query(`DROP TABLE "hospitales"`);
    }

}
