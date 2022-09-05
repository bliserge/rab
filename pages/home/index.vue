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
      <!-- <v-col class="overview-cards mb-5" cols="12" lg="8" md="8" sm="8">
        <v-row>
          <v-card class="view-cards" elevation="0">
            <v-card-title> OverAll Trend </v-card-title>
            <v-card-subtitle> </v-card-subtitle>
            <v-divider></v-divider>
            <v-spacer />

            <mdb-line-chart
              v-if="lineHasData"
              :data="lineChartData"
              :options="lineChartOptions"
              :width="1000"
              :height="400"
            ></mdb-line-chart>
          </v-card>
        </v-row>
      </v-col> -->
      <v-row class="ml-2 mr-2 mb-2">
        <v-col>
          <v-card elevation="0" class="side-overview-card">
            <v-row justify="space-between">
              <v-col>
                <v-card-title> Total Cooperatives </v-card-title>
                <v-card-subtitle> Jul, 08 2021 </v-card-subtitle>
              </v-col>
              <v-chip color="info" class="mt-5 mr-5">{{copNum}}</v-chip>
            </v-row>
          </v-card>
        </v-col>
        <v-col>
          <v-card elevation="0" class="side-overview-card ">
            <v-row justify="space-between">
              <v-col>
                <v-card-title> Total income </v-card-title>
                <v-card-subtitle> Jul, 08 2021 </v-card-subtitle>
              </v-col>
              <v-chip color="success" class="mt-5 mr-5">{{income}} Rwf</v-chip>
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
              <v-chip color="warning" class="mt-5 mr-5">{{loss}} Rwf</v-chip>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-row>
    <v-row class="ml-4">
      <v-col cols="12" lg="4">
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
            Recent transactions
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="transItems"
            :search="search"
          >
            <template v-slot:[`item.cooperative`]="{ item }">
                {{item.cooperative.name}}
              </template>
              <template v-slot:[`item.crop`]="{ item }">
                {{item.produce.name}}
              </template>
              <template v-slot:[`item.created_at`]="{ item }">
                {{date(item.created_at)}}
              </template>
              <template v-slot:[`item.amount`]="{ item }">
                {{item.amount * item.quantity}} Rwf
              </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </section>
</template>

<script>
import {
  mdbLineChart,
  mdbHorizontalBarChart,
  mdbBarChart,
  mdbPieChart,
  mdbContainer,
  mdbDoughnutChart,
} from 'mdbvue'
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
    mdbLineChart,
    mdbHorizontalBarChart,
    mdbBarChart,
    mdbPieChart,
    mdbDoughnutChart,
    mdbContainer,
    ValidationProvider,
    ValidationObserver,
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
        labels: ['Sold', 'In stock', 'damaged'],
        datasets: [
          {
            data: [100, 50, 20],
            backgroundColor: ['#46BFBD', '#FDB45C', '#E30415'],
            hoverBackgroundColor: ['#5AD3D1', '#FFC870', '#FC2638'],
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
      lineHasData: true,
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
        copNum: '',
        income:'',
        loss: '',
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
      let item =  date.split(' ')
      return item[1] + "-" + item[2] + "-" + item[3] + " " + item[4]
    },
    getData() {
      this.$axios.get(
        "https://cooperative-management.herokuapp.com/api/admin/transactions"
      )
      .then(res => {
        this.transItems = res.data.transactions
        this.copNum = res.data.cooperatives
        this.income = res.data.totalIncome
        this.loss = res.data.totalLoss
        console.log(this.transItems);
      })
    }
  },
  layout: 'dashboard',
  mounted() {
    // this.authorization()
    this.getData()
  },
}
</script>

<style scoped></style>
