import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testConnection() {
  try {
    const projects = await prisma.project.findMany();
    console.log('Tabela projects encontrada! Aqui estão os registros:', projects);
  } catch (err) {
    console.error('Erro ao acessar a tabela projects:', err);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
