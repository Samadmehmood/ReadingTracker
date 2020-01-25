    //Developer: samadmehmehmood
    //V is the number of character user reads per seconds on avg
    //N is the number of segments within the article which are to be read by the user
    //
    var v = 700;
    var N = 0;

    //counter when user is reading
    var mynumber = 0;
    //done stores information about which segments are marked as read
    var done = [];
    //interval defines time interval to call main function automatically and is written as number*1000(for seconds)
    var interval = 2000;
    //counter and cross counter store info about for how long user is reading the specific segment or is it not reading for how long 
    var counter = [];
    var crossCounter = [];
    //avgRead stores the info about how much characters of a segment are currently marked as read
    var avgRead = [];
    //totalRead saves information about how much parts of the article are marked as read
    var totalRead = 0;
    //divTagName is the string that is used to find every segment in an article and its written as "#Articleid/".ArticleClass>element/.elementClass"
    var divTagName = ".postcontent>p";
    //divName is the name or id or class of the article and can be written as  "#Articleid/".ArticleClass"
    var divName = ".postcontent";
    //this function calls main function after your specified time intervals
    setInterval(status, 22);
    //this function shows the status of the document or tab. when light is green it means that tab is in focus and user is reading any of the article's segments, if the light is yellow it means that tab is in focus but user is not reading article because its not infocus and if the light turns red it means that the window or tab is out of focus right now
    function status() {

      if (document.hasFocus()) {
        if (visibility(divName) == true) {
          $("#green").fadeIn(200);
          $("#yellow").fadeOut(200);
          $("#red").fadeOut(200);
        } else {
          $("#green").fadeOut(200);
          $("#yellow").fadeIn(200);
          $("#red").fadeOut(200);
        }
      } else {
        $("#red").fadeIn(200);
        $("#yellow").fadeOut(200);
        $("#green").fadeOut(200);
      }
    };
    
    setInterval(function () {
      main(".postcontent", ".postcontent>p",false)
    }, interval);
    // This function initializes arrays for elements of article
    $(document).ready(function () {
      $(divTagName).each(function (index) {
        mynumber = mynumber + 1; 
      });
      for (i = 0; i, i <= mynumber; i++) {
        counter.push(0);
        crossCounter.push(0);
        avgRead.push(0);
        done.push(false);
      };
      N = mynumber;
      console.log("Total number of parts of article are: " + N)
    });
    //color argument is added, it can be true if you want text decoration changed when any segment is marked completed. it can be true or false
    function main(divName, divTagName,color) {
      //time interval for callback
      //this function initializes appropriate number of array elements for each part of an article
      //content is the whole article
      //charcount is the number of characters within *content
      //wordCount is the number of words within *content
      var content = $(divName).text(),
        charCount = content.length,
        wordCount = content.replace(/[^\w ]/g, "").split(/\s+/).length;
      //AI code goes here   
      if (document.hasFocus()) {
        if (visibility(divName) == true) {
          $(divTagName).each(function (index) {
            //this loop checks which of the parts or specified text is currently in view and whats its length
            if (visibility("#" + $(this).attr("id")) == true) {
              //calculate length of characters in every segment
              var plen = $(this).text().length;
              // calculate average characters read 
              avgRead[index] = (counter[index] * interval * v) / 60000;
              //do operations on the basis of conditions
              if (done[index] == false) {
                if (avgRead[index] >= plen) {
                  done[index] = true;
                  totalRead = totalRead + 1;
                  console.log($(this).attr("id") + " is in focus and it has " + plen +
                    " characters and user is read it for " + counter[index] +
                    " seconds so Its marked as read and" +
                  " User read about " + (totalRead / N) * 100 + "% of artcle");
                  //this line custoomizes css of the segment of article when its marked as completed. you can modify it according to your choice
                    if (color==true)
                   { $(this).css({ 'color': 'green', 'text-decoration':'line-through' });
                   }
                  return false;
                } else if (avgRead[index] < plen) {

                  counter[index] = parseInt(counter[index]) + parseInt(interval / 1000);
                  console.log($(this).attr("id") + " is in focus and it has " + plen +
                    " characters and user is reading it since " + counter[index] +
                    " seconds so user has approximately read about " + avgRead[index] + " So  User read about " +
                    (totalRead / N) * 100 + "% of artcle");
                  return false;
                }

              } else {
                console.log($(this).attr("id") + " is in focus and it has " + plen +
                  " characters and user read it for " + counter[index] +
                  " seconds so Its marked as read and" +
                  " User read about " + (totalRead / N) * 100 + "% of artcle");

              }

            } else {
              if (done[index] == false) {
              var plen = $(this).text().length;
              crossCounter[index] = crossCounter[index] + parseInt(interval / 1000);
              console.log($(this).attr("id") + " is not in focus and it has " + plen +
                " characters and user is not reading it since " + crossCounter[index] + " seconds" +
                " So  User read about " + (totalRead / N) * 100 + "% of artcle");
              }
              else{
                console.log($(this).attr("id") + " is not in focus but it is marked as read and  User read about " + (totalRead / N) * 100 + "% of artcle");
              }

            }

          });
          //this function has been set up for possible future use to send info to server from client while this function needs modification
          //   // $.ajax
          //   // ({
          //   //   type: 'POST',
          //   //   url: 'index2.html',
          //   //   data: {
          //   //     details: [amountscrolled, charCount, wordCount, (counter * interval) / 1000, avgRead]
          //   //   },
          //   //   success: function (data) {
          //   //     console.log(data);
          //   //   }
          //   // });
          //   //  


        }
        else{
        console.log("Window is in focus but article is currently not in view and User read about " + (totalRead / N) * 100 + "% of artcle");          
        }
      } else {
        console.log("Window not in focus");

      }

    }

    function visibility(elementName) {
      // this function checks if a specific elemnt is visible in webpage or not 
      var visibilityBit = false;
      $(elementName).each(function () {
        var pos = $(this).offset(),
          wX = $(window).scrollLeft(),
          wY = $(window).scrollTop(),
          wH = $(window).height(),
          wW = $(window).width(),
          oH = $(this).outerHeight(),
          oW = $(this).outerWidth();

        // check the edges
        if (pos.left >= wX && pos.top >= wY &&
          oW + pos.left <= wX + wW && oH + pos.top <= wY + wH) {
          visibilityBit = true;
          // console.log('Div #' + $(this).attr('id') + ' is fully visible');
        } else
        if (((pos.left <= wX && pos.left + oW > wX) ||
            (pos.left >= wX && pos.left <= wX + wW)) &&
          ((pos.top <= wY && pos.top + oH > wY) ||
            (pos.top >= wY && pos.top <= wY + wH))) {
          visibilityBit = true;
          // console.log('Div #' + $(this).attr('id') + ' is partially visible');
        } else {
          visibilityBit = false;
          //console.log('Div #' + $(this).attr('id') + ' is not visible');

        }
      });
      return visibilityBit;
    }