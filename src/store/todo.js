import _ from 'lodash';

const storage = {
    // todoList 로컬스토리지 가져오기
    todoListFetch() {
        const todoListJSON = localStorage.getItem('todoList');
        if (!todoListJSON) {
            localStorage.setItem('todoList', '[]');
            return [];
        }
        const todoList = JSON.parse(todoListJSON);
        return todoList;
    },
    // todoList 로컬스토리지 변경
    todoListSet(todoList) {
        localStorage.setItem('todoList', JSON.stringify(todoList));
    },
    // 테마 로컬스토리지 가져오기
    themeFetch() {
        var theme = localStorage.getItem('theme');
        if (!theme) {
            localStorage.setItem('theme', 'light');
            return 'light';
        }
        return theme;
    }
}

// 초기값 설정
const state = {
    title: 'Vue Todo',
    todoList: storage.todoListFetch(),
    theme: storage.themeFetch(),
    allDone: false
}

// 동기 처리
const mutations = {
    // payload : 컴포넌트에서 전송되는 데이터
    addTodo(state, payload) {
        let id = 0;
        if (state.todoList.length != 0) {
            let findObj = state.todoList.reduce(function(previous, current) {
                return previous.id > current.id ? previous : current;
            });
            id = findObj.id + 1;
        }
        var newTodo = {
            id: id,
            item: payload.newTodoItem,
            completed: false
        }
        state.todoList.push(newTodo);
        // storage.todoListSet(state.todoList);
    },
    removeTodo(state, payload) {
        state.todoList = state.todoList.filter(todo => todo.id != payload.id);
        // storage.todoListSet(state.todoList);
    },
    removeAll(state) {
        state.todoList = [];
        // storage.todoListSet([]);
    },
    removeCompleted(state) {
        state.todoList = state.todoList.filter(todo => todo.completed == false);
        // storage.todoListSet(state.todoList);
    },
    checkCompleted(state, payload) {
        if (payload.mode == 'all') {
            state.todoList.forEach((todo) => {
                todo.completed = payload.allDone;
            });
        } else {
            state.todoList.forEach((todo) => {
                if (todo.id == payload.id) {
                    todo.completed = !todo.completed;
                }
            });
        }
        // storage.todoListSet(state.todoList);
    },
    themeChange(state, payload) {
        let theme = payload.themeChangeCheck ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
        state.theme = theme;
    },
    shuffle(state) {
        state.todoList = _.shuffle(state.todoList);
        // storage.todoListSet(state.todoList);
    },
    todoListSet(state) {
        storage.todoListSet(state.todoList);
    },
    allDoneChange(state, payload) {
        state.allDone = payload.allDone;
    }
}

export default { state, mutations }