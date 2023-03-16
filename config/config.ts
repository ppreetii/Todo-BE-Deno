import { config as dotEnvConfig } from 'https://deno.land/x/dotenv@v1.0.1/mod.ts';
	
let env =  dotEnvConfig({}) ;

export const port: number = +env.PORT  || 8000;
export const mongodbUrl = env.MONGO_URL;