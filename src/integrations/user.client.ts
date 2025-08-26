import axios from "axios";

const BASE_URL = process.env.USER_SERVICE_URL || "http://localhost:7779";
const axiosInstance = axios.create({ baseURL: BASE_URL, timeout: 3000 });

export class UserClient {
  static async fetchUserDetails(userId: number): Promise<UserDetail> {
    // Use a sensible default endpoint; keep path configurable via env when needed.
    const url = `/api-mobile/v3/profile/me`;
    try {
      const response = await axiosInstance.get(url);
      if (response.status !== 200) {
        throw new Error(`Failed to fetch user details: status ${response.status}`);
      }
      return response.data as UserDetail;
    } catch (err: any) {
      // Surface a short, informative error instead of letting the request hang.
      const msg = err?.message || "Unknown error fetching user details";
      console.warn(`UserClient.fetchUserDetails failed for userId=${userId}:`, msg);
      throw new Error(msg);
    }
  }
}

export interface UserDetail {
  id: number;
  total_following: number | null;
  total_follower: number;
  username: string;
  photo: string | null;
  bio: string | null;
  name: string;
  status: number;
  external_id: string | null;
  is_can_claim: 0 | 1;
  is_claimed: 0 | 1;
  birthyear_visibility: "Publik" | "Privat" | string; // tergantung enum di service user
  birthday_visibility: "Publik" | "Privat" | string; // idem
  reference_code: string | null;
  verifiedAt: string | null; // ISO datetime string
  user_share_link: string | null;
  short_reference_code: string | null;
  email: string | null;
  createdAt: string; // ISO datetime string
}

// export interface UserDetail {
//     "id": 1115268,
//     "total_following": null,
//     "total_follower": 1,
//     "username": "rafhi_arizkia",
//     "photo": "https://kenangan.s3-ap-southeast-1.amazonaws.com/undefined/1728742548639-image_cropper_1728742530113.png",
//     "bio": null,
//     "name": "rafhi_arizkia",
//     "status": 1,
//     "external_id": null,
//     "is_can_claim": 0,
//     "is_claimed": 0,
//     "birthyear_visibility": "Publik",
//     "birthday_visibility": "Publik",
//     "reference_code": "f84855a1-725c-451a-ae5e-c8b24312ade9",
//     "verifiedAt": null,
//     "user_share_link": null,
//     "short_reference_code": "jhj6h",
//     "email": "rafhiarizkia16@gmail.com",
//     "createdAt": "2024-08-29T08:57:23.000Z"
// }
