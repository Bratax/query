$(document).ready(function() {
  let data = [];

  // Function to add a row to the table
  function addRow(rowData) {
    let row = $("<tr>");
    row.append($("<td>").text(rowData.id));
    row.append($("<td>").text(rowData.name));
    row.append($("<td>").text(rowData.email));
    $("#data").append(row);
  }

  // Function to clear the form
  function clearForm() {
    $("#id").val("");
    $("#name").val("");
    $("#email").val("");
  }

  // Function to validate the form data
  function validateForm() {
    let id = $("#id").val();
    let name = $("#name").val();
    let email = $("#email").val();

    // Check for duplicate name and email
    let duplicate = false;
    data.forEach(function(item) {
      if (item.name === name && item.email === email) {
        duplicate = true;
      }
    });

    if (duplicate) {
      alert("Name and email combination already exists!");
      return false;
    }

    // Check for empty fields
    if (!id || !name || !email) {
      alert("All fields are required!");
      return false;
    }

    return true;
  }

  // Function to add an entry
  function addEntry() {
    if (!validateForm()) {
      return;
    }

    let id = $("#id").val();
    let name = $("#name").val();
    let email = $("#email").val();

    let rowData = { id: id, name: name, email: email };
    data.push(rowData);

    addRow(rowData);
    clearForm();
  }

  // Function to edit an entry
  function editEntry() {
    if (!validateForm()) {
      return;
    }

    let id = $("#id").val();
    let name = $("#name").val();
    let email = $("#email").val();

    let index = data.findIndex(function(item) {
      return item.id === id;
    });

    if (index < 0) {
      alert("Entry not found!");
      return;
    }

    // Check for duplicate name and email
    let duplicate = false;
    data.forEach(function(item) {
      if (item.id !== id && item.name === name && item.email === email) {
        duplicate = true;
      }
    });

    if (duplicate) {
      alert("Name and email combination already exists!");
      return;
    }

    data[index].name = name;
    data[index].email = email;

    $("#data").empty();
    data.forEach(function(item) {
      addRow(item);
    });

    clearForm();
  }

  // Function to delete an entry
  function deleteEntry() {
    let id = $("#id").val();

    let index = data.findIndex(function(item) {
      return item.id === id;
    });

    if (index < 0) {
      alert("Entry not found!");
      return;
    }

    data.splice(index, 1);

    $("#data").empty();
    data.forEach(function(item) {
      addRow(item);
    });

    clearForm();
  }

  // Add event listeners for the buttons
  $("#add-btn").click(addEntry);
  $("#edit-btn").click(editEntry);
  $("#delete-btn").click(deleteEntry);
});

function search() {
  // Get the search query
  var query = $("#search").val().toLowerCase();

  // Loop through all the rows in the table
  $("#data tr").each(function(){
    // Get the text content of each cell in the row
    var text = $(this).find("td:eq(0)").text().toLowerCase();
    var name = $(this).find("td:eq(1)").text().toLowerCase();
    var email = $(this).find("td:eq(2)").text().toLowerCase();

    // Check if the query matches any of the cell contents
    if (text.indexOf(query) !== -1 || name.indexOf(query) !== -1 || email.indexOf(query) !== -1) {
      // Show the row if it matches
      $(this).show();
    } else {
      // Hide the row if it doesn't match
      $(this).hide();
    }
  });
}

