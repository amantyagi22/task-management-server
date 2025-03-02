import { initServer } from "./app";
const PORT = process.env.PORT || 8000;

async function init(){
    const app = await initServer();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

init();