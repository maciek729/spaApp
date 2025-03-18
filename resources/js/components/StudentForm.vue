<template>
    <form @submit.prevent="submit">
        <div>
            <input type="text" v-model="$v.form.first_name.$model" placeholder="Imię" />
            <validation-error :validation="$v.form.first_name"/>
        </div>
        <div>
            <input type="text" v-model="$v.form.last_name.$model" placeholder="Nazwisko" />
            <validation-error :validation="$v.form.last_name"/>
        </div>
        <div>
            <input type="text" v-model="$v.form.index.$model" placeholder="Numer indeksu np. s123" />
            <validation-error :validation="$v.form.index"/>
        </div>
        <div>
            <input type="text" v-model="$v.form.email.$model" placeholder="Email" />
            <validation-error :validation="$v.form.email"/>
        </div>
        <div>
            <input type="number" step="1" v-model="$v.form.age.$model" placeholder="Wiek" />
            <validation-error :validation="$v.form.age"/>
        </div>
        <div>
            <input type="checkbox" v-model="form.paid" />
            <label>Student uiścił opłatę</label>
        </div>
        <div>
            <textarea v-model="form.description" cols="50" rows="5" placeholder="Opis"></textarea>
        </div>
            <button :disabled="$v.form.$invalid">
                {{ student ? 'Aktualizuj' : 'Dodaj' }}
            </button>
    </form>
</template>

<script>
import {required,email,integer,between,helpers} from "vuelidate/lib/validators";
import ValidationError from "./ValidationError";

export default {
    components:{ValidationError},
props: {
student: {type: Object},
students: {type: Array }
},
validations:{
    form: {
        first_name:{required},
        last_name:{required},
        index:{
            required,
            indexFormat(value){
                return !helpers.req(value) || /^s[0-9][0-9][0-9]$/.test(value);
            },
            isUnique(value){
                return this.checkUniqness("index", value);
            }
        },
        email:{
            required,
            email,
            isUnique(value){
                return this.checkUniqness("email", value);
            }
        },
        age: {required, integer, between: between(18, 30)}
    }
},
data() {
return {
form: {
    first_name: this.student?.first_name || "",
    last_name: this.student?.last_name || "",
    index: this.student?.index || "",
    email: this.student?.email || "",
    age: this.student?.age || 18,
    description: this.student?.description || "",
    paid: this.student?.paid || false
        }
    };
},
methods:{
    submit() {
        this.$v.$touch();
        if (!this.$v.$invalid) {
            this.$emit("submit", this.form);
        }
    },
    checkUniqness(property, value) {
        return !this.students.some(st => {
            if (st.id == this.student?.id) {return false;}
            return (
                st[property].localeCompare(value, 'pl', {sensitivity: "base"}) === 0
            );
        });
    }
    }
};
</script>