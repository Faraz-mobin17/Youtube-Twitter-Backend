/**
 * Get port from environment and store in Express.
 * We normalize the port to a number, string, or false.
 * This is useful for handling different environments (development, production, etc.)
 * and ensures that the server can start without issues related to port conflicts.
 */
export default function normalizePort(
  val: string | number
): number | string | false {
  const port = typeof val === "string" ? parseInt(val, 10) : val;

  if (isNaN(port)) return val; // named pipe
  if (port >= 0 && Number.isFinite(port)) return port; // port number

  return false;
}
