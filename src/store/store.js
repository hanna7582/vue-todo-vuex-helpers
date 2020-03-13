import Vue from 'vue'
import Vuex from 'vuex'
import todo from './todo';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: todo.state,
    // 동기 처리
    mutations: todo.mutations
})