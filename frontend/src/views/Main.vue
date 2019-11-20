<template>
    <div>
        <Login/>
    </div>
</template>

<script>
import Login from '@/components/Login.vue'
    export default {
        data(){
            return {
                id:'',
                password:''
            }
        },
        components:{
            Login
        }
    }
</script>