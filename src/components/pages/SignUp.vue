<template>
  <div class="sign-up">
    <h1>EXPENSE TRACKER</h1>

    <div class="container">
      <h1>Sign Up Form</h1>

      <div class="info-container">
        <form @submit.prevent="signup" class="form-container">
          <label for="uname"></label><br />
          <input v-model="username" type="text" id="uname" name="UserName" placeholder="Username" /><br />
          <br />
          <label for="email"></label><br />
          <input v-model="email" type="email" id="email" name="Email" placeholder="Email" /><br />
          <br />
          <label for="password"></label><br />
          <input v-model="password" type="password" id="password" name="password" placeholder="Password" /><br />
          <br />
          <input type="submit" value="Sign Up" />
        </form>
      </div>
      <p v-if="message != ''">{{ message }}</p>
      <h6>
        Already a user?
        <router-link to="/login">Click here to Login</router-link>
      </h6>
    </div>
  </div>
</template>

<script>
import { localHost } from "../../urls.js";
import bcrypt from "bcryptjs";

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
    async signup() {
      if (this.username === "" || this.email === "" || this.password === "") {
        alert("All Fields are required!!");
        return;
      }

      const user = {
        username: this.username,
        email: this.email,
        password: bcrypt.hashSync(this.password, 10),
        createdAt: new Date().toLocaleString(),
      };

      let url = `${localHost}/users?email=${user.email}`;
      const result = await fetch(url);
      console.log(result);
      const data = await result.json();
      console.log(data);

      if (data.length === 0) {
        const res = await fetch(`${localHost}/users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });

        if (res.status === 201) {
          console.log(res);
          this.message = "Registration Successfull!! Please Login";
          this.clearDetails();
        } else {
          this.message = "Something went wrong!";
        }
      } else {
        this.clearDetails();
        this.message = "User Already Exists!!";
      }
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
}

.sign-up h1 {
  font-size: 50px;
  font-weight: 100;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 30%;
  height: 60%;
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
  border-width: 1px 1px 1px;
  border-color: black;
  background: transparent;
  padding: 10px;
}

input[type="submit"] {
  background-color: lightblue;
  height: 30px;
}
</style>
