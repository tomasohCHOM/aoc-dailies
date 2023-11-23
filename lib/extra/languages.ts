const PROGRAMMING_LANGUAGES = [
  "Python",
  "JavaScript/TypeScript",
  "Java",
  "C#",
  "C/C++",
  "Go",
  "Rust",
  "Assembly :)",
];

/**
 * getProgrammingLanguage returns a programming language from the list based on the day of the month.
 */
export function getProgrammingLanguage(day: number): string {
  const programmingLanguage =
    PROGRAMMING_LANGUAGES[day % PROGRAMMING_LANGUAGES.length];
  return programmingLanguage;
}
