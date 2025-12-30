import { jwtDecode } from "jwt-decode";

type JwtDecodeResponse = {
  exp: number;
  organization_id: string;
  user_id: string;
  user_role: string;
};

export const decodeJwt = (token: string) => {
  try {
    const decodedToken: JwtDecodeResponse = jwtDecode(token);
    return decodedToken;
  } catch (error) {
    return null;
  }
};

export const organizationDataFromToken = (token: string) => {
  const decodedToken = decodeJwt(token);
  const organizationId = decodedToken?.organization_id;
  const userRole = decodedToken?.user_role;
  return { organizationId, userRole };
};
