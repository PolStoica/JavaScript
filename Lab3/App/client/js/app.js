var app = new Vue({
    el: '#hamming-encoder',
    data: {
        dataBits: [],
        status: '',
        numberOfDataBits: 4,
        useParity: false // Added state for parity selection
    },
    created: function () {
        this.initDataBits(4);
    },
    methods: {
        initDataBits: function(){
            this.dataBits=[];

            for(var i=0; i < this.numberOfDataBits; i++){
                var bit = { data: null };
                this.dataBits.push(bit);
            }
        },
        send: function () {
            if (this.validate(this.dataBits) === true){
                var encodedMessage = this.encode(this.dataBits);

                return axios.put("http://localhost:3000/message", {bits: encodedMessage}).then(
                    response => (this.status = response.data)
                );
            } else {
                this.status = 'Input is not valid. Please use 0 or 1 as data bit values';
            }
        },
        encode: function(bits){
            var word = [];

            // Encode for 4 bits
            if (this.numberOfDataBits == 4) {
                var d0 = parseInt(bits[0].data);
                var d1 = parseInt(bits[1].data);
                var d2 = parseInt(bits[2].data);
                var d3 = parseInt(bits[3].data);

                var c4 = this.parity(d1 + d2 + d3);
                var c2 = this.parity(d0 + d2 + d3);
                var c1 = this.parity(d0 + d1 + d3);

                console.log("Control bits: " + c1 + "," + c2 + "," + c4);
                word = [c1, c2, d0, c4, d1, d2, d3];
            }
            // Encode for 8 bits
            else if (this.numberOfDataBits == 8) {
                var d0 = parseInt(bits[0].data);
                var d1 = parseInt(bits[1].data);
                var d2 = parseInt(bits[2].data);
                var d3 = parseInt(bits[3].data);
                var d4 = parseInt(bits[4].data);
                var d5 = parseInt(bits[5].data);
                var d6 = parseInt(bits[6].data);
                var d7 = parseInt(bits[7].data);

                var c1 = this.parity(d0 + d1 + d3 + d4 + d6);
                var c2 = this.parity(d0 + d2 + d3 + d5 + d6);
                var c4 = this.parity(d1 + d2 + d3 + d7);
                var c8 = this.parity(d4 + d5 + d6 + d7);

                console.log("Control bits: " + c1 + "," + c2 + "," + c4 + "," + c8);
                word = [c1, c2, d0, c4, d1, d2, d3, c8, d4, d5, d6, d7];
            }

            // Calculate overall parity bit if selected
            if (this.useParity) {
                var sum = 0;
                for (var i = 0; i < word.length; i++) {
                    sum += word[i];
                }
                var c0 = this.parity(sum);
                word.unshift(c0); // Prepend parity bit to the message
                console.log("Overall Parity bit (c0): " + c0);
            }

            return word;
        },
        parity: function(number){
            return number % 2;
        },
        validate: function(bits){
            for(var i=0; i<bits.length; i++){
                if (this.validateBit(bits[i].data) === false)
                    return false;
            }
            return true;
        },
        validateBit: function(character){
            if (character === null) return false;
            return (parseInt(character) === 0 || parseInt(character) === 1);
        }
    }
});