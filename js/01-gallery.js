import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);

const galleryItemsContainer = document.querySelector(".gallery"); 
const galleryItemsMarkUp = createGalleryItems(galleryItems);

galleryItemsContainer.insertAdjacentHTML("beforeend", galleryItemsMarkUp)

// Створення розмітки
function createGalleryItems(galleryItems) {
    return galleryItems.map(({preview, original, description}) => {
    return `<div class="gallery__item">
    <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${ preview }"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`
  }).join("");
}
// console.log(createGalleryItems(galleryItems));

// рендеримо на сторінку
galleryItemsContainer.insertAdjacentHTML("beforeend", galleryItemsMarkUp)

// перевірка чи не промахнувся з кліком і відкриття модалки через бібліотеку lightbox
const galleryItemElClick = event => {
  event.preventDefault()
  if (event.target.nodeName !== "IMG") {
    return
  }
  const imageAttribute = event.target.dataset.source;
  
  // lightbox
  const instance = basicLightbox.create(`
    <img src=${imageAttribute} width="800" height="600">
`)
  instance.show()

  // закриття модалки клавішою escape
  document.addEventListener("keydown", event => {
    if (event.code !== "Escape") {
       return
    }
    instance.close()
   })
}

galleryItemsContainer.addEventListener("click", galleryItemElClick)

