$(document).ready(function() {

  var commands = 
  [
    "ls", "routes"
  ]
   var console = $('<div class="console2">');
   $('body').append(console);
   var controller = console.console({
     promptLabel: 'JavaScript> ',
     commandValidate:function(line){
       if (line == "") return false;
       else return true;
     },
     commandHandle:function(line, report){
       try { 
         var cmd = "";
          if (commands.indexOf(line) != -1) {
            cmd = "/" + line;
          }
          else {
            cmd = "/eval?cmd=" + $.base64Encode(line);
          }
          $.ajax({url: cmd, 
            dataType: "json", 
            success: function(data) {
              if (data) {
                var strungify = _(data).reduce("", function(memo, el){memo += "\n" + el; return memo;});
                report (strungify);
              }
              else {
                report ("Null response");
              }
            },
            error: function() {
              report("Some error occured");
            }
         });
       }  
       catch (e) { 
         return e.toString(); 
       }
     },
     animateScroll:true,
     promptHistory:true,
     autofocus: true,
     welcomeMessage:'Enter some JavaScript expressions to evaluate.'
   });
});

