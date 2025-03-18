<script>
export default {
    props: {
        objects: { type: Array, required: true },
        sortBy: { type: String, required: true },
        filterBy: { type: String },
        direction: { type: Number, reguired: true }
    },
    render() {
        return this.$scopedSlots.default({
            objects: this.sortedAndFilteredObjects
        });
    },
    methods: {
        filterTest(o) {
            return o[this.sortBy]
                .toString()
                .toLowerCase()
                .startsWith(this.filterBy.toLowerCase());
        },
        sortTest(o1, o2) {
            if (typeof o1[this.sortBy] == "string") {
                return o1[this.sortBy].localeCompare(o2[this.sortBy]) * this.direction;
            } else if (typeof o1[this.sortBy] == "number") {
                return (o1[this.sortBy] - o2[this.sortBy]) * this.direction;
            }
            return true;
        }
    },
    computed: {
        sortedAndFilteredObjects() {
            let objs = [...this.objects];
            if (this.filterBy) {
                objs = objs.filter(this.filterTest);
            }
            objs.sort(this.sortTest);
            return objs;
        }
    }
};
</script>