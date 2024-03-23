
import dotenv from "dotenv";

import Server from "./models/server";

//confgurar dotenv
dotenv.config()


const server=new Server()

server.listen()
