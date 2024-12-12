<template>
    <div class="sign-up">
      <h1>EXPENSE TRACKER</h1>
  
  
      <div class="container">
        <h1>Login</h1>
  
        <div class="info-container">
          <form @submit.prevent="login" class="form-container">
            <label for="email"></label><br>
            <input v-model="email" type="email" id="email" name="Email" placeholder="Email"><br>
            <br>
            <label for="password"></label><br>
            <input v-model="password" type="password" id="password" name="password" placeholder="Password"><br>
            <br>
            <input type="submit" value="Login">
          </form>
        </div>
        <p v-if="successMessage != ''">{{ successMessage }}</p>
        
      </div>
    </div>
  </template>



  
  
  <script>
  export default {
    name: "LogIn",
    data() {
      return {
        email: "",
        password: "",
        successMessage: "",
      }
    },
  
    methods:
    {
      login()
      {
        const userdetails = this.$store.getters["signUp/getUserDetails"];
        const user = userdetails.find((i)=>{
            return i.email === this.email
        });

        console.log(user);

        if(user)
        {
            if(user.password === this.password){
                this.successMessage="Login Successfull";
                this.$store.commit("login",{username:this.username})
                this.$router.push("/");
            }
            else{
                this.successMessage="Wrong Password"
            }
            
        }
        else
        {
            this.successMessage="User Doesnot exist"
        }
      },
  
  
      
    }
  }
  
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