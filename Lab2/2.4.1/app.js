const app = new Vue({
    el: '#app',
    data: {
        message: '',
        outputMessage: 'Input a Message'
    },
    methods: {
        processMessage() {
            if (this.message === '123') {
                this.outputMessage = 'Mesajul este egal cu 123';
            } else {
                this.outputMessage = 'Mesajul nu e corect';
            }
        }
    }
});
