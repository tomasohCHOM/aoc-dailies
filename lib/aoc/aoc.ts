import { DOMParser } from "aoc-dailies/deps.ts";

const AOC_API_URL = "https://adventofcode.com";

/**
 * AoCDailyOptions are the options for querying the AoC daily puzzle.
 */
export interface AoCDailyOptions {
  /**
   * year is the year of the puzzle.
   */
  year: number;

  /**
   * day is the day of the puzzle.
   */
  day: number;
}

/**
 * AoCDaily is the daily puzzle for Advent of Code.
 */
export interface AoCDaily {
  /**
   * text is the plain text content of the puzzle.
   */
  text: string;

  /**
   * title is the title of the puzzle.
   */
  title: string;

  /**
   * description is the description of the puzzle.
   */
  description: string;

  /**
   * url is the url path of the puzzle.
   */
  url: string;
}

/**
 * getAoCDaily returns the daily puzzle for Advent of Code.
 */
export async function getAoCDaily(options: AoCDailyOptions): Promise<AoCDaily> {
  const url = makeAoCDailyURL(options);
  const html = await fetch(url).then((res) => res.text());
  const document = new DOMParser().parseFromString(html, "text/html");
  if (!document) {
    throw new Error("Failed to parse HTML!");
  }

  const text = document.querySelector("article.day-desc")?.textContent;
  if (!text) {
    throw new Error("Failed to obtain text content!");
  }
  const title = text?.match(/--- Day \d+: (.+) ---/)?.[1] ?? "";
  if (!title) {
    throw new Error("Failed to parse title!");
  }
  const description = text?.match(/--- Day \d+: .+ ---((.|\n)+)/m)?.[1] ?? "";
  if (!description) {
    throw new Error("Failed to parse description!");
  }

  return { text, title, description, url };
}

/**
 * makeAoCDailyURL returns the URL for the daily puzzle for Advent of Code.
 */
export function makeAoCDailyURL(options: AoCDailyOptions): string {
  return `${AOC_API_URL}/${options.year}/day/${options.day}`;
}
