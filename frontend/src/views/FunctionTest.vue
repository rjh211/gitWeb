<template>
    <div id = "app">
        <h1>Test</h1>
        <button v-on:click="counter+=1">버튼 v</button>
        <button v-on:click="test">함수</button>
        <p>{{counter}}</p>
    </div>
</template>

<script>
export default {
    data(){
        return {
            counter:0
        }
    },
    methods:{
        test(){
            this.counter +=1      
        }
    }
}
</script>