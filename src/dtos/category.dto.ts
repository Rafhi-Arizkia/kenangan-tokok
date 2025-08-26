export interface CategoryDTO {
  id: number;
  name: string;
  description?: string;
  parent_id?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCategoryDTO {
  name: string;
  description?: string;
  parent_id?: number;
}

export interface UpdateCategoryDTO {
  name?: string;
  description?: string;
  parent_id?: number;
}

export interface CategoryQueryDTO {
  page?: number;
  limit?: number;
  parent_id?: number;
}
