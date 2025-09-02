import { PrismaClient } from '../generated/prisma/index.js';

const prisma = new PrismaClient();

async function main() {
  await prisma.company.deleteMany();
  await prisma.user.deleteMany();

  const [imron, juli, gajahMada] = await Promise.all(
    [
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
    ].map((user) =>
      prisma.user.create({
        data: user,
      }),
    ),
  );


  await prisma.company.create({
    data: {
      user_id: imron.id,
      company_code: 'SPI',
      company_name: 'Company SPI',
    },
  });

  await prisma.company.create({
    data: {
      company_code: 'SAM',
      company_name: 'Samudera',
    },
  });

  await prisma.company.create({
    data: {
      user_id: juli.id,
      company_code: 'PIC',
      company_name: 'Samudera',
    },
  });
}

main()
  .then(async () => {
    console.log('✅ Seeding selesai');
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Error seeding:', e);
    await prisma.$disconnect();
    e.exit(1);
  });
