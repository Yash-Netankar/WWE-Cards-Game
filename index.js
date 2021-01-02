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
    sendData(no_of_players, vs_btn_value);
});


/*********************************
Function receiving data
************************************/
const sendData = (no_of_players=2, vs="computer")=>{
    if(vs==="computer"){
        computer(no_of_players);
    }
}

/*********************************
getting players from ajax call
************************************/
const computer = (no_of_players)=>{
    let req = new XMLHttpRequest();
    req.open("GET", "http://127.0.0.1:5500/data.json", true);
    req.onload = ()=>{
        const data = JSON.parse(req.responseText);
        renderHTML(no_of_players, data);
    }
    req.send();
}

// rendering html for all players
const renderHTML = (no_of_players, data) =>{
    let card_deck = `
    <div class="card_deck">
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
        <div class="card">
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
    for(let i=0; i<no_of_players;i++){
        document.querySelector(".card_game_container").insertAdjacentHTML("beforeend",card_deck);
    }
    
    // calling func. to show player info on cards
    ShowPlayerAttr(data);
    
    // showing cards on clicking the attribute btn on deck
    const attrBtn = document.querySelectorAll(".attrBtn");
    let cards = document.querySelectorAll(".card");
    attrBtn.forEach(btn=>{
        btn.addEventListener("click", ()=>{
            cards.forEach(card=>{
                card.classList.add("show");
            })
            play(data);
        })
    })
}

// showing palyer info on cards
const ShowPlayerAttr = (data)=>{
    pname=document.querySelectorAll(".player_name");
    str=document.querySelectorAll(".str");
    height=document.querySelectorAll(".height");
    weight=document.querySelectorAll(".weight");
    stamina=document.querySelectorAll(".stamina");
    tough=document.querySelectorAll(".toughness");
    agility=document.querySelectorAll(".agility");
    img=document.querySelectorAll(".superstar img");

    pname.forEach((item, i)=>{
        item.textContent = data[i].name;
    })
    str.forEach((item, i)=>{
        item.textContent = data[i].str;
    })
    height.forEach((item, i)=>{
        item.textContent = data[i].height;
    })
    weight.forEach((item, i)=>{
        item.textContent = data[i].weight;
    })
    stamina.forEach((item, i)=>{
        item.textContent = data[i].stamina;
    })
    tough.forEach((item, i)=>{
        item.textContent = data[i].tough;
    })
    agility.forEach((item, i)=>{
        item.textContent = data[i].agility;
    })
    img.forEach((image, i)=>{
        image.src = data[i].img;
    })
}

// game logic
const play = (data)=>{
    console.log("Function running")
}