import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState, customCategoriesState } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const customCategories = useRecoilValue(customCategoriesState); // 사용자 정의 카테고리 가져오기

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as any }; // 새로운 카테고리로 이동
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };

  return (
    <li>
      <span>{text}</span>
      {category !== Categories.DOING && (
        <button name={Categories.DOING} onClick={onClick}>
          Doing
        </button>
      )}
      {category !== Categories.TO_DO && (
        <button name={Categories.TO_DO} onClick={onClick}>
          To Do
        </button>
      )}
      {category !== Categories.DONE && (
        <button name={Categories.DONE} onClick={onClick}>
          Done
        </button>
      )}
      {customCategories.map(
        (customCategory) =>
          category !== customCategory && (
            <button key={customCategory} name={customCategory} onClick={onClick}>
              {customCategory}
            </button>
          )
      )}
    </li>
  );
}

export default ToDo;
