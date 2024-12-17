<template>
  <div class="sign-up">
    <h1>EXPENSE TRACKER</h1>

    <div class="container">
      <h1>Login</h1>

      <div class="info-container">
        <form @submit.prevent="login" class="form-container">
          <label for="email"></label><br />
          <input v-model="email" type="email" id="email" name="Email" placeholder="Email" /><br />
          <br />
          <label for="password"></label><br />
          <input v-model="password" type="password" id="password" name="password" placeholder="Password" /><br />
          <br />
          <input type="submit" value="Login" />
        </form>
      </div>
      <p v-if="message != ''">{{ message }}</p>
    </div>
  </div>
</template>

<script>
import { localHost } from "../../urls.js";
import bcrypt from "bcryptjs";
export default {
  name: "LogIn",
  data() {
    return {
      email: "",
      password: "",
      message: "",
    };
  },

  methods: {
    async login() {
      console.log("Loggin Triggered");
      let url = `${localHost}/users?email=${this.email}`;
      const userDetail = await fetch(url);
      console.log(userDetail);
      const currentUserDetails = await userDetail.json();
      console.log(currentUserDetails);

      if (currentUserDetails.length > 0) {
        let passwordResult = bcrypt.compareSync(
          this.password,
          currentUserDetails[0].password
        );
        console.log(passwordResult);
        if (passwordResult) {
          this.message = "User Successfuuly Loggedin";
          this.$store.commit("login", currentUserDetails[0].email, currentUserDetails[0].username);
          //changes made 
          // localStorage.setItem("username", currentUserDetails[0].username);
          // this.$store.commit("login", currentUserDetails[0].email);
          //
          this.$router.push("/expenses");
        } else {
          this.message = "Entered password is incorrect";
        }
      } else {
        this.message = "User doesn't exists!!";
      }
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
