document.addEventListener("DOMContentLoaded", function() {
  // HTML에서 필요한 요소들을 가져옵니다.
  const todoInput = document.getElementById("todoInput");
  const todoList = document.getElementById("todoList");
  const completedList = document.getElementById("completedList");

  // 할 일 입력 필드에서 엔터 키를 누르면 이벤트가 발생합니다.
  todoInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      // 입력 필드에서 값을 가져옵니다.
      const task = todoInput.value.trim();
      // 값이 비어있지 않은 경우에만 추가합니다.
      if (task !== "") {
        // 새로운 할 일 항목을 생성합니다.
        const todoItem = document.createElement("div");
        todoItem.classList.add("todo-item");

        // 할 일 텍스트를 생성하고 추가합니다.
        const taskText = document.createElement("p");
        taskText.textContent = task;
        todoItem.appendChild(taskText);

        // 완료 버튼을 생성하고 클릭 이벤트를 추가합니다.
        const completeButton = document.createElement("button");
        completeButton.textContent = "완료";
        completeButton.addEventListener("click", function() {
          // 완료된 항목을 해낸 일 목록으로 이동시킵니다.
          const completedItem = document.createElement("div");
          completedItem.classList.add("todo-item");

          const completedTaskText = document.createElement("p");
          completedTaskText.textContent = task;
          completedItem.appendChild(completedTaskText);

          // 삭제 버튼을 생성하고 클릭 이벤트를 추가합니다.
          const deleteButton = document.createElement("button");
          deleteButton.textContent = "삭제";
          deleteButton.addEventListener("click", function() {
            completedItem.remove(); // 해당 항목 삭제
          });
          completedItem.appendChild(deleteButton);

          // 완료된 목록에 추가합니다.
          completedList.appendChild(completedItem);
          todoItem.remove(); // 기존 항목 제거
        });

        // 할 일 목록에 추가합니다.
        todoList.appendChild(todoItem);
        todoItem.appendChild(completeButton);

        todoInput.value = ""; // 입력 필드 비우기
      }
    }
  });
});
