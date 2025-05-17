const NodeHelper = require("node_helper")
const axios = require("axios")

module.exports = NodeHelper.create({
  start() {
    console.log("Node helper for MMM-NotionShoppingList started")
  },

  socketNotificationReceived(notification,payload) {
    if (notification === "FETCH_DATA") {
		const token = payload.token;
      this.fetchData(token)
    }
  },

  async fetchData(token) {
    const raw = {
      filter: {
        property: "Status",
        status: {
          equals: "Att köpa",
        },
      },
    }

    try {
      const response = await axios.post(
        "https://api.notion.com/v1/databases/c42723adafb24c87a8b6c76d36ee3d9f/query",
        raw,
        {
          headers: {
              Authorization: `Bearer ${token}`,
            "Notion-Version": "2022-06-28",
            "Content-Type": "application/json",
          },
        }
      )

      this.sendSocketNotification("DATA_RESULT", response.data)
    } catch (error) {
      console.error("Error fetching data:", error.message)
      this.sendSocketNotification("DATA_RESULT", { results: [] })
    }
  },
})
