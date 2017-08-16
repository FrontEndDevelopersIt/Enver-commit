//Libraries
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
//Libraries activation
Vue.use(Vuex)
Vue.use(VueAxios, axios)
//Import modules
import {apiDomain, filtration, allVacancy} from './config.js'
const store = new Vuex.Store({
//Data container
state: {
      //vacancyDetails component start
        vacancyDetails: [],
        vacanciesPerPage: [],
        pageRange: 2,
        totalPages: null,
        perPage: null,
        totalVacancies: null,
        //filtration component start
        city: null,
        employment: null,
        filtratedMassive: [],
        filterIndicator: false,
        //filtration component end
        //myheader component start
        searchQuery: null,
        show: false,
        //myheader component end
  },
     mutations: {
         vacanciesPerPage(state, {item}) {
             state.vacanciesPerPage = item
         },
         totalPages(state, {item}) {
             state.totalPages = item
         },
         vacancyDetails(state, {item}){
           state.vacancyDetails = item
         },
      //filtration component start
         cityCommit( state, item ){   //Value of city select
           state.city = item
         },
         employmentCommit( state, item){ //Value of city emplyment
           state.employment = item
         },
         totalVacancies(state, {item}){ //For statistics
           state.totalVacancies = item
         },
         filterIndicator(state, item){
           state.filterIndicator = item
         },
      //filtration component end
      //myheader component start
         searchQuery(state, item) {
          state.searchQuery = item
        },
      //myheader component end
        show(state, {item}){
          state.show = item
        },
        perPage(state, item){
          state.perPage = parseInt(item)
        },
        perPageFunction(state, {item}){
          state.perPage = item
        }
     },
     getters: {
         city (state) {
               return state.city
             },
         employment (state) {
               return state.employment
        },
         searchQuery(state) {
               return state.searchQuery
        }
       },
    actions: {
        getVacancies: function ({ commit }, page, val) {
          if(store.state.filterIndicator === false) {
              var options = {
                  params: {
                      page: page,
                      limit: store.state.perPage
                    }
                  }
                axios.get(allVacancy, options).then((response) => {
                    commit('vacanciesPerPage', { item: response.data.data})
                    commit('totalPages', { item: response.data.last_page })
                    commit('totalVacancies', { item: response.data.total})
                    commit('perPageFunction',{ item: parseInt(response.data.data.length)})
                    console.log(response)
                    }, (err) => {
                    console.log(err)
                })
              }
            //Get filtrated Vacancies, filtration component start
              else if (store.state.filterIndicator === true){
                var options = {
                    params: {
                    city: store.state.city,
                    employment: store.state.employment,
                    page: page,
                    number: store.state.perPage,
                  }
                }
              axios.get(filtration, options).then(function(response) {
                console.log(response)
                  commit('vacanciesPerPage', { item: response.data.data})
                  commit('totalPages', { item: response.data.last_page })
                  commit('totalVacancies', { item: response.data.total})
                }, (err) => {
                    console.log(err)
            })
              //Get filtrated Vacancies, filtration component start end
            }

          },

        vacancyDetails: function ({ commit }, id ) {
              var options = {
                  params: {
                      id: id
                    }
                }
                axios.get(allVacancy + id).then((response) => {
                    console.log(response.data)
                    commit('vacancyDetails', { item: response.data })
                    }, (err) => {
                    console.log(err)
                })
              },
        hideProfile({commit}){
          commit('show', {item: false})
        },
        showProfile({commit}){
          commit('show', {item: true})
        },

         getMap(){
           axios.get('https://maps.googleapis.com/maps/api/js?key=AIzaSyCPxHbMTNdS2FyQgibEYxOIKIl1Zyw2Sv8&callback=initMap').then((response) => {
               console.log(response)
               console.log(1)
               }, (err) => {
               console.log(err)
           })

         }




        }
    })
 export default store
