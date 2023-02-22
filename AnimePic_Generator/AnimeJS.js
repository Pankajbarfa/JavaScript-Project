const btn=  document.getElementById("btn");
const image=document.getElementById("image");
const artist=document.getElementById("picName");
const download=document.getElementById("downloadBtn");

btn.addEventListener("click", async function(){
    $("#para").hide();
    $("#box").show();
    
    try{
        btn.disabled=true;
        image.src = "Loading.svg";
        btn.innerText="Loading...";
        artist.innerText="Updating..."
        const Response = await fetch("https://api.catboys.com/img");
        const data = await Response.json();
        image.src = data.url;
        btn.disabled=false;
        
        btn.innerText="Get Anime";
        artist.innerText=data.artist;
        download.addEventListener("click", function(){
            var downloadLink = document.createElement('a');
            downloadLink.setAttribute('href', image.src);
            downloadLink.setAttribute('download','image.jpg');
            downloadLink.click();
        });
    }catch(error){
        console.log("ERROR");
        btn.disabled=false;
        btn.innerText="Get Anime";
        artist.innerText="An error occured, try again"
    }

});


