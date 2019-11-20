<template>
    <div id = "app">
        Input your ID, PassWord for Login
            <br>
            <form >
                ID : <input v-model="id" placeholder="developer" type="text"> <br>
                PW : <input v-model="password" placeholder = "masterkey" type="password" autocomplete="on"> <br>
            </form>
            <button v-on:click="Login()">Login</button>
            <hr>
            <router-link to = "/Signup" tag="button">Signup</router-link>
            <h1>{{login_success}}</h1>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                id:'',
                password:'',
                temp:'',
                login_success: false
            }
        },
        methods:{
            Login(){
                this.login_success = false;
                this.$http.post('/Loginsql/login',{
                    Id : this.id,
                    Pw : this.password
                }).then(req=>{
                    this.login_success = req.data
                    if(req.data){temp = 'success'}
                    else { temp = 'fail'}
                })
            }
        }
     }
</script>