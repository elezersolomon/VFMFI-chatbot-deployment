const escapifyString = (value: string): string => {
  return value
    .replace(/\./g, "\\.")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");
};

export default function escapifyJson(obj: Object): any {
  if (typeof obj === "string") {
    return escapifyString(obj);
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => escapifyJson(item));
  }

  if (typeof obj === "object" && obj !== null) {
    const escapifiedObject: { [key: string]: Object } = {};
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === "string") {
        escapifiedObject[key] = escapifyString(value);
      } else {
        escapifiedObject[key] = escapifyJson(value);
      }
    }
    return escapifiedObject;
  }

  return obj; // Return primitive types as-is.
}
