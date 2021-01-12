// buttons
const btns = document.querySelectorAll(".btn");
const vs_btns = document.querySelectorAll(".vs_button");
const play_btn = document.querySelector(".play_btn");

// player info vars
let pname = "";
let str = "";
let height = "";
let weight = "";
let agility = "";
let stamina = "";
let tough = "";
let img = "";

// audio
const audio = new Audio("./button_audio.mp3");

// global vars
let no_of_players;
let vs_btn_value;
let arttr_btn_value = "strength";

// global arrays
let man_attr_arr = [];
let comp_attr_arr = [];
let all_attr_arr = [];

//arrays for players
let player_arr1 = [];
let player_arr2 = [];
let player_arr3 = [];
let player_arr4 = [];
let player_arr5 = [];
let player_arr6 = [];

//computer players current card record
let comp1_curr_card = 0;
let comp2_curr_card = 0;
let comp3_curr_card = 0;
let comp4_curr_card = 0;
let comp5_curr_card = 0;

/*********************************
Button Clicks and sending data
************************************/
btns.forEach(btn => {
    btn.addEventListener("click", () => {
        audio.play();
        no_of_players = btn.value;
    })
});
vs_btns.forEach(btn => {
    btn.addEventListener("click", () => {
        audio.play();
        vs_btn_value = btn.value;
    })
});
play_btn.addEventListener("click", () => {
    document.querySelector(".container").classList.add("hide");
    document.querySelector(".card_game_container").classList.add("show");
    getData(vs_btn_value);
});


/*********************************
Function receiving data &
getting players from ajax call
************************************/
const getData = (vs = "computer") => {
    if (vs == "computer") {
        let req = new XMLHttpRequest();
        req.open("GET", "http://127.0.0.1:5500/data.json", true);
        req.onload = () => {
            const data = JSON.parse(req.responseText);
            distributeArr(data);
            renderHTML(data);
        }
        req.send();
    }
}

// distributing array equally to players
const distributeArr = (data) => {
    // for 2 players
    if (no_of_players == 2) {
        player_arr1 = data.slice(0, 6);
        player_arr2 = data.slice(6, 12);
    }
    else if (no_of_players == 3) {
        player_arr1 = data.slice(0, 4);
        player_arr2 = data.slice(4, 8);
        player_arr3 = data.slice(8, 12);
    }
    else if (no_of_players == 4) {
        player_arr1 = data.slice(0, 3);
        player_arr2 = data.slice(3, 6);
        player_arr3 = data.slice(6, 9);
        player_arr4 = data.slice(9, 12);
    }
    else if (no_of_players == 5) {
        player_arr1 = data.slice(0, 3);
        player_arr2 = data.slice(3, 6);
        player_arr3 = data.slice(6, 8);
        player_arr4 = data.slice(8, 10);
        player_arr5 = data.slice(10, 12);
    }
    else if (no_of_players == 6) {
        player_arr1 = data.slice(0, 2);
        player_arr2 = data.slice(2, 4);
        player_arr3 = data.slice(4, 6);
        player_arr4 = data.slice(6, 8);
        player_arr5 = data.slice(8, 10);
        player_arr6 = data.slice(10, 12);
    }
}

// rendering html for all players
const renderHTML = (data) => {
    for (let i = 0; i < no_of_players - 1; i++) {
        let card_deck = `
    <div class="card_deck card_deck_comp${i + 1}">
        <div class="logo">
            <img src="./images/WWElogo.png" alt="WWE LOGO" />
        </div>
        <div class="attrBtn_div">
            <h1>You Bet On</h1>
            <button class="attrBtn" type="button" value="strength">
                Strength
            </button>
            <button class="attrBtn" type="button" value="height">Height</button>
            <button class="attrBtn" type="button" value="weight">Weight</button>
            <button class="attrBtn" type="button" value="stamina">Stamina</button>
            <button class="attrBtn" type="button" value="agility">Agility</button>
            <button class="attrBtn" type="button" value="toughness">
                Toughness
            </button>
        </div>
    <h1 class = "comp_card_left${i + 1}">WWE Trump Cards</h1>
        <div class="card card_comp">
            <div class="superstar">
                <img />
            </div>
            <h1 class="player_name"></h1>
            <div class="info">
                <section class="str"></section>
                <section class="height"></section>
                <section class="weight"></section>
                <section class="stamina"></section>
                <section class="agility"></section>
                <section class="toughness"></section>
            </div>
        </div>
  </div>
    `;
        document.querySelector(".card_game_container").insertAdjacentHTML("beforeend", card_deck);
    }
    // calling func. to show player info on cards
    ShowPlayerAttr();
}

// showing palyer info on cards
const ShowPlayerAttr = () => {
    // showing cards on clicking the attribute btn on deck
    const attrBtn = document.querySelectorAll(".attrBtn");
    attrBtn.forEach(btn => {
        btn.addEventListener("click", () => {
            arttr_btn_value = btn.value;
        });
    });
    document.querySelector(".throw").addEventListener("click", () => {
        // emptying array
        man_attr_arr = [];
        all_attr_arr = [];
        comp_attr_arr = [];
        // card no number
        let card_no = document.querySelector("#ip").value;
        if (card_no >= 1 && card_no <= player_arr1.length) {
            manual_player_card(card_no - 1);
            computer_player();
            compare();
        }
        else (
            alert(`Enter Card Number Between 1 to ${player_arr1.length}`)
        )
    });
}
// manual player logic
const manual_player_card = (card_no) => {
    // getting player elements
    pname = document.querySelector(".manual_player_card_deck .manual_player_card .player_name");
    str = document.querySelector(".manual_player_card_deck .manual_player_card .info .str");
    height = document.querySelector(".manual_player_card_deck .manual_player_card .info .height");
    weight = document.querySelector(".manual_player_card_deck .manual_player_card .info .weight");
    stamina = document.querySelector(".manual_player_card_deck .manual_player_card .info .stamina");
    tough = document.querySelector(".manual_player_card_deck .manual_player_card .info .toughness");
    agility = document.querySelector(".manual_player_card_deck .manual_player_card .info .agility");
    img = document.querySelector(".manual_player_card_deck .manual_player_card .superstar img");

    // setting values to cards
    pname.textContent = player_arr1[card_no].name;
    str.textContent = player_arr1[card_no].str;
    height.textContent = player_arr1[card_no].height;
    weight.textContent = player_arr1[card_no].weight;
    stamina.textContent = player_arr1[card_no].stamina;
    tough.textContent = player_arr1[card_no].tough;
    agility.textContent = player_arr1[card_no].agility;
    img.src = player_arr1[card_no].img;

    // show the card now
    let card = document.querySelector(".manual_player_card_deck .manual_player_card");
    card.classList.add("show");

    if (arttr_btn_value == "strength") {
        play(parseInt(player_arr1[card_no].str.slice(-2)), true);
    }
    else if (arttr_btn_value == "height") {
        play(parseFloat(player_arr1[card_no].height.slice(-4)), true);
    }
    else if (arttr_btn_value == "weight") {
        play(parseInt(player_arr1[card_no].weight.slice(-3)), true);
    }
    else if (arttr_btn_value == "stamina") {
        play(parseInt(player_arr1[card_no].stamina.slice(-2)), true);
    }
    else if (arttr_btn_value == "agility") {
        play(parseInt(player_arr1[card_no].agility.slice(-2)), true);
    }
    else if(arttr_btn_value == "toughness"){
        play(parseInt(player_arr1[card_no].tough.slice(-2)), true);
    }
}

// computer player logic
const computer_player = () => {
    let cnt = 1;
    console.log("No of players : ", no_of_players);
    for(;cnt<no_of_players; cnt++){
        showCompCard(cnt);
    }
}

const showCompCard = (cnt) => {
    // getting computer attributes
    console.log(`.card_deck_comp${cnt}`);
    console.log("Cnt = ", cnt);
    try{
        pname = document.querySelector(`.card_deck_comp${cnt} .card_comp .player_name`);
        str = document.querySelector(`.card_deck_comp${cnt} .card_comp .info .str`);
        height = document.querySelector(`.card_deck_comp${cnt} .card_comp .info .height`);
        weight = document.querySelector(`.card_deck_comp${cnt} .card_comp .info .weight`);
        stamina = document.querySelector(`.card_deck_comp${cnt} .card_comp .info .stamina`);
        tough = document.querySelector(`.card_deck_comp${cnt} .card_comp .info .toughness`);
        agility = document.querySelector(`.card_deck_comp${cnt} .card_comp .info .agility`);
        img = document.querySelector(`.card_deck_comp${cnt} .card_comp .superstar img`);
    }
    catch(error){
        console.log(error);
    }

    // setting arrays that are allocated to players
    let arr = [];
    if (cnt == 1) {
        arr = player_arr2;
    }
    else if (cnt == 2) {
        arr = player_arr3;
    }
    else if (cnt == 3) {
        arr = player_arr4;
    }
    else if (cnt == 4) {
        arr = player_arr5;
    }
    else if (cnt == 5) {
        arr = player_arr6;
    }

    if(arr.length!==0){
        // random number
        let card_no = Math.floor(Math.random() * arr.length);
        // setting up comp cards
        pname.textContent = arr[card_no].name;
        str.textContent = arr[card_no].str;
        height.textContent = arr[card_no].height;
        weight.textContent = arr[card_no].weight;
        stamina.textContent = arr[card_no].stamina;
        tough.textContent = arr[card_no].tough;
        agility.textContent = arr[card_no].agility;
        img.src = arr[card_no].img;
        
        // showing up comp card
        let comp_card = document.querySelector(`.card_deck_comp${cnt} .card_comp`);
        comp_card.classList.add("show");
        
        // getting current lowest card for loosing it
        if(cnt==1) comp1_curr_card = card_no;
        else if(cnt==2) comp2_curr_card = card_no;
        else if(cnt==3) comp3_curr_card = card_no;
        else if(cnt==4) comp4_curr_card = card_no;
        else if(cnt==5) comp5_curr_card = card_no;

        if (arttr_btn_value == "strength") {
            play(parseInt(arr[card_no].str.slice(-2)));
        }
        else if (arttr_btn_value == "height") {
            play(parseFloat(arr[card_no].height.slice(-4)));
        }
        else if (arttr_btn_value == "weight") {
            play(parseInt(arr[card_no].weight.slice(-3)));
        }
        else if (arttr_btn_value == "stamina") {
            play(parseInt(arr[card_no].stamina.slice(-2)));
        }
        else if (arttr_btn_value == "agility") {
            play(parseInt(arr[card_no].agility.slice(-2)));
        }
        else if(arttr_btn_value == "toughness"){
            play(parseInt(arr[card_no].tough.slice(-2)));
        }
     }
     else{
        eliminate();
    }
}

/***************************
game logic begins from here
******************************/
const play = (attr, manual_player = false) => {
    if (manual_player) {
        man_attr_arr.push(attr);
    }
    else {
        comp_attr_arr.push(attr);
    }
    all_attr_arr.push(attr);
}
// compare the attributes
const compare = () => {
    let lowest = all_attr_arr.sort((a, b) => a - b)[0];
    let highest = all_attr_arr.sort((a, b) => b - a)[0];
    let popped;
    let remove = -1;
    if (lowest === man_attr_arr[0] && lowest != "" && lowest >= 1) {
        document.querySelector(".result_modal").classList.add("show");
        document.querySelector(".card_deck").style.pointerEvents = "none";
        // clicking give up btn
        document.getElementById("give_up_btn").addEventListener("click", (e) => {
            remove = document.querySelector("#give_up_card").value - 1;
            if (remove >= 0 && remove < player_arr1.length) {
                popped = player_arr1.splice(remove, 1);
                // giving popped element to highest ranking player
                let index = comp_attr_arr.indexOf(highest);
                index == -1 ? index = 0 : index = index;
                if (popped != undefined && index == 0) player_arr2.push(popped[0]);
                else if (popped != undefined && index == 1) player_arr3.push(popped[0]);
                else if (popped != undefined && index == 2) player_arr4.push(popped[0]);
                else if (popped != undefined && index == 3) player_arr5.push(popped[0]);
                else if (popped != undefined && index == 4) player_arr6.push(popped[0]);
                updateLength();
                // removing several classes
                e.stopImmediatePropagation();
                document.querySelector(".result_modal").classList.remove("show");
                document.querySelector(".card_deck").style.pointerEvents = "all";
                // remove the card now
                let all_cards = document.querySelectorAll(".card");
                all_cards.forEach(card => {
                    card.classList.remove("show");
                });
            }
            else {
                alert(`Enter Card no Between 1 and ${player_arr1.length}`);
            }
        });
    }
    else {
        let all_attr_arr_demo = man_attr_arr.concat(comp_attr_arr);
        let index = comp_attr_arr.indexOf(lowest);
        let indexH = all_attr_arr_demo.indexOf(highest);
        let popped;

        if(index==0){
            popped = player_arr2.splice(comp1_curr_card, 1);
            if(indexH==0) player_arr1.push(popped[0]);
            else if(indexH ==1) player_arr2.push(popped[0]);
            else if(indexH ==2) player_arr3.push(popped[0]);
            else if(indexH ==3) player_arr4.push(popped[0]);
            else if(indexH ==4) player_arr5.push(popped[0]);
            else player_arr6.push(popped[0]);
            updateLength();
        }
        else if(index==1){
            popped = player_arr3.splice(comp2_curr_card, 1);
            if(indexH==0) player_arr1.push(popped[0]);
            else if(indexH ==1) player_arr2.push(popped[0]);
            else if(indexH ==2) player_arr3.push(popped[0]);
            else if(indexH ==3) player_arr4.push(popped[0]);
            else if(indexH ==4) player_arr5.push(popped[0]);
            else player_arr6.push(popped[0]);
            updateLength();
        }
        else if(index==2){
            popped = player_arr4.splice(comp3_curr_card, 1);
            if(indexH==0) player_arr1.push(popped[0]);
            else if(indexH ==1) player_arr2.push(popped[0]);
            else if(indexH ==2) player_arr3.push(popped[0]);
            else if(indexH ==3) player_arr4.push(popped[0]);
            else if(indexH ==4) player_arr5.push(popped[0]);
            else player_arr6.push(popped[0]);
            updateLength();
        }
        else if(index==3){
            popped = player_arr4.splice(comp3_curr_card, 1);
            if(indexH==0) player_arr1.push(popped[0]);
            else if(indexH ==1) player_arr2.push(popped[0]);
            else if(indexH ==2) player_arr3.push(popped[0]);
            else if(indexH ==3) player_arr4.push(popped[0]);
            else if(indexH ==4) player_arr5.push(popped[0]);
            else player_arr6.push(popped[0]);
            updateLength();
        }
        else if(index==4){
            popped = player_arr4.splice(comp3_curr_card, 1);
            if(indexH==0) player_arr1.push(popped[0]);
            else if(indexH ==1) player_arr2.push(popped[0]);
            else if(indexH ==2) player_arr3.push(popped[0]);
            else if(indexH ==3) player_arr4.push(popped[0]);
            else if(indexH ==4) player_arr5.push(popped[0]);
            else player_arr6.push(popped[0]);
            updateLength();
        }
        else if(index==5){
            popped = player_arr4.splice(comp3_curr_card, 1);
            if(indexH==0) player_arr1.push(popped[0]);
            else if(indexH ==1) player_arr2.push(popped[0]);
            else if(indexH ==2) player_arr3.push(popped[0]);
            else if(indexH ==3) player_arr4.push(popped[0]);
            else if(indexH ==4) player_arr5.push(popped[0]);
            else player_arr6.push(popped[0]);
            updateLength();
        }
        setTimeout(() => {
            let all_cards = document.querySelectorAll(".card");
            all_cards.forEach(card => {
            card.classList.remove("show");
        });
        }, 4000);
    }
}
//eliminate the computer player
const eliminate = ()=>{
    if(player_arr2.length===0) {
        document.querySelector(".card_deck_comp1").remove();
        replaceClass("card_deck_comp1");
        no_of_players--;
        // computer_player(--no_of_players);
    }
    else if(player_arr3.length===0) {
        document.querySelector(".card_deck_comp2").remove();
        replaceClass("card_deck_comp2");
        no_of_players--;
        // computer_player(--no_of_players);
    }
    else if(player_arr4.length===0) {
        document.querySelector(".card_deck_comp3").remove();
        replaceClass("card_deck_comp3");
        no_of_players--;
        // computer_player(--no_of_players);
    }
    else if(player_arr5.length===0) {
        document.querySelector(".card_deck_comp4").remove();
        replaceClass("card_deck_comp4");
        no_of_players--;
        // computer_player(--no_of_players);
    }
    else if(player_arr6.length===0) {
        document.querySelector(".card_deck_comp5").remove();
        replaceClass("card_deck_comp5");
        no_of_players--;
        // computer_player(--no_of_players);
    }
}
// Replace Classes name when some class is removed from DOM
const replaceClass = (removedClass)=>{
    if(removedClass == "card_deck_comp1"){
        try{
            document.querySelector(".card_deck_comp2").classList.replace("card_deck_comp2", "card_deck_comp1");
            document.querySelector(".card_deck_comp1").classList.add("card_deck");

            document.querySelector(".card_deck_comp3").classList.replace("card_deck_comp3", "card_deck_comp2");
            document.querySelector(".card_deck_comp2").classList.add("card_deck");

            document.querySelector(".card_deck_comp4").classList.replace("card_deck_comp4", "card_deck_comp3");
            document.querySelector(".card_deck_comp3").classList.add("card_deck");

            document.querySelector(".card_deck_comp5").classList.replace("card_deck_comp5", "card_deck_comp4");
            document.querySelector(".card_deck_comp4").classList.add("card_deck");
        }
        catch{
            console.log("No Such Class Found");
        }
    }

    else if(removedClass == "card_deck_comp2"){
        try{
            document.querySelector(".card_deck_comp3").classList.replace("card_deck_comp3", "card_deck_comp2");
            document.querySelector(".card_deck_comp2").classList.add("card_deck");

            document.querySelector(".card_deck_comp4").classList.replace("card_deck_comp4", "card_deck_comp3");
            document.querySelector(".card_deck_comp3").classList.add("card_deck");

            document.querySelector(".card_deck_comp5").classList.replace("card_deck_comp5", "card_deck_comp4");
            document.querySelector(".card_deck_comp4").classList.add("card_deck");
        }
        catch{
            console.log("No Such Class Found");
        }
    }
    else if(removedClass == "card_deck_comp3"){
        try{
            document.querySelector(".card_deck_comp4").classList.replace("card_deck_comp4", "card_deck_comp3");
            document.querySelector(".card_deck_comp3").classList.add("card_deck");

            document.querySelector(".card_deck_comp5").classList.replace("card_deck_comp5", "card_deck_comp4");
            document.querySelector(".card_deck_comp4").classList.add("card_deck");
        }
        catch{
            console.log("No Such Class Found");
        }
    }
    else if(removedClass == "card_deck_comp4"){
        try{
            document.querySelector(".card_deck_comp5").classList.replace("card_deck_comp5", "card_deck_comp4");
            document.querySelector(".card_deck_comp4").classList.add("card_deck");
        }
        catch{
            console.log("No Such Class Found");
        }
    }
}
// displaying how many cards left for players
const updateLength = () => {
    if (no_of_players == 2) {
        document.getElementById("man_cards_left").innerText = `${player_arr1.length} Cards Left`;
        try{document.querySelector(`.comp_card_left1`).innerText = `${player_arr2.length} Cards Left`}
        catch{console.log("No Class Found")}
    }
    else if (no_of_players == 3) {
        document.getElementById("man_cards_left").innerText = `${player_arr1.length} Cards Left`;
        try{
            document.querySelector(`.comp_card_left1`).innerText = `${player_arr2.length} Cards Left`
            document.querySelector(`.comp_card_left2`).innerText = `${player_arr3.length} Cards Left`
        }
        catch{console.log("No Class Found")}
    }
    else if (no_of_players == 4) {
        document.getElementById("man_cards_left").innerText = `${player_arr1.length} Cards Left`;
        try{
            document.querySelector(`.comp_card_left1`).innerText = `${player_arr2.length} Cards Left`
            document.querySelector(`.comp_card_left2`).innerText = `${player_arr3.length} Cards Left`
            document.querySelector(`.comp_card_left3`).innerText = `${player_arr4.length} Cards Left`
        }
        catch{console.log("No Class Found")}
    }
    else if (no_of_players == 5) {
        document.getElementById("man_cards_left").innerText = `${player_arr1.length} Cards Left`;
        try{
            document.querySelector(`.comp_card_left1`).innerText = `${player_arr2.length} Cards Left`
            document.querySelector(`.comp_card_left2`).innerText = `${player_arr3.length} Cards Left`
            document.querySelector(`.comp_card_left3`).innerText = `${player_arr4.length} Cards Left`
            document.querySelector(`.comp_card_left4`).innerText = `${player_arr5.length} Cards Left`
        }
        catch{console.log("No Class Found")}
    }
    else if (no_of_players == 6) {
        document.getElementById("man_cards_left").innerText = `${player_arr1.length} Cards Left`;
        try{
            document.querySelector(`.comp_card_left1`).innerText = `${player_arr2.length} Cards Left`
            document.querySelector(`.comp_card_left2`).innerText = `${player_arr3.length} Cards Left`
            document.querySelector(`.comp_card_left3`).innerText = `${player_arr4.length} Cards Left`
            document.querySelector(`.comp_card_left4`).innerText = `${player_arr5.length} Cards Left`     
            document.querySelector(`.comp_card_left5`).innerText = `${player_arr6.length} Cards Left`
        }
        catch{console.log("No Class Found")}
    }
}