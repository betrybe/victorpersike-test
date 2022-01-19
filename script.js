let list = [];

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  return li;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  const sku = getSkuFromProductItem(event.path[1]);
  const cardItem = list.find((x) => x.id === sku);
  const items = document.getElementsByClassName('cart__items');
  items[0].appendChild(
    createCartItemElement({
      sku: cardItem.id,
      name: cardItem.title,
      salePrice: cardItem.price,
    }),
  );
}
function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  e.addEventListener('click', cartItemClickListener);
  return e;
}
function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(
    createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'),
  );
  return section;
}
window.onload = () => {
  fetch('https://api.mercadolibre.com/sites/MLB/search?q=$QUERY')
    .then((resposta) => resposta.json())
    .then((json) => {
      list = json.results;
      const items = document.getElementsByClassName('items');
      json.results.forEach((produto) => {
        items[0].appendChild(
          createProductItemElement({
            sku: produto.id,
            name: produto.title,
            image: produto.thumbnail,
          }),
        );
        return json;
      });
    });
};
