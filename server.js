import { App } from './src/app';

let port = process.env.PORT || 5000;

const app = new App();

app.startup(port);