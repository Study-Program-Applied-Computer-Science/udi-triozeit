<template>

    <section class="social-media">
        <div class="follow-us">
            <h1>Follow us</h1>
            <dic class="icons">
                <ul>
                    <li>
                        <i class="fa-brands fa-facebook-f"></i>
                    </li>
                    <li>
                        <i class="fa-brands fa-x-twitter"></i>
                    </li>
                    <li><i class="fa-brands fa-youtube"></i></li>
                    <li>
                        <i class="fa-brands fa-linkedin-in"></i>
                    </li>
                    <li>
                        <i class="fa-brands fa-instagram"></i>
                    </li>
                </ul>
            </dic>
        </div>
    </section>
</template>

<script>
export default {
    name: "HeaderComponent",

};
</script>

<style scoped>
.social-media {
    background: linear-gradient(90deg, #b0e57c, #56ab2f, #2e8b57, #006400);
    padding-top: 10px;
}


.follow-us h1 {
    text-align: center;
    margin: 10px;
    text-decoration: solid;
    font-weight: 700;
}

.icons ul {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

.icons ul li {
    list-style: none;
    font-size: 30px;
    padding: 25px;
}
</style>