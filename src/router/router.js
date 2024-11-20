import { createRouter , createWebHistory } from 'vue-router';
import Home from "../page/Home.vue";
import Detail from "../page/Detail.vue";




const routes = [
    {
        path : "/",
        component : Home 
    },
    {
        path : "/detail/:id",
        component : Detail
        
    }
];

const router = createRouter({
    history : createWebHistory() , routes
});

export default router;