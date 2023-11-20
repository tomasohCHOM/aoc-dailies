const PROGRAMMING_LANGUAGES = [
  "C",
  "C++",
  "C#",
  "Java",
  "JavaScript",
  "TypeScript",
  "Python",
  "Rust",
  "Go",
  "Lua",
  "Ruby",
  "PHP",
  "Swift",
  "Kotlin",
  "Elixir",
  "Zig",
  "OCaml",
  "Julia",
  "Dart",
  "Assembly :)",
];

/**
 * pickRandom picks a random programming language from the list.
 */
export function pickRandom(): string {
  const randomIndex = ~~(Math.random() * PROGRAMMING_LANGUAGES.length);
  const randomSnack = PROGRAMMING_LANGUAGES[randomIndex];
  return randomSnack;
}
