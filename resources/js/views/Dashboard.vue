<template>
  <div>
    Dashboard component
    <div v-if="user">Zalogowany użytkownik: {{user.name}}</div>
    <div>
    <label>
      <input type="radio" v-model="component" value="list"/>
      Lista
    </label>
    <label>
      <input type="radio" v-model="component" value="editor"/>
      Edytor
    </label>
  </div>

  <component
  :is="selectedComponent"
  :student="student"
  :students="students"
  @create="createStudent"
  @edit="editStudent"
  @delete="deleteStudent"
  @submit="submitForm"
  ></component>
  </div>
</template>
<script>
import StudentForm from "../components/StudentForm";
import StudentsList from "../components/StudentsList";
export default {
  inject: ["auth", "studentsRepository"],
  components:{StudentForm, StudentsList},
  
  data() {
    return {
      user: null,
      component:"list",
      student:null,
      students:[]
    };
  },
  async created() {
    await this.getUser();
    this.students = (await this.studentsRepository.getAll()).data.data;
  },
  methods: {
    async getUser() {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
          this.user = user;
        } else {
          const response = await this.auth.getAuthUser();
          this.user = response;
          localStorage.setItem("user", JSON.stringify(this.user));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    },
    createStudent() {
      this.student = null;
      this.component = "editor";
    },
    
    editStudent(st) {
      this.student = st;
      this.component = "editor";
    },
    
    async deleteStudent(st) {
      await this.studentsRepository.delete(st.id);
      let index = this.students.findIndex(s => s.id == st.id);
      this.student = null;
      this.students.splice(index, 1);
    },
    
    async submitForm(st) {
      if (this.student?.id) {
      await this.studentsRepository.update(this.student.id, st);
      let index = this.students.findIndex(s => s.id == this.student.id);
      this.students[index]=Object.assign(st, { id: this.student.id });
    } else {
        let createdStudent = (await this.studentsRepository.add(st)).data.data;
        this.students.push(createdStudent);
        this.student = createdStudent;
      }
      this.component = "list";
    }
  },
  computed:{
    selectedComponent(){
      return this.component == "list" ? StudentsList : StudentForm;
    }
  }

};
</script>