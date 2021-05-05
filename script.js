new Vue({
  el: '#app',
  data: {
    tableColumns: [{
      title: 'Month/Year',
      field: 'monthyear'
    }, {
      title: 'GFS Sector',
      field: 'sector'
    }, {
      title: 'GFS CSM',
      field: 'csm'
    }],
    users: [],
    filterQuery: '',
    orderByField: 'monthyear',
    fetchError: false
  },
  computed: {
    filteredUsers: function() {
      var vm = this
      return _.orderBy(
        vm.users.filter(function(user) {
          var regex = new RegExp(vm.filterQuery, 'i')
          return (
            regex.test(monthyear) ||
            regex.test(sector) ||
            regex.test(csm)
          )
        }),
        vm.orderByField
      )
    },
    statusMessage: function() {
      if (this.fetchError) {
        return 'There was a problem fetching the users. JSONPlaceholder might be down.'
      }
      if (this.users.length) {
        if (!this.filteredUsers.length) {
          return 'Sorry, no matching users were found.'
        }
      } else {
        return 'Loading...'
      }
    }
  },
  created: function() {
    this.fetchUsers()
  },
  methods: {
    fetchUsers: function() {
      var vm = this
      vm.monthyear = []
      vm.fetchError = false
      fetch('./form.json')
        .then(function(response) {
          return response.json()
        })
        .then(function(users) {
          vm.monthyear = monthyear
        })
        .catch(function() {
          vm.fetchError = true
        })
    },
    getField: function(object, field) {
      return _.at(object, field)[0]
    }
  }
})
