<template>
    <div class="sign-up">
      <h1>EXPENSE TRACKER</h1>
      
  
      <div class="container">
        <h1>Sign Up Form</h1>
  
        <div class="info-container">
          <form @submit.prevent="signup" class="form-container">
            <label for="uname"></label><br>
            <input v-model="username" type="text" id="uname" name="UserName" placeholder="Username"><br>
            <br>
            <label for="email"></label><br>
            <input v-model="email" type="email" id="email" name="Email" placeholder="Email"><br>
            <br>
            <label for="password"></label><br>
            <input v-model="password" type="password" id="password" name="password" placeholder="Password"><br>
            <br>
            <input type="submit" value="Sign Up">
          </form>
        </div>
        <p v-if="successMessage != ''">{{ successMessage }}</p>
        <h6>Already a user? <a href="https://vuejs.org/">Click here to Login</a></h6>
      </div>
    </div>
  </template>
  
  
  <script>
  export default {
    name: "SignUp",
    data() {
      return {
        username: "",
        email: "",
        password: "",
        message: "",
      };
    },
  
    methods: {
      signup() {
        if (this.username === "" || this.email === "" || this.password === "") {
          alert("All Fields are required!!");
          return;
        }
  
        const userdetails = this.$store.getters["signUp/getUserDetails"];
        const user = userdetails.find((i) => i.username === this.username);
  
        if (user) {
          this.message = "User Already Exists";
          this.clearDetails();
          return;
        }
  
        this.$store.commit("signUp/setSignUpDetails", {
          username: this.username,
          email: this.email,
          password: this.password,
        });
        this.message = "Sign In successful!!";
        this.clearDetails();
      },
  
      clearDetails() {
        this.username = "";
        this.email = "";
        this.password = "";
      },
    },
  };
  </script>
  
  
  
  
  <style scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  .sign-up {
    height: 100vh;
    width: 100%;
    /* background-color: lightgreen; */
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding-top: 50px;
    gap: 10px;
  }
  
  .sign-up h1 {
    font-size: 50px;
    font-weight: 100;
  }
  
  .background-video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
    position: fixed;
    top: 0;
  }
  
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    width: 30%;
    height: 50%;
    border: solid, 1px, black;
  }
  
  .info-container {
    width: 80%;
    padding: 10px;
  }
  
  .form-container {
    display: flex;
    flex-direction: column;
    width: 100%;
  
  }
  
  .container h1 {
    font-size: 30px;
    color: black;
    font-weight: 100;
  }
  
  input[type="text"],
  input[type="password"],
  input[type="email"] {
    outline: 0;
    border-width: 0px 0px 2px;
    border-color: black;
    background: transparent;
  }
  
  input[type="submit"] {
    background-color: lightblue;
    height: 30px;
  }
  </style>