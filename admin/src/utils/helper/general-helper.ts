export function createDynamicUrl(
  baseUrl: string,
  queryParams: Record<string, unknown>
) {
  const queryString = Object.entries(queryParams)
    .map(([key, value]) => {
      const encodedKey = encodeURIComponent(key);
      const encodedValue =
        typeof value === "string"
          ? encodeURIComponent(value)
          : value?.toString();
      return `${encodedKey}=${encodedValue}`;
    })
    .join("&");

  let url = baseUrl.replace(/{([^}]+)}/g, (_, key) => {
    // Used Object.prototype.hasOwnProperty.call() for a safer check
    if (Object.prototype.hasOwnProperty.call(queryParams, key)) {
      const value = queryParams[key] as string | number | boolean;
      return encodeURIComponent(value.toString());
    }
    return encodeURIComponent(key);
  });

  url += "?" + queryString;
  return url;
}

export function validateNumberGreaterThanValueRule(
  value: number,
  greaterThan: number
) {
  if (value && Number(value) <= greaterThan) {
    return Promise.reject(
      new Error(`Please enter a number greater than ${greaterThan}`)
    );
  }
  return Promise.resolve();
}

export function generateRequiredRule(text: string) {
  return {
    required: true,
    message: text,
  };
}
