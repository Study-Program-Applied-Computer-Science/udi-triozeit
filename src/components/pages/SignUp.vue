<template>
  <div class="sign-up">

    <div class="left" style="height: 100vh; width: auto;">
      <img src="../../assets/6-business-expense-tracker.jpg" alt=""
        style="width: 100%; height: 100%; object-fit: cover;">
    </div>

    <div class="right">
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
        streak: 0,
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
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
}

.left {
  flex-grow: 1;
}

.right {
  flex-grow: 1;
}

.sign-up h1 {
  font-size: 50px;
  font-weight: 100;
}

.left img {
  width: 70%;
}



.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.login-button {
  height: 40px;
  border-radius: 10px;
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