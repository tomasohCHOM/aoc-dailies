const MESSAGES: string[] = [
  "You've got this! Keep pushing forward!",
  "Believe in yourself and your coding skills!",
  "Embrace the challenge and enjoy the journey!",
  "Remember, every problem is an opportunity to learn!",
  "Stay determined and keep coding with enthusiasm!",
  "Don't give up! Success is just around the corner!",
  "You're doing amazing! Keep up the great work!",
  "Celebrate each step of progress, no matter how small!",
  "Coding is an adventure, enjoy the thrill!",
  "You're making Santa proud with your coding skills!",
];

/**
 * getRandomMessage picks a random encouraging message from the list.
 */
export function getRandomMessage(): string {
  return MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
}
