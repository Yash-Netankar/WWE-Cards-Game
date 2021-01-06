// buttons
const btns = document.querySelectorAll(".btn");
const vs_btns = document.querySelectorAll(".vs_button");
const play_btn = document.querySelector(".play_btn");

// player info vars
let pname="";
let str="";
let height="";
let weight="";
let agility="";
let stamina="";
let tough="";
let img="";

// audio
const audio = new Audio("./button_audio.mp3");

// global vars
let no_of_players;
let vs_btn_value;
let arttr_btn_value = "strength";

// global arrays
let man_attr_arr = [];
let all_attr_arr = [];

//arrays for players
let player_arr1 = [];
let player_arr2 = [];
let player_arr3 = [];
let player_arr4 = [];
let player_arr5 = [];
let player_arr6 = [];


/*********************************
Button Clicks and sending data
************************************/
btns.forEach(btn=>{
    btn.addEventListener("click", ()=>{
        audio.play();
        no_of_players=btn.value;
    })
});
vs_btns.forEach(btn=>{
    btn.addEventListener("click", ()=>{
        audio.play();
        vs_btn_value=btn.value;
    })
});
play_btn.addEventListener("click", ()=>{
    document.querySelector(".container").classList.add("hide");
    document.querySelector(".card_game_container").classList.add("show");
    getData(no_of_players, vs_btn_value);
});


/*********************************
Function receiving data &
getting players from ajax call
************************************/
const getData = (no_of_players=0, vs="computer")=>{
    if(vs == "computer"){
        let req = new XMLHttpRequest();
        req.open("GET", "http://127.0.0.1:5500/data.json", true);
        req.onload = ()=>{
            const data = JSON.parse(req.responseText);
            distributeArr(data, no_of_players);
            renderHTML(no_of_players, data);
        }
        req.send();
    }
}

// distributing array equally to players
const distributeArr= (data, no_of_players)=>{
    // for 2 players
    if(no_of_players==2){
        player_arr1 = data.slice(0, 6);
        player_arr2 = data.slice(6, 12);
    }
    else if(no_of_players==3){
        player_arr1 = data.slice(0, 4);
        player_arr2 = data.slice(4, 8);
        player_arr3 = data.slice(8, 12);
    }
    else if(no_of_players==4){
        player_arr1 = data.slice(0, 3);
        player_arr2 = data.slice(3, 6);
        player_arr3 = data.slice(6, 9);
        player_arr4 = data.slice(9, 12);
    }
    else if(no_of_players==5){
        player_arr1 = data.slice(0, 3);
        player_arr2 = data.slice(3, 6);
        player_arr3 = data.slice(6, 8);
        player_arr4 = data.slice(8, 10);
        player_arr5 = data.slice(10, 12);
    }
    else if(no_of_players==6){
        player_arr1 = data.slice(0, 2);
        player_arr2 = data.slice(2, 4);
        player_arr3 = data.slice(4, 6);
        player_arr4 = data.slice(6, 8);
        player_arr5 = data.slice(8, 10);
        player_arr6 = data.slice(10, 12);
    }
}

// rendering html for all players
const renderHTML = (no_of_players, data) =>{
    for(let i=0; i<no_of_players-1;i++){
    let card_deck = `
    <div class="card_deck card_deck_comp${i+1}">
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
    <h1>WWE Trump Cards</h1>
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
    document.querySelector(".card_game_container").insertAdjacentHTML("beforeend",card_deck);
}
    
    // calling func. to show player info on cards
    ShowPlayerAttr(data);
    
    // showing cards on clicking the attribute btn on deck
    const attrBtn = document.querySelectorAll(".attrBtn");
    
    attrBtn.forEach(btn=>{
        btn.addEventListener("click", ()=>{
            arttr_btn_value = btn.value;
        })
    })
}

// showing palyer info on cards
const ShowPlayerAttr = (data)=>{
    document.querySelector(".throw").addEventListener("click", ()=>{
        // card no number
        let card_no = document.querySelector("#ip").value;
        if(card_no>=1 && card_no<= player_arr1.length){
            manual_player_card(card_no-1);
            computer_player();
        }
        else(
            alert(`Enter Card Number Between 1 to ${player_arr1.length}`)
        )
        console.log(man_attr_arr ,all_attr_arr);
    });
}
// manual player game logic
const manual_player_card = (card_no) =>{
    // getting player elements
    pname=document.querySelector(".manual_player_card_deck .manual_player_card .player_name");
    str=document.querySelector(".manual_player_card_deck .manual_player_card .info .str");
    height=document.querySelector(".manual_player_card_deck .manual_player_card .info .height");
    weight=document.querySelector(".manual_player_card_deck .manual_player_card .info .weight");
    stamina=document.querySelector(".manual_player_card_deck .manual_player_card .info .stamina");
    tough=document.querySelector(".manual_player_card_deck .manual_player_card .info .toughness");
    agility=document.querySelector(".manual_player_card_deck .manual_player_card .info .agility");
    img=document.querySelector(".manual_player_card_deck .manual_player_card .superstar img");

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

    if(arttr_btn_value == "strength"){
        play( null ,parseInt(player_arr1[card_no].str.slice(-2)), true);
    }
}

// computer player game logic
const computer_player = ()=>{
    let cnt = 1;
    if(no_of_players==2){
        showCompCard(cnt);
    }
    else if(no_of_players==3){
        showCompCard(cnt);
        cnt++;
        showCompCard(cnt);
        // cnt++;
        // showCompCard(cnt);
    }
    else if(no_of_players==4){
        showCompCard(cnt);
        cnt++;
        showCompCard(cnt);
        cnt++;
        showCompCard(cnt);
        // cnt++;
        // showCompCard(cnt);
    }
    else if(no_of_players==5){
        showCompCard(cnt);
        cnt++;
        showCompCard(cnt);
        cnt++;
        showCompCard(cnt);
        cnt++;
        showCompCard(cnt);
        // cnt++;
        // showCompCard(cnt);
    }
    else if(no_of_players==6){
        showCompCard(cnt);
        cnt++;
        showCompCard(cnt);
        cnt++;
        showCompCard(cnt);
        cnt++;
        showCompCard(cnt);
        cnt++;
        showCompCard(cnt);
    }
}

const showCompCard = (cnt)=>{
    // getting computer attributes
    pname=document.querySelector(`.card_deck_comp${cnt} .card_comp .player_name`);
    str=document.querySelector(`.card_deck_comp${cnt} .card_comp .info .str`);
    height=document.querySelector(`.card_deck_comp${cnt} .card_comp .info .height`);
    weight=document.querySelector(`.card_deck_comp${cnt} .card_comp .info .weight`);
    stamina=document.querySelector(`.card_deck_comp${cnt} .card_comp .info .stamina`);
    tough=document.querySelector(`.card_deck_comp${cnt} .card_comp .info .toughness`);
    agility=document.querySelector(`.card_deck_comp${cnt} .card_comp .info .agility`);
    img=document.querySelector(`.card_deck_comp${cnt} .card_comp .superstar img`);

    // setting arrays that are allocated to players
    let arr = [];
    if(cnt==1){
        arr = player_arr2;
    }
    else if(cnt==2){
        arr = player_arr3;
    }
    else if(cnt==3){
        arr = player_arr4;
    }
    else if(cnt==4){
        arr = player_arr5;
    }
    else if(cnt==5){
        arr = player_arr6;
    }

    // setting up comp cards
    let card_no = Math.floor(Math.random()*arr.length);
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

    if(arttr_btn_value == "strength"){
        play( arr ,parseInt(arr[card_no].str.slice(-2)));
    }
}

// game logic
const play = (arr ,attr, manual_player=false)=>{
    if(manual_player){
        man_attr_arr.push(attr);
    }
    all_attr_arr.push(attr);
    let lowest_attr = all_attr_arr.sort((a,b)=>a-b);
    console.log("Sorted array" ,lowest_attr);
    
}