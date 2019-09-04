import axios from "axios";
import vue from "vue"
import iView from 'iview';
import 'iview/dist/styles/iview.css';
vue.use(iView);

export default {
    strict: true,
    state: {
        todoList: [
            {status: 'completed', content: '吃饭'},
            {status: 'completed', content: '睡觉'},
            {status: 'completed', content: '打豆豆'}
        ], isShow:false,
        currentFilter: 'all'
    },
    getters: {
        filteredTodoList: function (state) {
            let filteredTodoList = [];
            for (let i = 0; i < state.todoList.length; i++) {
                if (state.currentFilter === 'all' || state.currentFilter === state.todoList[i].status) {
                    filteredTodoList.push(state.todoList[i])
                }
            }
            return filteredTodoList;
        }
    },
    mutations: {
        handleCreateTodo:function(state,inputtingItem){
                state.todoList.push({
                status: 'active',
                content:inputtingItem
            })
        },
         handleToggleActive:function(state,index){
           state.todoList[index].status = state.todoList[index].status === 'completed' ? 'active' : 'completed';      
        },
        handleFilter:function(state,currentFilter){
            state.currentFilter = currentFilter;
        },
        initTodos:function(state,todos){
            state.todoList = todos;
        }
    },
    actions:{
        fetchTodos:function(context){
            console.log(context);
            const url = "http://5b4dcb2aec112500143a2311.mockapi.io/api/todos";
            axios.get(url).then(function(response){
                console.log(response.data);
                context.commit("initTodos",response.data);
            }).catch(function (error) {
                console.log(error.response);
                console.log(error);
                });
            },
        postTodos:function(context,inputtingItem){
            const url = "http://5b4dcb2aec112500143a2311.mockapi.io/api/todos";
            axios.post(url,{
                content:inputtingItem,
                status:'active'
            }).then(function (response){
                if(response.status==201)
                context.dispatch('fetchTodos');
            }).catch(function (error) {
                console.log(error.response);
                console.log(error);
                });
        },putTodos:function(context){
            const url = "http://5b4dcb2aec112500143a2311.mockapi.io/api/todos/115";
            axios.put(url,{
                id:115,
                content:"迷失的小羔羊",
                status:'completed'
            }).then(function(response){
                if(response.status==200) context.dispatch('fetchTodos');
            }).catch(function(error){
                console.log(error.response);
                console.log(error);
            });  
        }
       
    }
}
