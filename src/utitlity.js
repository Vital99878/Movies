export default function num_round_half(num) {
  const res = Math.floor(num);
  const i = num % res;
  return i < 0.25 ? res : i < 0.75 ? res + 0.5 : res + 1;
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

export function rm_active_class(active_class, no_active_class) {
  const item = document.querySelector(`. +${active_class}`);
  item.classList.remove(active_class);
  item.classList.add(no_active_class);
}

export const EventHandler = (active_class, no_active_class) => (evt) => {
  evt.preventDefault();
  const item = evt.target;
  console.log(item);
  // работает с тегом a
  if (item.classList.contains(no_active_class)) {
    rm_active_class(active_class, no_active_class);
    item.classList.add(active_class);
  }
  // работает с тегом li
  else if (item.parentNode.classList.contains(no_active_class)) {
    rm_active_class(active_class, no_active_class);
    item.parentNode.classList.add(active_class);
  }
};

