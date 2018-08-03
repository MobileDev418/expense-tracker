$(document).ready(() => {
  // Place JavaScript code here...
  
  var actions = $("table td:last-child").html();
  // Append table with add row form on add new button click
  $(".add-new").click(function(){
    $(this).attr("disabled", "disabled");
    var index = $("table tbody tr:last-child").index();
      var row = '<tr>' +
        '<td><input type="text" class="form-control" name="date" id="date"></td>' +
        '<td><input type="text" class="form-control" name="time" id="time"></td>' +
        '<td><input type="text" class="form-control" name="description" id="description"></td>' +
        '<td><input type="text" class="form-control" name="amount" id="amount"></td>' +
        '<td><input type="text" class="form-control" name="comment" id="comment"></td>' +
        '<td>' + actions + '</td>' +
      '</tr>';
      $("table").append(row);
      $("table tbody tr").eq(index + 1).find(".add, .edit").toggle();
  });
  // Add row on add button click
  $(document).on("click", ".add", function(){
    var empty = false;
    var input = $(this).parents("tr").find('input[type="text"]');
    input.each(function(){
      if(!$(this).val()){
        $(this).addClass("error");
        empty = true;
      } else{
        $(this).removeClass("error");
      }
    });
    $(this).parents("tr").find(".error").first().focus();
    if(!empty){
      input.each(function(){
        $(this).parent("td").html($(this).val());
      });
      $(this).parents("tr").find(".add, .edit").toggle();
      $(".add-new").removeAttr("disabled");
    }
  });
  // Edit row on edit button click
  $(document).on("click", ".edit", function(){
    $(this).parents("tr").find("td:not(:last-child)").each(function(){
      $(this).html('<input type="text" class="form-control" value="' + $(this).text() + '">');
    });
    $(this).parents("tr").find(".add, .edit").toggle();
    $(".add-new").attr("disabled", "disabled");
  });
  // Delete row on delete button click
  $(document).on("click", ".delete", function(){
    $(this).parents("tr").remove();
    $(".add-new").removeAttr("disabled");
  });
});
