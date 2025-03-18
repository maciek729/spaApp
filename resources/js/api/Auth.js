import {HttpRequest} from "./HttpRequest.js";

export class Auth{
    constructor(bus, router){
        this.eventBus = bus;
        this.router = router;
        this.httpRequest = new HttpRequest(this.eventBus);
    }
        async login(form) {
            await this.httpRequest.send("GET", "/sanctum/csrf-cookie");
            await this.httpRequest.send("POST", "/api/login", form);
            localStorage.setItem("isLogged", "true");
            const user = await this.getAuthUser(); // Pobranie danych użytkownika po zalogowaniu
            localStorage.setItem("user", JSON.stringify(user));
            this.eventBus.$emit("isLogged", true);
            this.router.push({ name: "dashboard" });
        }
        async logout() {
            localStorage.removeItem("isLogged");
            localStorage.removeItem("user");
            this.eventBus.$emit("isLogged", false);
            await this.httpRequest.send("POST", "/api/logout");
            if (this.router.currentRoute.name != "home") {
            this.router.push({ name: "home" });
            }
        }
        async getAuthUser() {
            const response = await this.httpRequest.send("GET", "/api/user");
            return response.data;
        }

        static isLogged() {
            return localStorage.getItem("isLogged") === "true";}

        reset() {
            
            localStorage.removeItem("isLogged");
            localStorage.removeItem("user");
            this.eventBus.$emit("isLogged", false);
            if (this.router.currentRoute.name != "login") {
                this.router.push({ name: "login" });
            }
        }

        async getUser() {
            try {
              const response = await this.httpRequest.send("GET", "/api/user");
              return response.data;
            } catch (error) {
              console.error("Error fetching user data:", error);
              throw error;
            }
          }
    }
