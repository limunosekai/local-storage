const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const deleteItems = document.querySelector('.delete-items');
const items = JSON.parse(localStorage.getItem('items')) || []; //왼쪽을 먼저 실행, false일 경우 오른쪽 실행

function addItem(e) {
  e.preventDefault(); // submit event의 page reloading을 막아줌
  const text = this.querySelector('[name=item]').value;
  const item = {
    text, // ES6 key값과 value값이 같을 경우 생략 가능
    done: false,
  };

  items.push(item);
  populateList(items, itemsList);
  //localStorage에 key & value 값으로 저장
  localStorage.setItem('items', JSON.stringify(items));
  this.reset();
}

//함수 파라미터 값에 default 설정 가능
function populateList(plates = [], platesList) {
  platesList.innerHTML = plates
    .map((plate, i) => {
      return `
      <li>
        <input type="checkbox" data-index=${i} id="item${i}" ${
        plate.done ? 'checked' : ''
      } />
        <label for="item${i}">${plate.text}</label>
      </li>
    `;
    })
    .join('');
}

function toggleDone(e) {
  if (!e.target.matches('input')) return; // checkbox 영역 이외의 부분을 클릭하면 escape
  const el = e.target;
  const index = el.dataset.index;
  items[index].done = !items[index].done;
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemsList);
}

function removeItem(e) {
  localStorage.clear();
  populateList(items, itemsList);
}

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone); // 이벤트의 위임, li를 감싸고 있는 ul에 이벤트를 건다.
deleteItems.addEventListener('submit', removeItem);

populateList(items, itemsList);
