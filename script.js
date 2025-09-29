    // 1. Get references to the main containers
    const ticketCards = document.querySelectorAll(".ticket-card");
    const inProgressContainer = document.getElementById("in-progress");
    const resolvedTasksContainer = document.getElementById("resolved-tasks");

    // 2. Function to update the banner counts
    function updateCounts() {
      const inProgressCards = inProgressContainer.querySelectorAll(".card");
      const resolvedTasks = resolvedTasksContainer.querySelectorAll(
        "div[data-ticket-id]"
      );

      document.getElementById("in-progress-count").textContent =
        inProgressCards.length;
      document.getElementById("resolved-count").textContent =
        resolvedTasks.length;
    }

    // 3. Add event listener to every ticket card
    ticketCards.forEach((card) => {
      card.addEventListener("click", function () {
        // Get the title and ID from the clicked card
        const ticketTitleElement = card.querySelector(".ticket-title");
        const ticketTitle = ticketTitleElement
          ? ticketTitleElement.textContent
          : "Unknown Ticket";
        const ticketId = card.getAttribute("data-ticket-id");

        // CHECK: Prevent duplicates by checking the data-ticket-id in the in-progress list
        const existingIds = Array.from(
          inProgressContainer.querySelectorAll("[data-ticket-id]")
        ).map((el) => el.getAttribute("data-ticket-id"));

        if (existingIds.includes(ticketId)) {
          // If the ticket is already in progress, stop.
          // alert(`Ticket #${ticketId} is already in the In-Progress list!`);
          return;
        }

        // 4. Construct the new card HTML for the In-Progress column
        const newCardHTML = `
                <div class="card shadow-md border border-gray-300 bg-white" data-ticket-id="${ticketId}">
                    <div class="card-body p-4">
                        <h3 class="text-sm font-medium">${ticketTitle}</h3>
                        <button class="btn btn-sm bg-green-500 text-white w-full mt-2 hover:bg-green-600 complete-btn">
                            Complete
                        </button>
                    </div>
                </div>
            `;

        // 5. Append the new HTML to the In-Progress container
        inProgressContainer.insertAdjacentHTML("beforeend", newCardHTML);

        // Remove the instructional text if it's still there
        const instruction = inProgressContainer.querySelector(
          ".text-sm.text-gray-500.italic"
        );
        if (instruction) {
          instruction.remove();
        }

        // 6. Update the "In-Progress" count
        updateCounts();
      });
    });

    // 7. Handle the "Complete" and "Remove" buttons using event delegation
    document.addEventListener("click", function (event) {
      // Handle "Complete" button click
      if (event.target.classList.contains("complete-btn")) {
        const inProgressCard = event.target.closest(".card");
        const title = inProgressCard.querySelector("h3").textContent;
        const id = inProgressCard.getAttribute("data-ticket-id");

        // Construct the Resolved Task HTML
        const resolvedTaskHTML = `
                <div class="bg-green-50 border border-green-300 text-green-700 rounded-lg shadow-sm p-3 mb-2" data-ticket-id="${id}">
                    <p class="font-medium mb-1">${title}</p>
                    <div class="flex justify-between items-center">
                        <p class="text-sm">✔ Completed</p>
                        <button class="text-sm text-gray-600 hover:text-red-500 remove-btn">Click to remove</button>
                    </div>
                </div>
            `;

        // Move the task from In-Progress to Resolved
        resolvedTasksContainer.insertAdjacentHTML(
          "beforeend",
          resolvedTaskHTML
        );
        inProgressCard.remove();

        // Update the counts
        updateCounts();
      }

      // Handle "Remove" button click (for Resolved tasks)
      if (event.target.classList.contains("remove-btn")) {
        event.target.closest("div[data-ticket-id]").remove();
        // Update the counts
        updateCounts();
      }
    });

    // Initial count update to reflect any pre-loaded cards
    updateCounts();