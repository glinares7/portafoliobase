export default function comprasApp() {
  const server = process.env.NEXT_PUBLIC_SERVER || "http://localhost:3000";

  return {
    server,
  };
}
