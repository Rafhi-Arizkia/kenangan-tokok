import { QueryInterface } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.bulkInsert('order_status_names', [
    { id: 1, name: 'PENDING', aliases_ind: 'Menunggu' },
    { id: 2, name: 'CONFIRMED', aliases_ind: 'Dikonfirmasi' },
    { id: 3, name: 'PROCESSING', aliases_ind: 'Diproses' },
    { id: 4, name: 'SHIPPED', aliases_ind: 'Dikirim' },
    { id: 5, name: 'DELIVERED', aliases_ind: 'Diterima' },
    { id: 6, name: 'CANCELLED', aliases_ind: 'Dibatalkan' },
    { id: 7, name: 'REFUNDED', aliases_ind: 'Dikembalikan' },
  ]);
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.bulkDelete('order_status_names', {}, {});
}
