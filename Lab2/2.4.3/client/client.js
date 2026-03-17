var socket = io.connect('localhost:8000');

var app = new Vue({
    el: '#app',
    data: {
        messages: [],
        currentMessage: ''
    },
    created: function() {
        socket.on('message-from-server', function(text) {
            app.messages.push('Altul: ' + text);
        });
    },
    methods: {
        sendMessage: function() {
            if (this.currentMessage == '') return;
            app.messages.push('Tu: ' + this.currentMessage);
            socket.emit('message-from-client', this.currentMessage);
            this.currentMessage = '';
        }
    }
})