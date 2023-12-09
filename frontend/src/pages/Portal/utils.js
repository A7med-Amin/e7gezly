export const username_pattern = /^[a-zA-Z0-9]+$/;
export const password_pattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
export const email_pattern = /^([\w_\.]+)@([\w_\.]+) (\.[a-zA-z]{2,5}){1,2}$/;
