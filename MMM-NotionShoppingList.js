Module.register("MMM-NotionShoppingList", {
  defaults: {
    itemsPerPage: 2,
    secondsPerPage: 5,
    minutesRefreshInterval: 1,
  },

  getStyles() {
    return ["MMM-NotionShoppingList.css"]
  },

  getScripts() {
    return ["mapItems.js"]
  },

  start() {
    this.currentPage = 0
    this.totalPages = 0
    this.listData = { results: [] }

    this.tableWrapper = document.createElement("div")
    this.tableWrapper.className = "container"

    const table = document.createElement("table")
    table.id = "table"

    const thead = document.createElement("thead")
    thead.id = "table-head"
    table.appendChild(thead)

    const tbody = document.createElement("tbody")
    tbody.id = "table-body"
    table.appendChild(tbody)

    this.tableWrapper.appendChild(table)

    this.getDataFromNodeHelper()
    this.scheduleRender()
    this.scheduleRefresh()
  },

  scheduleRender() {
	  this.unscheduleRender(); // clear any old timer first
    this.renderTimer = setInterval(() => {
   this.updateTableData();
    }, this.config.secondsPerPage * 1000)
  },

  unscheduleRender() {
  if (this.renderTimer) {
    clearInterval(this.renderTimer)
    this.renderTimer = null
  }
},
  scheduleRefresh() {
    this.refreshTimer = setInterval(() => {
      this.getDataFromNodeHelper()
    }, this.config.minutesRefreshInterval * 60 * 1000)
  },

  getDataFromNodeHelper() {
    this.sendSocketNotification("FETCH_DATA",{token: this.config.token})
  },

  socketNotificationReceived(notification, payload) {
    if (notification === "DATA_RESULT") {
      this.listData = payload
      this.totalPages = Math.ceil(this.listData.results.length / this.config.itemsPerPage)
      this.currentPage = 0
	  if(this.totalPages>1){
		  this.scheduleRender()
	}else{
		this.unscheduleRender()
		      this.currentPage = 0; // <-- Ensure valid index before rendering
	}
	this.updateTableData();
}
  },

  getDom() {
    return this.tableWrapper
  },

  updateTableData() {
    const data = this.listData.results || []
    const startIndex = this.currentPage * this.config.itemsPerPage
    const endIndex = Math.min(startIndex + this.config.itemsPerPage, data.length)
    const pageItems = data.slice(startIndex, endIndex)

    if (typeof window.mapItems === "function") {
      window.mapItems(pageItems)
    }

    this.currentPage++
    if (this.currentPage >= this.totalPages) {
      this.currentPage = 0
    }
  }

})
