const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = [];

function addItem(e) {
  e.preventDefault(); // page reloading을 막아줌
  const text = (this.querySelector('[name=item]')).value;
  const item = {
    text,       // ES6 key값과 value값이 같을 경우 생략 가능
    done: false
  };

  items.push(item);
  populateList(items, itemsList);
  this.reset();
}

function populateList(plates = [], platesList) {  //함수 파라미터 값에 default 설정 가능
  platesList.innerHTML = plates.map((plate, i) => {
    return `
      <li>
        <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''} />
        <label for="item${i}">${plate.text}</label>
      </li>
    `
  }).join('');
  console.log(platesList);
}

addItems.addEventListener('submit', addItem);