<template>
    <div v-if="validationErrors" class="text-danger">
        <div v-for="m in messages" :key="m">{{ m }}</div>
    </div>
</template>
<script>
export default {
    props: ["validation"],
    computed: {
        validationErrors() {return this.validation.$dirty && this.validation.$invalid;},
        messages() {
            let messages = [];
            if (this.validation.$dirty) {
                if (this.hasValidationError("required")) {
                    messages.push("To pole nie może być puste!");
                } else if (this.hasValidationError("email")) {
                    messages.push("Nieprawidłowy adres e-mail!");
                } else if (this.hasValidationError("indexFormat")) {
                    messages.push("Prawidłowy format nr indeksu to litera 's' i 3 cyfry)!");
                } else if (this.hasValidationError("integer")) {
                    messages.push("Wprowadź liczbę całkowitą!");
                } else if (this.hasValidationError("between")) {
                    messages.push("Wprowadź wartość od 18 do 30!");
                } else if (this.hasValidationError("isUnique")) {
                    messages.push("Ta wartość musi być unikalna!");
                }
            }
            return messages;
        }
    },
    methods: {
        hasValidationError(type) {
            return (
                this.validation.$params.hasOwnProperty(type) && !this.validation[type]
            );
        }
    }
};
</script>