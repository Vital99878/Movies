export default function num_round_half(num) {
  const d = Math.floor(num);
  const i = num % d;
  return i < 0.25 ? d : i < 0.75 ? d + 0.5 : d + 1;
}

export function truncate_update(str, maxlength) {
  const words = str.split(' ');
  words.splice(words.length - 1, 1);

  return words.join(' ').length <= maxlength ? `${words.join(' ')} …` : truncate_update(words.join(' '), maxlength);
}

export function create_pages(arr, divider) {
  const pages = [];
  while (arr.length >= divider) {
    const page = arr.splice(0, divider);
    pages.push(page);
  }
  if (arr.length !== 0) {
    pages.push(arr);
  }
  return pages;
}