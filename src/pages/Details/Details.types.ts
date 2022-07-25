export type Detail = {
  details: DetailItem;
  success: boolean;
};
export type DetailItem = {
  rules: string;
  playtime: string;
};
export type ErrorMessage = {
  success: boolean;
  errorMessage: string;
};
