<template>
    <ul class="items">
        <template v-for="(item,index) in filteredTodoList">
            <li :key="index" :class="item.status">
                <input name="status-toggle" :checked="item.status === 'completed'" type="checkbox"
                       @change="handleToggleActive(index)">
                <span href="" class="content">{{item.content}}</span>
            </li>
        </template>
    </ul>
</template>

<script>
    import {mapState, mapMutations} from "vuex";

    export default {
        name: "todo-list",
        computed: {
            filteredTodoList: function () {
                return this.$store.getters.filteredTodoList;
            }
        },
        methods: {
            handleToggleActive: function (index) {
               this.$store.commit("handleToggleActive",index);
            }
        }
    }
</script>

<style scoped>

</style>
