import { app } from "./app";
import { prisma } from "./lib/prisma";

const PORT = process.env.PORT || 5001;

async function server() {
  try {
    await prisma.$connect();

    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  } catch (err: any) {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  }
}

server();
