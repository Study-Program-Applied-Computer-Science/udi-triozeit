<template>
  <div class="sign-up">

    <div class="left" style="height: 100vh; width: auto;">
      <img src="../../assets/6-business-expense-tracker.jpg" alt=""
        style="width: 100%; height: 100%; object-fit: cover;">
    </div>

    <div class="right">
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
            <input type="submit" value="Login" class="login-button" />
          </form>
        </div>
        <p v-if="message != ''">{{ message }}</p>
      </div>
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
    loaderInit() {
      let loader = this.$loading.show({
        container: this.fullPage ? null : this.$refs.formContainer,
        canCancel: true,
      });

      setTimeout(() => {
        loader.hide()
      }, 1000)
    },
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
          await this.loaderInit();
          this.message = "User Successfuuly Loggedin";
          let user = {
            ...currentUserDetails[0],
            lastLogin: new Date().toLocaleString(),
          };
          await fetch(`${localHost}/users/${currentUserDetails[0].id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          });

          this.$store.commit("login", currentUserDetails[0].email, currentUserDetails[0].username, user.lastLogin);
          //changes made 
          //localStorage.setItem("username", currentUserDetails[0].username);
          // this.$store.commit("login", currentUserDetails[0].email);
          //
          this.$store.commit("setUsername", currentUserDetails[0].username);
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