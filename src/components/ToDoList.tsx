import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useForm } from "react-hook-form";
import { Categories, categoryState, customCategoriesState, toDoSelector } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

interface IFormInput {
  category: string;
}

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const [customCategories, setCustomCategories] = useRecoilState(customCategoriesState);
  const { register, handleSubmit, setValue } = useForm<IFormInput>();

  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };

  const onValid = ({ category }: IFormInput) => {
    setCustomCategories((prev) => [...prev, category]); // 새 카테고리 추가
    setValue("category", ""); // 입력 필드 초기화
  };

  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <select value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>To Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
        {customCategories.map((custom) => (
          <option key={custom} value={custom}>
            {custom}
          </option>
        ))}
      </select>
      <form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("category", { required: true })}
          placeholder="New Category"
        />
        <button>Add Category</button>
      </form>
      <CreateToDo />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}

export default ToDoList;
