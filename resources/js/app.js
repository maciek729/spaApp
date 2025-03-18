import Vue from 'vue';
import Spa from './Spa.vue';
import router from './router';
import { Auth } from './api/Auth.js';
import { StudentsRepository } from './api/StudentsRepository.js'; 
import Vuelidate from "vuelidate";

require('./bootstrap');

Vue.use(Vuelidate);

const app = new Vue({
    el: '#app',
    template: '<spa/>',
    components: {
        Spa
    },
    router,
    data: {
        eventBus: new Vue()
    },
    provide(){
        return{
            eventBus: this.eventBus,
            auth: new Auth(this.eventBus, router),
            studentsRepository: new StudentsRepository(this.eventBus)
        }
    }
});
