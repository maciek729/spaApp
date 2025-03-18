<template>
    <div v-if="isError" class="modal">
        <div class="modal-content">
            <h3>Upps, coś poszło nie tak!</h3>
            <h6 class="text-justify">{{  message }}</h6>
            <div class="d-flex mt-3">
                <button @click.prevent="hide" class="btn btn-light mr-3">Ukryj</button>
                <a href="/" class="btn btn-light">Strona główna</a>
            </div>
        </div>
    </div>
</template>
<script>
export default{
    inject: ["eventBus"],
    created() {this.eventBus.$on("error", this.handleError); },
    beforeDestroy() {this.eventBus.$off("error");},
    data(){
        return {
            isError: false,
            message: ''
        };
    },
    methods: {
        hide() {this.isError = false;},
        handleError(err){
            this.isError = true;
            if(err.response){
                this.message = `${err.response.statusText} - ${err.response.status}`;
            } else {
                this.message = "HTTP Error!";
            }
            console.log(err);
        }
    },
    watch:{
        $route(to,from){
            this.hide();
        }
    }
};
</script>

<style scoped>
.modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
}

.modal-content {
    background-color: rgb(255, 57, 57);
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(255, 34, 34, 0.988);
    max-width: 500px;
    width: 90%;
    text-align: center;
}

h3 {
    margin-top: 0;
}

.text-justify {
    text-align: justify;
}

.d-flex {
    display: flex;
    justify-content: center;
    gap: 10px;
}

.mt-3 {
    margin-top: 1rem;
}

.btn {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.btn-light {
    background-color: #f0f0f0;
    color: #333;
}

.btn-light:hover {
    background-color: #e0e0e0;
}

.mr-3 {
    margin-right: 1rem;
}
</style>
