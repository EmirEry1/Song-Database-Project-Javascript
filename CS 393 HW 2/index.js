var playLists = [];

function viewSongs(songs){
      var tableText = "<table id = 'songTable' border = '3'> <tr> <th></th><th>Song</th> <th>Artist</th> <th>Album</th> <th>Length</th></tr>";
      for(song of songs){
        tableText+= "<tr id = "+"song" +song.id + "> <td><input id = "+"cb" +song.id + " type='checkbox'></td> <td>"+song.name+"</td> <td>"+song.artist+"</td> <td>"+song.album+"</td><td>"+song.length+"</td> </tr>";
      }
      //<td><input type='checkbox' id='vehicle1' name='vehicle1' value='Bike' </td>
      tableText += "</table>"
      document.getElementById("songList").innerHTML = tableText;
}

function pritnReady(){
  alert("Ready");
}

function getSongsBySearch(prefix){
  if(prefix != ""){
    axios.get("http://localhost:8080/songs/" +prefix)
      .then(res => {
        const songList = res.data;
          viewSongs(songList)
        }).catch(function (error) {
          console.log(error);
        });
  }

}

function createPlayList(name){

  table = document.getElementById("songTable").rows
  var songs = [];
  for(var row = 1; row < table.length; row++){

    var idTable = table.item(row).getAttribute("id");
    var checkbox = document.getElementById("cb"+idTable.substr(4,idTable.length-1))
    if(checkbox.checked){
      const song = {
          "id" : idTable.substr(4,idTable.length-1),
          "name": table.item(row).cells[1].innerHTML,
          "artist": table.item(row).cells[2].innerHTML,
          "album": table.item(row).cells[3].innerHTML,
          "length": table.item(row).cells[4].innerHTML
      }
      songs.push(song)
    }
  }
  console.log(songs)

  if(name.length>=5 && songs.length >= 2 ){
    axios.post("http://localhost:8080/songs/"+ name, songs)
      .then(res => {

          const playList = res.data;
          playLists.push(playList)
          console.log(playList)
          var feedback = document.getElementById("createdPlaylist")
          feedback.innerHTML = "<p>Playlist Created Successfully</p>"

          //alert("Successfully created playlist")


        }).catch(function (error) {
          console.log(error);
        });
  }
  else if(name.length < 5){
    var feedback = document.getElementById("createdPlaylist")
    feedback.innerHTML = "<p>Playlist Couldn't Be Created: Playlist name can not be less then 5 characters.</p>"
  }

  else{
    var feedback = document.getElementById("createdPlaylist")
    feedback.innerHTML = "<p>Playlist Couldn't Be Created: Playlist should contain at least 2 songs.</p>"
  }
}
