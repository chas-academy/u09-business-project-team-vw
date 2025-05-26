import { JwtUserPayload } from "../User/JwtUserPayload";

export interface AuthenticatedRequest extends Request {
    user?: JwtUserPayload;
}