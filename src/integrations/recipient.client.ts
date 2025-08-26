import axios from "axios";

const BASE_URL = process.env.USER_SERVICE_URL || "http://localhost:7779";
const axiosInstance = axios.create({ baseURL: BASE_URL, timeout: 3000 });

export class RecipientClient {
  static async fetchRecipientDetails(recipientId: number):Promise<RecipientDetail> {
    const url = `/api-mobile/v2/users/recipients/${recipientId}`;
    try {
      const response = await axiosInstance.get(url);
      if (response.status !== 200) {
        throw new Error(`Failed to fetch recipient details: status ${response.status}`);
      }
      return response.data.data as RecipientDetail;
    } catch (err: any) {
      const msg = err?.message || "Unknown error fetching recipient details";
      console.warn(`RecipientClient.fetchRecipientDetails failed for recipientId=${recipientId}:`, msg);
      throw new Error(msg);
    }
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
