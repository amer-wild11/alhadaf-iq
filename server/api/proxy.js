// server/api/proxy.js
import { createProxyMiddleware } from "http-proxy-middleware";

export default createProxyMiddleware({
  target: "https://alhadaf-api.vercel.app",
  changeOrigin: true,
});
