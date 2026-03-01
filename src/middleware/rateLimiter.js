import rateLimit from "express-rate-limit";

// 1. General Limiter: For general API browsing (e.g., 100 requests per 15 mins)
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: "Too many requests from this IP, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// 2. Auth Limiter: Stricter for Login/Register (e.g., 20 requests per 15 mins)
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: {
    success: false,
    message: "Too many login/register attempts, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// 3. Action Limiter: Very strict for writes like Placing Orders/Reviews (e.g., 10 per hour)
export const actionLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
  message: {
    success: false,
    message: "Too many actions performed, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
