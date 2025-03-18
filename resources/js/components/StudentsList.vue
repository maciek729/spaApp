<template>
    <div>
        <div><input type="text" v-model.trim="filterBy" />{{ filterInfo }}</div>
        <filter-sort
            :objects="students"
            :sortBy="sortBy"
            :direction="direction"
            :filterBy="filterBy"
        >
            <template v-slot:default="{ objects }">
                <table>
                    <tr>
                        <th @click="setFilterSortBy('first_name', $event)">Imię</th>
                        <th @click="setFilterSortBy('last_name', $event)">Nazwisko</th>
                        <th @click="setFilterSortBy('index', $event)">Nr indeksu</th>
                        <th @click="setFilterSortBy('email', $event)">E-mail</th>
                        <th @click="setFilterSortBy('age', $event)">Wiek</th>
                        <th @click="setFilterSortBy('paid', $event)">Płatność</th>
                        <th colspan="2">
                            <button v-on:click="$emit('create')">Dodaj</button>
                        </th>
                    </tr>
                    <tr v-for="obj in objects" :key="obj.id" :class="{ mark: obj.id == selected }">
                        <td>{{ obj.first_name }}</td>
                        <td>{{ obj.last_name }}</td>
                        <td>{{ obj.index }}</td>
                        <td>{{ obj.email }}</td>
                        <td>{{ obj.age }}</td>
                        <td>{{ obj.paid ? '✅' : '❌' }}</td>
                        <td><button v-on:click="$emit('edit', obj)">Edytuj</button></td>
                        <td><button v-on:click="$emit('delete', obj)">Usuń</button></td>
                    </tr>
                </table>
            </template>
        </filter-sort>
    </div>
</template>

<script>
import FilterSort from "./FilterSort";

export default {
    components: { FilterSort },
    props: ["students", "student"],
    data() {
        return {
            sortBy: "last_name",
            direction: 1,
            filterBy: null,
            filterInfo: ""
        };
    },
    methods: {
        setFilterSortBy(field, event) {
            if (this.sortBy === field) {
                this.direction = -1 * this.direction;
            }
            this.sortBy = field;
            this.filterInfo = "Szukaj po polu: " + event.target.innerText;
        }
    },
    computed: {
        selected() {
            return this.student?.id;
        }
    }
};
</script>

<style scoped>
table, th, td {
    border: 1px solid black;
    border-collapse: collapse;
}
th {
    text-align: center;
}
td {
    padding: 5px;
}
.mark {
    background-color: yellow;
}
</style>
