import axios from "axios";

export class RecipientClient {
  static async fetchRecipientDetails(recipientId: number) {
    const url = `http://0.0.0.0:7779/api-mobile/v2/users/recipients/${recipientId}`;

    const response = await axios.get(url);
    if (response.status !== 200) {
      throw new Error("Failed to fetch recipient details");
    }
    return response.data.data as Promise<RecipientDetail>;
  }
}

// src/integrations/dto/recipient.dto.ts

export interface RecipientDetail {
  id: number;
  name: string;
  phone: string;
  user_id: number;
  address: string;
  description: string | null;
  province: string;
  city: string;
  kecamatan: string;
  kelurahan: string;
  street: string | null;
  area_id: number | null;
  suburb_id: number | null;
  postal_code: string | null;
  lat: string | null;
  lng: string | null;
  open_gift: 0 | 1;
  main_address: 0 | 1;
  createdAt: string; // ISO datetime string
  updatedAt: string; // ISO datetime string
}
