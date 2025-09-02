import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function main() {
  await prisma.user.deleteMany();
  await prisma.company.deleteMany();

  const users = [
    {
      name: 'Imron',
      phone: '081234567890',
    },
    {
      name: 'Juli',
      email: 'Sammy@mail.com',
      phone: '0987654321',
    },
    {
      name: 'Gajah Mada',
    },
  ];

  const [imron, juli] = await Promise.all(
    users.map((user) =>
      prisma.user.create({
        data: user,
      }),
    ),
  );

  await prisma.company.createMany({
    data: [
      {
        user_id: imron.id,
        company_code: 'SPI',
      },
      {
        company_name: 'Samudera',
      },
      {
        user_id: juli.id,
        company_code: 'PIC',
        company_name: 'Samudera',
      },
    ],
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
