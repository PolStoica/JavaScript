var app = new Vue({
    el: '#app',
    data: {
        users: [],
        usersService: null,
        newName: '',
        newCity: '',
        editIndex: null,
        editName: '',
        editCity: ''
    },
    created: function () {
        usersService = users();
        this.loadUsers();
    },
    methods: {

        // încarcă lista fresh de la server
        loadUsers: function() {
            usersService.get().then(response => {
                this.users = response.data;
            });
        },

        // adaugă user nou
        addUser: function() {
            if (this.newName == '' || this.newCity == '') return;
            var newUser = { name: this.newName, city: this.newCity };
            usersService.add(newUser).then(response => {
                this.loadUsers();   // reîncarcă lista de la server
                this.newName = '';
                this.newCity = '';
            });
        },

        // șterge user
        deleteUser: function(index) {
            usersService.remove(index).then(response => {
                this.loadUsers();   // reîncarcă lista de la server
            });
        },

        // salvează modificarea
        updateUser: function(index) {
            if (this.editName == '' || this.editCity == '') return;
            var updated = { name: this.editName, city: this.editCity };
            usersService.update(index, updated).then(response => {
                this.loadUsers();   // reîncarcă lista de la server
                this.editIndex = null;
                this.editName = '';
                this.editCity = '';
            });
        }

    }
})