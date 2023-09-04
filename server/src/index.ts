import app from'./app.js';
import connectionToDB from './configs/db.js';


const PORT = process.env.PORT || 5001;

app.listen(PORT, async () => {
    await connectionToDB();
    console.log(`Server is running on http://localhost:${PORT}`);
});