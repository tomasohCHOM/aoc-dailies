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
  "PHP",
  "Swift",
  "Kotlin",
  "Elixir",
  "Assembly",
];

/**
 * pickRandom picks a random snack from the list of snacks.
 */
export function pickRandom(): string {
  const randomIndex = ~~(Math.random() * PROGRAMMING_LANGUAGES.length);
  const randomSnack = PROGRAMMING_LANGUAGES[randomIndex];
  return randomSnack;
}
