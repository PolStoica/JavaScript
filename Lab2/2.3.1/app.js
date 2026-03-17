var app = new Vue({
    el: '#app',
    data: {
        message: '',
        test
    },
    methods: {
        process: function(){
            console.log(this.message);
        }
    }
})