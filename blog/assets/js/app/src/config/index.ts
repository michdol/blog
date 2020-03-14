function readJSON(elementId: string) {
  return JSON.parse(document.getElementById(elementId).textContent)
}

export const API_URL = readJSON('API_URL');
