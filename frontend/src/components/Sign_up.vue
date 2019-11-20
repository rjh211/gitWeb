<template>
    <div id = "app">
        Input your ID, PassWord for Signup
            <br>
            <form>
                ID : <input v-model="id" placeholder="developer" type="text"> <br>
                PW : <input v-model="password" placeholder = "masterkey" type="password" autocomplete="on"> <br>
            </form>
            <button v-on:click="Signup()">Signup</button>
            <hr>
            <h1>{{temp}}</h1>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                id:'',
                password:'',
                temp:''
            }
        },
        methods:{
            Signup(){
                this.$http.post('/Loginsql/signup',{
                    Id : this.id,
                    Pw : this.password
                }).then(req=>{
                    console.log(req.data)
                    this.temp = req.data
                })
            }
        }
     }
</script>