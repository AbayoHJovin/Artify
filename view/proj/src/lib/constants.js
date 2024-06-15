/* eslint-disable no-undef */

export const prod = process.env.NODE_ENV === "production";

export const apiUrl = prod
  ? "https://artify-hyhm.onrender.com"
  : "http://localhost:2024";
