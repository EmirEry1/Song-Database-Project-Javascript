

getAllPlaylists()

function viewPlaylist(playLists){


    var tableText = "<table id = 'playlistTable' border = '3'> <tr> <th>Name</th> <th>Song Count</th><th>Length</th></tr>";
    for(playlist of playLists){
      tableText+= "<tr><td>"+playlist.name+"</td> <td>"+playlist.songCount+"</td><td>"+(playlist.length-playlist.length%60)/60+":"+playlist.length%60+"</td> </tr>";
    }
    //<td><input type='checkbox' id='vehicle1' name='vehicle1' value='Bike' </td>
    tableText += "</table>"
    document.getElementById("playlistContainer").innerHTML = tableText;
  

}

function getAllPlaylists(){
  axios.get("http://localhost:8080/songs/playlists")
    .then(res => {
        const playListsGot = res.data;
        console.log(playListsGot)
        viewPlaylist(playListsGot)
        //viewPlaylist(songList)
      }).catch(function (error) {
        console.log(error);
      });
}
