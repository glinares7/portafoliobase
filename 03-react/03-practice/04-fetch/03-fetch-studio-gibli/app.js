const mainDiv = document.getElementById("morph");

const userAction = async () => {
  const response = await fetch("https://ghibliapi.herokuapp.com/films");
  const myJson = await response.json();
  console.log(myJson);
  return myJson;
};

//userAction().then(myJson => console.log(myJson))
userAction().then((myJson) => {
  var data = myJson;
  data.forEach((film) => {
    const charapterDiv = document.createElement("div");
    const image = document.createElement("div");
    const charapterTextDiv = document.createElement("div");

    charapterTextDiv.innerHTML = `
        <p><b>Film Title: </b> ${film.title}</p>
        <p> <b>Film Orginal Title:</b>  ${film.original_title}</p>
        <p><b>Film Original Title Romanised:</b> ${film.original_title_romanised}</p>
        <p><b>Producer:</b> ${film.producer}</p>
        <p><b>Url:</b> <a href="${film.url}" target="_blank">A</a></p>
        <p> <b>Discription:</b> ${film.description}</p>
        `;
    image.style.backgroundImage = `url("${film.image}")`;

    charapterDiv.append(image);
    charapterDiv.append(charapterTextDiv);

    charapterDiv.classList.add("charapter-wrapper");
    charapterTextDiv.classList.add("charapter-text");
    image.classList.add("image-div");

    mainDiv.append(charapterDiv);

    console.log(mainDiv);
  });
});
