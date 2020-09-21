import Cart from './cart';

export const init = () => {
  renderCart(Cart.list());
  Cart.onChange(renderCart);
};

const renderCart = (items) => {
  const $cart = document.querySelector('.cart');
  const $total = document.querySelector('.total');

  while ($cart.firstChild) {
    $cart.removeChild($cart.firstChild);
  }

  if (items.length) {
    items.forEach((item) => {
      const $product = document.createElement('div');
      $product.classList.add('cart__item');

      $product.appendChild(createImgBlock(item));
      $product.appendChild(createDescrBlock(item));
      $product.appendChild(createQuantityBlock(item));
      $product.appendChild(createRemoveBlock(item));

      $cart.appendChild($product);
    });
  } else {
    const $empty = document.createElement('p');
    $empty.classList.add('cart__empty');
    $empty.innerText = 'The cart is empty.';

    $cart.appendChild($empty);
  }

  $total.innerText = `${Cart.total().toFixed(2)} PLN`;
};

const createImgBlock = (item) => {
  const $img = document.createElement('img');
  $img.classList.add('cart__img');
  $img.src = item.img;
  $img.alt = item.name;

  return $img;
};

const createIdBlock = (item) => {
  const $id = document.createElement('p');
  $id.classList.add('cart__id');
  $id.textContent = `#${item.id}`;

  return $id;
};

const createNameBlock = (item) => {
  const $name = document.createElement('p');
  $name.classList.add('cart__name');
  $name.textContent = item.name;

  return $name;
};

const createDescrBlock = (item) => {
  const $descr = document.createElement('div');
  $descr.classList.add('cart__descr');

  $descr.appendChild(createIdBlock(item));
  $descr.appendChild(createNameBlock(item));

  return $descr;
};

const createQuantityBlock = (item) => {
  const $quantity = document.createElement('div');
  $quantity.classList.add('cart__quantity');

  const $increment = document.createElement('button');
  const $decrement = document.createElement('button');

  $increment.classList.add('btn', 'btn-accent', 'btn-quantity');
  $decrement.classList.add('btn', 'btn-accent', 'btn-quantity');

  $increment.innerText = '+';
  $decrement.innerText = '-';

  $increment.addEventListener('click', (e) => Cart.quantity(item.id, 1));
  $decrement.addEventListener('click', (e) => Cart.quantity(item.id, -1));

  const $value = document.createElement('p');
  $value.textContent = item.quantity;

  $quantity.appendChild($decrement);
  $quantity.appendChild($value);
  $quantity.appendChild($increment);

  return $quantity;
};

const createRemoveBlock = (item) => {
  const $remove = document.createElement('div');
  $remove.classList.add('cart__remove');

  const $btn = document.createElement('button');
  $btn.classList.add('btn', 'btn-warn', 'btn-small');
  $btn.innerText = 'Remove';
  $btn.addEventListener('click', (e) => Cart.remove(item.id));

  $remove.appendChild($btn);

  return $remove;
};

const addBtns = document.querySelectorAll('.js-btn-add');

const addProduct = (e) => {
  const { id, name, price, img } = e.target.dataset;
  console.log(e.target.dataset);
  Cart.add({ id, name, price, img });
};

addBtns.forEach((btn) => btn.addEventListener('click', addProduct));
