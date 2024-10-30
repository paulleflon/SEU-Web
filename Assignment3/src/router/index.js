import TodoList from '@/components/TodoList.vue';
import {createRouter, createWebHistory} from 'vue-router';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TodoList
    },
    {
      path: '/new',
      name: 'Add To-do',
      component: () => import('../components/TodoForm.vue')
    },
    {
      path: '/tasks/:id',
      name: 'Task',
      component: () => import('../components/TodoDetail.vue')
    }
  ]
});

export default router
