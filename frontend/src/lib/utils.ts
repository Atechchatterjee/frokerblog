import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseJSONSafely(content: string) {
  try {
    let parsedJSON = JSON.parse(content);
    return parsedJSON;
  } catch (err) {
    console.error(err);
    return {};
  }
}

export async function fetchSpecificDummyImage(photoId: number) {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await fetch(
        `https://api.slingacademy.com/v1/sample-data/photos/${photoId}`
      );
      const data = await res.json();
      resolve(data);
    } catch (err) {
      console.error(err);
      reject(err);
    }
  });
}

export async function fetchDummyImages(limit: number, offset?: number) {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await fetch(
        `https://api.slingacademy.com/v1/sample-data/photos?limit=${limit}&offset=${
          offset ?? 10
        }`
      );
      const data = await res.json();
      resolve(data);
    } catch (err) {
      console.error(err);
      reject(err);
    }
  });
}
