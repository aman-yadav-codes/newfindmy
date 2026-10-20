export type ClassificationModuleId =
  | "travel"
  | "food"
  | "property"
  | "services"
  | "transport"
  | "entertainment";

export interface ClassificationModuleInfo {
  id: ClassificationModuleId;
  name: string;
  description: string;
  iconName: string;
}

export type ItemStatus = "active" | "inactive";

export interface BaseClassificationItem {
  id: string;
  name: string;
  slug: string;
  status: ItemStatus;
  description?: string;
}

export interface FlatClassificationItem extends BaseClassificationItem {
  categoryTag?: string;
  tier?: string;
  capacity?: string;
  group?: string;
  usageCount?: number;
}

export interface HierarchicalClassificationItem extends BaseClassificationItem {
  parentId?: string | null;
  parentName?: string;
  categoryTag?: string;
  usageCount?: number;
  children?: HierarchicalClassificationItem[];
  depth?: number;
}

export interface ClassificationFilterState {
  search: string;
  status: "all" | "active" | "inactive";
  page: number;
  pageSize: number;
  sortBy: string;
  sortOrder: "asc" | "desc";
  customFilter?: string;
}

export interface PaginationInfo {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  startIndex: number;
  endIndex: number;
}

export interface ClassificationFilterResult<T> {
  filteredItems: T[];
  paginatedItems: T[];
  pagination: PaginationInfo;
  search: string;
  setSearch: (query: string) => void;
  status: "all" | "active" | "inactive";
  setStatus: (status: "all" | "active" | "inactive") => void;
  page: number;
  setPage: (page: number) => void;
  pageSize: number;
  setPageSize: (size: number) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  customFilter?: string;
  setCustomFilter: (val: string | undefined) => void;
  resetFilters: () => void;
  hasActiveFilters: boolean;
  activeFiltersCount: number;
  isSearching: boolean;
}

export interface TaxonomyTabDefinition {
  id: string;
  label: string;
  entityName: string;
  entityNamePlural: string;
  searchPlaceholder: string;
  addLabel: string;
  isHierarchical?: boolean;
}
