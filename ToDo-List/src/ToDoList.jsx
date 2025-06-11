import { useState } from 'react';
import ToDoItem from './ToDoItem';

function ToDoList() {
  let [item, setItem] = useState([]);
  let [input, setInput] = useState('');
  let [isComposing, setIsComposing] = useState(false);

  const inputvalue = (e) => {
    setInput(e.target.value);
  };
  const activeEnter = (e) => {
    if (isComposing) return; // 한글은 조합형 문자라 compositionstart와 compositionend를 구분해야함
    if (e.key === 'Enter') {
      activeBtn();
    }
  };
  const activeBtn = () => {
    if (!input.trim()) return;
    if (item.includes(input)) {
      return (
        <>
          {alert('입력하신 항목이 이미 존재합니다!')}
          {setInput('')}
        </>
      );
    }
    setItem([...item, input]);
    setInput('');
  };

  return (
    <>
      <div>
        <input
          className="inputTodo"
          type="text"
          placeholder="해야할 일을 작성해주세요!"
          value={input}
          onChange={inputvalue}
          onKeyDown={activeEnter}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
        />
        <button
          className="addBtn"
          onClick={() => {
            activeBtn();
          }}
        >
          ➕
        </button>
      </div>
      <ToDoItem item={item} setItem={setItem} />
    </>
  );
}

export default ToDoList;
