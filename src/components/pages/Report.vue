<template>
    <div class="container">
        <button @click="downloadFile">download the report</button>
    </div>
</template>
<script>
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default {
    name: "ReportComponent",
    data() {
        return {
            dataArray: this.$store.getters.filteredExpenses
        }

    },
    methods: {
        downloadFile() {
            console.log(this.dataArray, "hit data array report")
            const doc = new jsPDF;
            doc.setFontSize(10)

            let totalAmount = 0.0;
            let content = this.dataArray.map((item) => {
                totalAmount = totalAmount + item.amount;
                return [item.title, item.dateTime, item.category, item.amount];
            }
            )
            doc.text("REPORT", 100, 10)
            doc.line(0, 12, 400, 11)


            autoTable(doc, {
                head: [['Expense Name', 'Date', 'Category', 'amount']],
                body: content
            })
            doc.text(`The total amount :${totalAmount}`, 150, (doc.lastAutoTable.finalY + 10))


            doc.save('ExpenseReport')
        },
    },

}
</script>
<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
</style>