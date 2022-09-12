<template>
  <section>
    <v-card elevation="0" class="head-card">
      <v-row justify="space-between">
        <v-col>
          <h1>Dashboard</h1>
          <p>Dashboard > Overview</p>
        </v-col>
      </v-row>
    </v-card>
    <v-row>
      <v-row class="ml-2 mr-2 mb-2">
        <v-col>
          <v-card elevation="0" class="side-overview-card">
            <v-row justify="space-between">
              <v-col>
                <v-card-title> Total Cooperatives </v-card-title>
                <v-card-subtitle> Jul, 08 2021 </v-card-subtitle>
              </v-col>
              <v-chip color="info" class="mt-5 mr-5">{{ copNum }}</v-chip>
            </v-row>
          </v-card>
        </v-col>
        <v-col>
          <v-card elevation="0" class="side-overview-card">
            <v-row justify="space-between">
              <v-col>
                <v-card-title> Total income </v-card-title>
                <v-card-subtitle> Jul, 08 2021 </v-card-subtitle>
              </v-col>
              <v-chip color="success" class="mt-5 mr-5"
                >{{ income }} Rwf</v-chip
              >
            </v-row>
          </v-card>
        </v-col>
        <v-col>
          <v-card elevation="0" class="side-overview-card">
            <v-row justify="space-between">
              <v-col>
                <v-card-title> Total Stock In </v-card-title>
                <v-card-subtitle> Jul, 08 2021 </v-card-subtitle>
              </v-col>
              <v-chip color="warning" class="mt-5 mr-5">{{ totalStock }} Kg</v-chip>
            </v-row>
          </v-card>
        </v-col>
        <v-col>
          <v-card elevation="0" class="side-overview-card">
            <v-row justify="space-between">
              <v-col>
                <v-card-title> Calculated Loss </v-card-title>
                <v-card-subtitle> Jul, 08 2021 </v-card-subtitle>
              </v-col>
              <v-chip color="#F93D3D" class="mt-5 mr-5" dark>{{ loss }} Rwf</v-chip>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-row>
    <v-row class="ml-4">
      <v-col v-if="!pieHasData">
        <v-skeleton-loader
          v-bind="attrs"
          type="card-avatar, article"
        ></v-skeleton-loader>
      </v-col>
      <v-col cols="12" lg="4" v-else>
        <v-card elevation="0">
          <mdb-container>
            <mdb-pie-chart
              datalabels
              :data="pieChartData"
              :options="pieChartOptions"
              :width="300"
              :height="300"
            />
          </mdb-container>
        </v-card>
      </v-col>
      <v-col cols="12" lg="8">
        <v-card class="mr-2">
          <v-card-title>
            Transactions
            <v-select
              v-model="filterId"
              append-icon="mdi-close"
              label="Filter by Cooperative"
              outlined
              :items="cooperatives"
              item-text="name"
              item-value="user_id"
              dense
              class="mt-2"
              hide-details
              @change="
                getData()
                pieHasData = false
              "
              @click:append="
                filterId = ''
                getData()
              "
            ></v-select>
            <!-- <v-select
              v-model="filterId"
              append-icon="mdi-close"
              label="Filter by date"
              outlined
              :items="cooperatives"
              item-text="name"
              item-value="user_id"
              dense
              class="mt-2"
              hide-details
              @change="
                getData()
                pieHasData = false
              "
              @click:append="filterId =''; getData()"
            ></v-select> -->
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
            <json-excel
              class="btn btn-default"
              :data="dataToDownload"
              worksheet="My Worksheet"
              name="eport.xls"
            >
              <v-btn dark color="green darken-3">
                <v-icon>mdi-file-excel</v-icon>
                Download Excel
              </v-btn>
            </json-excel>
          </v-card-title>
          <v-data-table :headers="headers" :items="transItems" :search="search">
            <template v-slot:[`item.cooperative`]="{ item }">
              {{ item.cooperative.name }}
            </template>
            <template v-slot:[`item.crop`]="{ item }">
              {{ item.produce.name }}
            </template>
            <template v-slot:[`item.created_at`]="{ item }">
              {{ date(item.created_at) }}
            </template>
            <template v-slot:[`item.amount`]="{ item }">
              {{ item.amount * item.quantity }} Rwf
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </section>
</template>

<script>
import { mdbPieChart, mdbContainer } from 'mdbvue'
import JsonExcel from 'vue-json-excel'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
const date = () => {
  var today = new Date()
  var dd = String(today.getDate()).padStart(2, '0')
  var mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
  var yyyy = today.getFullYear()
  today = mm + '/' + dd + '/' + yyyy

  return today
}
export default {
  components: {
    mdbPieChart,
    mdbContainer,
    ValidationProvider,
    ValidationObserver,
    JsonExcel,
  },
  data() {
    return {
      user_token: '',
      items: [
        ['PARTENERS', `${date()}`, 0, 'background-color: #DCEBF4;'],
        ['PROJECTS', `${date()}`, 0, 'background-color: #F5E0E9;'],
        ['SAVING GROUPS', `${date()}`, 0, 'background-color: #D1F0D1;'],
        ['AGENTS', `${date()}`, 0, 'background-color: #F6F8E8;'],
      ],
      lineChartData: {
        labels: [
          'Jan',
          'Feb',
          'March',
          'April',
          'May',
          'June',
          'July',
          'Aug',
          'sept',
          'oct',
          'Nov',
          'Dec',
        ],
        datasets: [
          {
            label: 'Offering Rate',
            backgroundColor: 'transparent',
            borderColor: 'rgb(20,18,31)',
            borderWidth: 2,
            data: [50, 5, 100, 60, 110, 80, 150, 100, 120, 40, 200, 150],
          },
        ],
      },
      lineChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
                color: 'rgba(0, 0, 0, 0.1)',
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: true,
                color: 'rgba(0, 0, 0, 0.1)',
              },
            },
          ],
        },
      },
      pieChartData: {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: ['#46BFBD', '#FDB45C', '#DE0707'],
            hoverBackgroundColor: ['#5AD3D1', '#FFC870', '#F93D3D'],
          },
        ],
      },
      pieChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          datalabels: {
            color: 'white',
            align: 'left',
            font: {
              size: 16,
            },
            formatter: (value) => {
              const [dataset] = this.pieChartData.datasets
              const setValue = dataset.data.reduce((a, b) => a + b)

              return `${Math.round((value / setValue) * 100)}%`
            },
          },
        },
      },
      pieHasData: false,
      search: '',
      headers: [
        {
          text: 'Date',
          align: 'start',
          sortable: true,
          value: 'created_at',
        },
        { text: 'cooperative', value: 'cooperative' },
        { text: 'Action', value: 'comment' },
        { text: 'Crop', value: 'crop' },
        { text: 'Quantity (kg)', value: 'quantity' },
        { text: 'Amount', value: 'amount' },
        { text: 'Feltirizer', value: 'fertilizer' },
        { text: 'pesticide', value: 'pesticide' },
      ],
      transItems: [],
      transactions: [],
      cooperatives: [],
      copNum: '',
      income: '',
      loss: '',
      incomeQty: '',
      lossQty: '',
      filterId: '',
      attrs: {
        class: 'mb-6',
        boilerplate: true,
        elevation: 2,
      },
      dataToDownload: [],
      totalStock: 0,
    }
  },
  methods: {
    date(date) {
      var today = date
      var dd = String(today.getDate()).padStart(2, '0')
      var mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
      var yyyy = today.getFullYear()
      today = mm + '/' + dd + '/' + yyyy
    },
    authorization() {
      const token = localStorage.getItem('token')
      if (token == null) {
        this.$router.push('/login')
      }
    },
    date(date) {
      let item = date.split(' ')
      return item[1] + '-' + item[2] + '-' + item[3] + ' ' + item[4]
    },
    getData() {
      this.pieHasData = false
      this.dataToDownload = []
      this.$axios
        .get(
          'https://cooperative-management.herokuapp.com/api/admin/transactions'
        )
        .then((res) => {
          this.transactions = res.data.transactions
          this.transItems =
            this.filterId == ''
              ? this.transactions
              : this.transactions.filter(
                  (item) => item.cooperative.user_id === this.filterId
                )
          this.copNum = res.data.cooperatives
          let incomeQty = 0
          let lossQty = 0
          let inStockQty = 0
          let loss = 0
          let income = 0
          let data = {}
          let i = 1
          this.transItems.forEach((element) => {
            this.cooperatives.push(element.cooperative)
            element.type === 'sell_produce'
              ? (incomeQty += element.quantity)
              : element.type === 'wasted_produce'
              ? (lossQty += element.quantity)
              : (inStockQty += element.quantity)
            if(this.filterId) {
              element.type === 'sell_produce'
                ? (income += element.amount * element.quantity)
                : (loss += element.amount * element.quantity)
            }
            data = {
              id: i,
              cooperative: element.cooperative.name,
              Email: element.cooperative.email,
              product: element.produce.name,
              quantity: element.quantity,
              unitPrice: element.amount,
              totatPrice: element.amount * element.quantity,
              fertilizer: element.fertilizer,
              pesticide: element.pesticide,
              date: this.date(element.created_at),
            }
            this.dataToDownload.push(data)
            i++
          })
          this.pieChartData.datasets[0].data = [(inStockQty - (incomeQty + lossQty)),lossQty,incomeQty]
          this.totalStock = inStockQty
          this.pieChartData.labels = [
            'In Stock: ' + (inStockQty - (incomeQty + lossQty)) + ' kg',
            'Sold: ' + lossQty + ' kg',
            'damaged: ' + incomeQty + ' kg',
          ]
          this.income = this.filterId ? income :  res.data.totalIncome
          this.loss = this.filterId ? loss :  res.data.totalLoss
        })
        .finally(() => {
          this.pieHasData = true
        })
    },
    // filter() {
    //   this.$axios
    //     .get(
    //       'https://cooperative-management.herokuapp.com/api/admin/transactions'
    //     )
    //     .then((res) => {
    //       this.transactions = res.data.transactions
    //       this.transItems = this.transactions.filter((item) => item.cooperative.user_id === this.filterId)
    //       let loss = 0
    //       let income = 0
    //       let incomeQty = 0
    //       let lossQty = 0
    //       let data = {}
    //       let i = 1
    //       this.transItems.forEach((element) => {
    //         element.type === 'sell_produce'
    //           ? (income += element.amount * element.quantity)
    //           : (loss += element.amount * element.quantity)
    //         element.type === 'sell_produce'
    //           ? (incomeQty += element.quantity)
    //           : element.type === 'wasted_produce'
    //           ? (lossQty += element.quantity)
    //           : ''
    //         data = {
    //           id: i,
    //           cooperative: element.cooperative.name,
    //           Email: element.cooperative.email,
    //           product: element.produce.name,
    //           quantity: element.quantity,
    //           unitPrice: element.amount,
    //           totatPrice: element.amount * element.quantity,
    //           fertilizer: element.fertilizer,
    //           pesticide: element.pesticide,
    //           date: this.date(element.created_at),
    //         }
    //         this.dataToDownload.push(data)
    //         i++
    //       })
    //       this.pieChartData.datasets[0].data = [incomeQty, lossQty]
    //       this.pieChartData.labels = [
    //         'Sold: ' + lossQty + ' kg',
    //         'damaged: ' + incomeQty + ' kg',
    //       ]
    //       this.income = income
    //       this.loss = loss
    //     })
    //     .finally(() => {
    //       this.pieHasData = true
    //     })
    // },
  },
  layout: 'dashboard',
  mounted() {
    // this.authorization()
    this.getData()
  },
}
</script>

<style scoped></style>
