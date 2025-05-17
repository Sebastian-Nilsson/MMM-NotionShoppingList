const mapItems = (data) => {
  console.log(data)
  const head = document.getElementById("table-head")
  const main = document.getElementById("table-body")
  removeItems(main)

  if (head.children.length === 0) {
  // add headers

    // headers
    const headerRow = document.createElement("tr")
    const headers = ["Artikel", "Antal"]
    headers.forEach((headerText) => {
      const th = document.createElement("th")
      th.textContent = headerText
      headerRow.appendChild(th)
    })
    head.appendChild(headerRow)
  }

  // rows
  const map = data.map((i) => {
    /** @type {NotionPage} */
    const item = i

    const row = document.createElement("tr")
    const article = document.createElement("td")
    article.textContent = item.properties.Title?.title[0]?.text?.content ?? ""
    row.appendChild(article)

    const amount = document.createElement("td")
    amount.textContent = item.properties.Antal?.number ?? ""
    row.appendChild(amount)

    return row
  })

  map.forEach((element) => {
    addItem(element, main)
  })

  return main
}

const addItem = (item, container) => {
  item.classList.add("item")

  container.appendChild(item)

  // Triggering the entering animation
  setTimeout(() => {
    item.classList.add("entering")
  }, 100) // Delay slightly to trigger animation
}

const removeItems = (container) => {
  let itemsToRemove = container.querySelectorAll(".item")

  if (itemsToRemove) {
    itemsToRemove.forEach((element) => {
      // Triggering the entering animation

      element.classList.add("leaving")
    //   // Wait for animation to complete before removing from DOM
    //   element.addEventListener("transitionend", () => {
    //     container.removeChild(element)
    //   })

	        // Fallback: force-remove after max timeout
      setTimeout(() => {
        if (container.contains(element)) {
          container.removeChild(element);
        }
      }, 100); // 1s as a safe fallback
    })


  }
}

// For browser usage (MagicMirror environment)
if (typeof window !== "undefined") {
  window.mapItems = mapItems
}
