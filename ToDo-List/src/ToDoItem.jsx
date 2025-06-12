function ToDoItem(props) {
  return (
    <>
      {props.item.map((todo, i) => {
        return (
          <AddList
            key={i}
            i={i}
            todo={todo}
            item={props.item}
            setItem={props.setItem}
          />
        );
      })}
    </>
  );
}

export default ToDoItem;

function AddList(props) {
  return (
    <>
      <div className="list">
        {props.i + 1}. {props.todo}
        <div className="btnbox">
          {/* <span onClick={() => {}}>✏️</span> */}
          <span
            onClick={() => {
              const changeitem = [...props.item];
              changeitem.splice(props.i, 1);
              props.setItem(changeitem);
            }}
          >
            ❌
          </span>
        </div>
      </div>
    </>
  );
}
