/** Full name for display (supports structured name fields or legacy `name`) */
export function getStudentDisplayName(s) {
  if (!s) return "";
  if (s.firstName != null || s.lastName != null) {
    return [s.firstName, s.middleName, s.lastName].filter(Boolean).join(" ").trim();
  }
  return s.name || "";
}
