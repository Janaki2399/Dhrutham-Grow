export type Detail = {
  details: DetailItem;
  success: Boolean;
};
export type DetailItem = {
  rules: String;
  playtime: String;
};
export type ErrorMessage = {
  success: Boolean;
  errorMessage: String;
};
