<template>
    <footer class="footer">
        <div class="info">
            <p>Carefully Cooked by <a href="#">Triozeit</a></p>
        </div>

        <div class="conditions">
            <a href="#">Terms and Conditions</a>
            <a href="#">Privacy Policy</a>
        </div>

        <div class="address">
            <p>SRH Hochschule Heidelberg , Germany</p>
        </div>
    </footer>
</template>

<script>
export default {
    name: "HeaderComponent",

};
</script>

<style scoped>
.footer {
    background-color: #006478;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 40px;
    color: white;

    /* position: sticky; */
    color: white;
    font-weight: bold;
}

.conditions {
    display: flex;
    flex-direction: row;
    gap: 20px;
    align-items: center;

}

.footer a {
    text-decoration: underline;
}

sup {
    font-size: x-small;
}
</style>