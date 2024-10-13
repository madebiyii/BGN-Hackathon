// Remove all dots from the userId and replace them with underscores
export function encodeUserId(userId) {
  return userId.replace(/\./g, "_");
}