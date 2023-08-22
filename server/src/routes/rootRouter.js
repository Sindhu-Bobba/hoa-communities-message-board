import express from "express";
import userSessionsRouter from "./api/v1/userSessionsRouter.js";
import usersRouter from "./api/v1/usersRouter.js";
import clientRouter from "./clientRouter.js";
import communitiesRouter from "./api/v1/communitiesRouter.js"
import postRouter from "./api/v1/postRouter.js";

const rootRouter = new express.Router();
rootRouter.use("/", clientRouter);
rootRouter.use("/api/v1/user-sessions", userSessionsRouter);
rootRouter.use("/api/v1/users", usersRouter);

//place your server-side routes here
rootRouter.use("/api/v1/communities", communitiesRouter)
rootRouter.use("/api/v1/communities", postRouter)

export default rootRouter;
