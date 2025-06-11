import ToDoItem from './ToDoItem';
import ToDoList from './ToDoList';

function ToDoMain() {
  return (
    <div className="maindiv">
      <div className="title">To-Do List</div>
      <div className="content">
        <ToDoList />
      </div>
    </div>
  );
}

export default ToDoMain;
