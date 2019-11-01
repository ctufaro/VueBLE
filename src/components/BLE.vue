<template>
    <v-app class="pa-5">
        <div>
            <h1 @click="refresh">{{title}}</h1>
        </div>
        <v-flex lg6>
            <v-layout wrap>
                <v-flex lg3 pr-7><v-text-field v-model="serviceUuid" label="Service UUID:" readonly></v-text-field></v-flex>
                <v-flex lg3><v-text-field v-model="characteristicUuid" label="Characteristic UUID:" readonly></v-text-field></v-flex>
            </v-layout>
            <div class="pb-4 d-flex justify-space-between">
                <v-btn outlined large fab @click.prevent="message='\\uf004'">
                    <v-icon>fas fa-heart</v-icon>
                </v-btn>
                <v-btn outlined large fab @click.prevent="message='\\uf818'">
                    <v-icon>fas fa-pizza-slice</v-icon>
                </v-btn>                
                <v-btn outlined large fab @click.prevent="message='\\uf118'">
                    <v-icon>far fa-smile</v-icon>
                </v-btn>
                <v-btn outlined large fab @click.prevent="message='\\uf5d7'">
                    <v-icon>fas fa-bone</v-icon>
                </v-btn>                
                <v-btn outlined large fab @click.prevent="message='\\uf2fe'">
                    <v-icon>fas fa-poo</v-icon>
                </v-btn>                                
            </div>
            <v-text-field v-model="message" label="Message:"></v-text-field>
            <v-btn color="primary mb-10" small @click.prevent="getDevices">CONNECT/SEND</v-btn>
            <v-alert type="info">Log: {{logmsg}}</v-alert>
            <v-alert type="error">Error: {{error}}</v-alert>
            <kbd>data = [104,101,108,108,111]<br> word = ''.join([chr(a) for a in data])</kbd>
        </v-flex>
    </v-app>
</template>

<script>
export default {
    data: () => ({
        title: 'BLE Configuration',
        message: 'hello world',
        logmsg: '',
        error: '',
        serviceUuid: '0xec00',
        characteristicUuid: '0xec0f'
    }),
    mounted: function () {
        if (!navigator.bluetooth) {
            this.setError('Web Bluetooth API is not available.\n');
        }
    },
    methods: {
        getDevices() {
            this.clearLog();
            if (navigator.bluetooth) {
                var bluetoothDevice;
                var serviceUuidInt = 0;
                var characteristicUuidInt = 0;
                //let filters = [];
                // let serviceUuid = document.querySelector('#service').value;
                serviceUuidInt = parseInt(this.serviceUuid);
                characteristicUuidInt = parseInt(this.characteristicUuid);

                this.log('Requesting Bluetooth Device...');
                navigator.bluetooth.requestDevice({
                        filters: [{
                            services: [
                                serviceUuidInt
                            ]
                        }]
                    })
                    .then(device => {
                        bluetoothDevice = device;
                        this.log('-> Name:      ' + device.name);
                        //this.log('-> ID:        ' + device.id);
                        bluetoothDevice.addEventListener('gattserverdisconnected', this.onDisconnected);
                        return device.gatt.connect()
                    })
                    .then(server => {
                        // this.log('Getting Service');
                        return server.getPrimaryService(serviceUuidInt);
                    })
                    .then(service => {
                        // this.log('Getting characteristic');
                        if (characteristicUuidInt) {
                            return service.getCharacteristic(characteristicUuidInt);
                        }
                    })
                    .then(characteristic => {
                        let encoder = new TextEncoder('utf-8');
                        this.log("Encoded Message: " + encoder.encode(this.message));
                        return characteristic.writeValue(encoder.encode(this.message));
                    })
                    .then(() => {
                        this.log("Message successfully sent !");
                    })
                    // .then(characteristics => {
                    //   console.log(characteristics);
                    //   this.log('> Characteristics: ' + characteristics.map(c => c.uuid).join('\n' + ' '.repeat(19)));
                    // })
                    .catch(error => {
                        this.log('Error: ' + error);
                    });
            } else {
                this.setError('No Bluetooth detected');
            }
        },
        onDisconnected: function (e) {
            let device = event.target;
            this.log(`Device: ${device.name} is disconnected (Error: ${e})`);
        },
        log: function () {
            var line = Array.prototype.slice.call(arguments).map(function (argument) {
                return typeof argument === 'string' ? argument : JSON.stringify(argument);
            }).join(' ');
            this.logmsg += line + '\n';
        },
        clearLog: function () {
            this.logmsg = '';
        },
        setError: function (err) {
            this.error = err;
        },
        refresh(){
            window.location.reload(false);
        }
    }
}
</script>

<style>

</style>