import { OrderModel } from "../../models";


// Generate a unique order id like legacy implementation: prefix KN + 6 chars from shuffled alphabet
export default async function generateOrderId(): Promise<string> {
  const characters = 'GjA0uHiPYvWeC1pcU2fN9tqhorOEdmDZgsK6Sw3IaQTR8kbxyVJn7lzBF4L5XM';
  let res = 'KN';
  for (let i = 0; i < 6; ++i) {
    res += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  const exists = await OrderModel.findByPk(res, { attributes: ['id'] });
  if (exists) {
  console.debug('[generateOrderId] collision - retrying', { candidate: res });
  return generateOrderId();
  }
  return res;
}
