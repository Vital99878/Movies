export function truncate(str, maxlength) {
  const words = str.split(' ');
  words.splice(words.length - 1, 1);

  return words.join(' ').length <= maxlength ? `${words.join(' ')} …` : truncate(words.join(' '), maxlength);
}

export function create_pages(arr, divider) {
  const pages = [];
  while (arr.length >= divider) {
    const page = arr.splice(0, divider);
    pages.push(page);
  }
  if (arr.length !== 0)  {
    pages.push(arr);
  }
  return pages;
}

export function rm_class(claz) {
  const item = document.querySelector(`.${claz}`);
  item.classList.remove(claz);
}




