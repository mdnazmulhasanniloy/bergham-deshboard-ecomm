export default function firstLetterUppercase(input: any) {
  if (!input) return "";
  return input
    .split(" ")
    .map(
      (word: any) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join(" ");
}
