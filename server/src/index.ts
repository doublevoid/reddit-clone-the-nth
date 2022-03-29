import { MikroORM, EntityManager, RequestContext } from "@mikro-orm/core";
import { env } from "process";
import config from './mikro-orm.config'
import express from 'express';
import http from 'http'

export const DI = {} as {
    server: http.Server;
    orm: MikroORM,
    em: EntityManager
}

export const app = express();
const port = env.PORT || 3000;

export const main = (async () => {
    DI.orm = await MikroORM.init(config);
    DI.em = DI.orm.em;
    app.use(express.json())
    app.use((req, res, next) => RequestContext.create(DI.orm.em, next));

    DI.server = app.listen(port, () => {
        console.log(`MikroORM express started at http://localhost:${port}`);
    })
})();